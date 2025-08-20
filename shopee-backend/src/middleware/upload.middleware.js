// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const multer = require('multer');
const path = require('path');

// Cấu hình nơi lưu trữ file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // File sẽ được lưu vào thư mục 'public/uploads/images'
        cb(null, 'public/uploads/images');
    },
    filename: (req, file, cb) => {
        // Tạo một tên file duy nhất để tránh trùng lặp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

// Middleware upload
const upload = multer({ storage: storage });

module.exports = upload;
