// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { Sequelize } = require('sequelize');

// Nạp thông tin kết nối từ file .env
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 10, // Số lượng kết nối tối đa
        min: 0, // Số lượng kết nối tối thiểu
        acquire: 30000, // Thời gian tối đa (ms) để cố gắng lấy một kết nối trước khi báo lỗi timeout
        idle: 10000, // Thời gian tối đa (ms) một kết nối có thể "nhàn rỗi" trước khi được giải phóng
    },
});

module.exports = sequelize;
