// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

// 1. Lấy object 'db' từ models/index.js, nó chứa instance sequelize
const db = require('./src/models');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (ảnh upload)
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Routes
const apiRoutes = require('./src/api'); // Giả sử bạn có file /src/api/index.js để gom các route
app.use('/api', apiRoutes);

// Cổng server
const PORT = process.env.PORT || 3001;

// 2. Sử dụng db.sequelize để kiểm tra kết nối và khởi động server
db.sequelize
    .authenticate()
    .then(() => {
        console.log('✅ Connection to the database has been established successfully.');
        // Đồng bộ model (tùy chọn)
        // db.sequelize.sync({ force: false }); // Bỏ comment nếu muốn tự động tạo bảng
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}.`);
        });
    })
    .catch((err) => {
        console.error('❌ Unable to connect to the database:', err);
    });
