// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { User } = require('../../models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Lấy danh sách người dùng (phân trang, tìm kiếm)
const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const searchTerm = req.query.search || '';

        let whereCondition = {};
        if (searchTerm) {
            whereCondition = {
                [Op.or]: [{ name: { [Op.like]: `%${searchTerm}%` } }, { email: { [Op.like]: `%${searchTerm}%` } }, { username: { [Op.like]: `%${searchTerm}%` } }],
            };
        }

        const { count, rows } = await User.findAndCountAll({
            where: whereCondition,
            limit,
            offset,
            order: [['created_at', 'DESC']],
            attributes: { exclude: ['password'] }, // Luôn loại bỏ mật khẩu
        });

        res.status(200).json({
            data: rows,
            pagination: { totalItems: count, totalPages: Math.ceil(count / limit), currentPage: page },
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.', error: error.message });
    }
};

// Lấy một người dùng theo ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }, // Luôn loại bỏ mật khẩu
        });
        if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

// Admin tạo người dùng mới
const createUserByAdmin = async (req, res) => {
    try {
        const { name, username, email, password, role, status } = req.body;
        if (!username) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ Tên người dùng' });
        }
        if (!email) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ email' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ mật khẩu.' });
        }
        // Băm mật khẩu trước khi lưu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ name, username, email, password: hashedPassword, role, status });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật thông tin người dùng (bởi Admin)
const updateUserByAdmin = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng.' });

        // Chỉ cho phép admin cập nhật các trường này
        const { name, username, role, status } = req.body;
        await user.update({ name, username, role, status });

        // Lấy lại dữ liệu mới nhất không có password
        const updatedUser = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const uploadMyAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Vui lòng chọn một file ảnh.' });
        }

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
        }

        // Xóa avatar cũ nếu có
        if (user.avatar) {
            const oldImagePath = path.join(__dirname, '../../../public', user.avatar);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        // Cập nhật đường dẫn avatar mới
        const avatar = req.file.path.replace('public/', '').replace(/\\/g, '/');
        user.avatar = avatar;
        await user.save();

        const updatedUser = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] },
        });

        res.status(200).json({ message: 'Cập nhật avatar thành công!', url: avatar });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi upload file.', error: error.message });
    }
};

// Xóa người dùng (soft delete)
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng.' });

        await user.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

module.exports = { getAllUsers, getUserById, createUserByAdmin, updateUserByAdmin, uploadMyAvatar, deleteUser };
