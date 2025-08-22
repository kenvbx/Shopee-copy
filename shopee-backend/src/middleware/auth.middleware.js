// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
    let token;

    // Token thường được gửi trong header 'Authorization' theo dạng 'Bearer <token>'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Lấy token từ header
            token = req.headers.authorization.split(' ')[1];

            // 2. Giải mã token để lấy payload (chứa id người dùng)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Lấy thông tin người dùng từ DB và gắn vào request
            // Gắn vào request để các hàm controller sau có thể sử dụng
            req.user = await User.findByPk(decoded.id, {
                attributes: { exclude: ['password'] }, // Loại bỏ trường password
            });

            next(); // Chuyển tiếp đến controller
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Không tìm thấy token. Yêu cầu truy cập bị từ chối.' });
    }
};

module.exports = authMiddleware;
