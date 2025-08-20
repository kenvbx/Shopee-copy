// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const User = require('../auth/user.model');
// const Product = require('../products/product.model');
// Giả sử bạn sẽ có Order model sau này
// const Order = require('../orders/order.model');

const getSummaryStats = async (req, res) => {
    try {
        const userCount = await User.count();
        const productCount = await Product.count();
        // const orderCount = await Order.count(); // Sẽ thêm sau

        // Trả về dữ liệu thống kê
        res.status(200).json({
        users: {
            total: userCount,
        },
        products: {
            total: productCount,
        },
        orders: {
            total: 0, // Tạm thời
        },
        });
    } catch (error) {
        console.error('Lỗi lấy dữ liệu thống kê:', error);
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

module.exports = { getSummaryStats };