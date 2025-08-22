// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// --- 1. Cấu hình môi trường và đường dẫn an toàn ---
const env = process.env.NODE_ENV || 'development';
// Sử dụng path.join để tạo đường dẫn chính xác, tránh lỗi
const configPath = path.join(__dirname, '..', 'config', 'db.config.js');
const config = require(configPath)[env];
const db = {};

// --- 2. Khởi tạo kết nối Sequelize ---
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// --- 3. Tự động tải tất cả các model ---
const modulesDir = path.join(__dirname, '..', 'modules');

fs.readdirSync(modulesDir).forEach((moduleName) => {
    const modulePath = path.join(modulesDir, moduleName);
    if (fs.statSync(modulePath).isDirectory()) {
        fs.readdirSync(modulePath)
            .filter((file) => file.slice(-9) === '.model.js')
            .forEach((file) => {
                const model = require(path.join(modulePath, file))(sequelize, Sequelize.DataTypes);
                db[model.name] = model;
            });
    }
});

// --- 4. Thiết lập mối quan hệ (Associations) ---
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// --- 5. Xuất object db hoàn chỉnh ---
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
