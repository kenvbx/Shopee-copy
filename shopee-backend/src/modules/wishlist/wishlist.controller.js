// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { Wishlist, Product } = require('../../models');
const db = require('../../models');
const { Op } = db.Sequelize;

// Lấy danh sách yêu thích của người dùng
const getMyWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlist = await db.Wishlist.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: db.Product,
                    as: 'Product',
                    attributes: ['id', 'name', 'slug', 'price', 'sale_price', 'main_image', 'stock_status'],
                },
            ],
            order: [['created_at', 'DESC']],
        });
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

// Thêm sản phẩm vào danh sách yêu thích
const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        // Tìm hoặc tạo mới để tránh trùng lặp
        const [wishlistItem, created] = await Wishlist.findOrCreate({
            where: { user_id: userId, product_id: productId },
            defaults: { user_id: userId, product_id: productId },
        });

        if (!created) {
            return res.status(409).json({ message: 'Sản phẩm đã có trong danh sách yêu thích.' });
        }
        res.status(201).json(wishlistItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa sản phẩm khỏi danh sách yêu thích
const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        await Wishlist.destroy({
            where: { user_id: userId, product_id: productId },
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

module.exports = { getMyWishlist, addToWishlist, removeFromWishlist };
