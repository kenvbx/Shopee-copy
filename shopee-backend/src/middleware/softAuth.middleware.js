// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const softAuthMiddleware = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findByPk(decoded.id, {
                attributes: { exclude: ['password'] },
            });
        } catch (error) {
            // Nếu token sai hoặc hết hạn, coi như là guest, không báo lỗi
            req.user = null;
        }
    }
    next(); // Luôn cho phép đi tiếp
};

module.exports = softAuthMiddleware;
