// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('../../utils/email.service');

/**
 * @desc    Đăng ký người dùng mới
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res) => {
    try {
        const { name, emailOrPhone, password } = req.body;

        const isEmail = emailOrPhone.includes('@');

        const userData = {
            name,
            password,
        };
        let whereCondition = {};

        if (isEmail) {
            userData.email = emailOrPhone;
            whereCondition = { email: emailOrPhone };
        } else {
            userData.phone = emailOrPhone;
            whereCondition = { phone: emailOrPhone };
        }

        // Kiểm tra xem email hoặc SĐT đã tồn tại chưa
        const existingUser = await User.findOne({ where: whereCondition });
        if (existingUser) {
            return res.status(409).json({ message: 'Email hoặc số điện thoại này đã được đăng ký.' });
        }

        if (!name || !emailOrPhone || !password) {
            return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
        }

        // Do model đã có 'unique: true' nên Sequelize sẽ báo lỗi nếu email tồn tại
        // Việc băm mật khẩu cũng đã được hook 'beforeCreate' trong model tự động xử lý
        const newUser = await User.create(userData);

        // ... (phần trả về token có thể được thêm vào sau nếu muốn tự động đăng nhập)

        res.status(201).json({
            message: 'Đăng ký người dùng thành công.',
        });
    } catch (error) {
        // Bắt lỗi nếu email đã tồn tại hoặc có lỗi khác
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Email này đã được sử dụng.' });
        }
        console.error('Lỗi đăng ký:', error);
        res.status(500).json({ message: 'Lỗi máy chủ khi đăng ký.' });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ email và mật khẩu.' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Thông tin đăng nhập không chính xác.' });
        }

        // KIỂM TRA QUYỀN ADMIN
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập.' });
        }

        await User.update({ last_login: new Date() }, { where: { id: user.id } });

        const payload = { id: user.id, name: user.name, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            message: 'Đăng nhập thành công.',
            token: token,
        });
    } catch (error) {
        console.error('Lỗi đăng nhập admin:', error);
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

/**
 * @desc    Đăng nhập người dùng
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res) => {
    try {
        const { emailOrPhone, password, rememberMe } = req.body;

        if (!emailOrPhone || !password) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
        }

        const isEmail = emailOrPhone.includes('@');

        let whereCondition = {};

        if (isEmail) {
            whereCondition = { email: emailOrPhone };
        } else {
            whereCondition = { phone: emailOrPhone };
        }

        // 1. Tìm người dùng theo email
        const user = await User.findOne({ where: whereCondition });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Thông tin đăng nhập không chính xác.' });
        }

        // 2. So sánh mật khẩu người dùng nhập với mật khẩu đã băm trong DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác.' });
        }

        await User.update({ last_login: new Date() }, { where: { id: user.id } });

        const expiresIn = rememberMe ? '30d' : '1d';

        // 3. Tạo JWT
        const payload = {
            id: user.id,
            name: user.name,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: expiresIn,
        });

        // 4. Trả về token cho client
        res.status(200).json({
            message: 'Đăng nhập thành công.',
            token: token,
        });
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        res.status(500).json({ message: 'Lỗi máy chủ khi đăng nhập.' });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email, origin } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            // Trả về lỗi 404 (Not Found) với thông báo cụ thể
            return res.status(404).json({ message: 'Không có người dùng với địa chỉ email đó thuộc về hệ thống của chúng tôi.' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.reset_token = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.reset_token_expires = Date.now() + 10 * 60 * 1000;

        await user.save();
        await sendPasswordResetEmail(user.email, resetToken, origin);

        // Trả về thành công 200 với thông báo cụ thể
        res.status(200).json({ message: 'Chúng tôi đã gửi liên kết khôi phục mật khẩu. Vui lòng kiểm tra email của bạn nhé!' });
    } catch (err) {
        user.reset_token = null;
        user.reset_token_expires = null;
        await user.save();
        res.status(500).json({ message: 'Gửi email thất bại.' });
    }
};

const resetPassword = async (req, res) => {
    const { token, password } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
        where: {
            reset_token: hashedToken,
            reset_token_expires: { [require('sequelize').Op.gt]: Date.now() },
        },
    });

    if (!user) {
        return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }

    user.password = password; // Hook beforeUpdate sẽ tự động băm mật khẩu
    user.reset_token = null;
    user.reset_token_expires = null;
    await user.save();

    res.status(200).json({ message: 'Mật khẩu đã được cập nhật thành công.' });
};

const getMyProfile = async (req, res) => {
    // Middleware `authMiddleware` đã lấy thông tin user và gắn vào req.user
    // Chúng ta chỉ cần trả nó về
    const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] },
    });
    res.status(200).json(user);
};

// User tự cập nhật thông tin của mình
const updateMyProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
        }

        const { name, gender, phone, birthday, currentPassword, newPassword } = req.body;

        const profileData = {};
        if (name !== undefined) profileData.name = name;
        if (gender !== undefined) profileData.gender = gender;
        if (birthday !== undefined) profileData.birthday = birthday;
        if (phone !== undefined) profileData.phone = phone;

        await user.update(profileData);

        // Cập nhật mật khẩu nếu có yêu cầu
        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Mật khẩu hiện tại không chính xác.' });
            }
            // Băm mật khẩu mới trước khi lưu
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        await user.save();
        res.status(200).json({ message: 'Cập nhật hồ sơ thành công.' });
    } catch (error) {
        console.error('Lỗi chi tiết khi cập nhật hồ sơ:', error);
        res.status(500).json({ message: 'Lỗi máy chủ.', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginAdmin,
    loginUser,
    forgotPassword,
    resetPassword,
    getMyProfile,
    updateMyProfile,
};
