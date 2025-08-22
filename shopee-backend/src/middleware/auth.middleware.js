// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const jwt = require('jsonwebtoken');
const User = require('../modules/auth/user.model');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Lấy token từ header "Bearer TOKEN"

    if (token == null) {
        // Nếu không có token, trả về lỗi 401
        return res.status(401).json({ message: 'Token không được cung cấp.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // Nếu token sai hoặc hết hạn, trả về lỗi 403
            return res.status(403).json({ message: 'Token không hợp lệ.' });
        }
        // Nếu token hợp lệ, lưu thông tin user vào request và đi tiếp
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
