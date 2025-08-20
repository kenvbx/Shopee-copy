// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const adminMiddleware = (req, res, next) => {
    // Middleware này phải được dùng SAU authMiddleware,
    // nên chúng ta có thể tin rằng req.user đã tồn tại.
    if (req.user && req.user.role === 'admin') {
        next(); // Nếu là admin, cho phép đi tiếp
    } else {
        res.status(403).json({ message: 'Truy cập bị cấm. Yêu cầu quyền Admin.' }); // 403 Forbidden
    }
};

module.exports = adminMiddleware;