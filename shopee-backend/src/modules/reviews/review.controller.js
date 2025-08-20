// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const db = require('../../models');
const { Review, Product, User, ReviewImage } = db; // lấy model từ index.js
const sequelize = db.sequelize; // lấy instance sequelize

// Lấy tất cả đánh giá của người dùng đang đăng nhập
const getMyReviews = async (req, res) => {
    try {
        const userId = req.user.id;
        const reviews = await Review.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name', 'slug', 'main_image'], // Lấy kèm thông tin sản phẩm
                },
                {
                    model: User,
                    attributes: ['uid', 'name', 'avatar', 'slug'], // slug nếu bạn có
                },
            ],
            order: [['created_at', 'DESC']],
        });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Lỗi khi tải đánh giá:', error);
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review.findAll({
            where: { product_id: productId, is_approved: true },
            include: [
                {
                    model: User,
                    attributes: ['name', 'avatar'], // Lấy tên và avatar của người dùng
                },
                { model: ReviewImage, as: 'images' },
            ],
            order: [['created_at', 'DESC']],
        });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('--- LỖI CHI TIẾT KHI LẤY ĐÁNH GIÁ ---');
        console.error(error); // In ra toàn bộ đối tượng lỗi
        console.error('------------------------------------');
        res.status(500).json({
            message: 'Lỗi máy chủ khi lấy đánh giá.',
            error: error.message,
        });
    }
};

// HÀM Người dùng tạo một đánh giá mới
const createReview = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const userId = req.user.id;
        // Bây giờ req.body sẽ có dữ liệu
        const { productId, rating, content } = req.body;

        if (!productId || !rating) {
            return res.status(400).json({ message: 'Thiếu dữ liệu bắt buộc.', missing: !productId ? ['productId'] : ['rating'] });
        }

        const newReview = await Review.create(
            {
                product_id: productId,
                user_id: userId,
                rating,
                content,
                title: '',
                is_approved: true,
            },
            { transaction }
        );

        // --- THAY ĐỔI CÁCH LẤY FILE ---
        const uploadedImages = req.files.images; // File nằm trong req.files.images
        // ------------------------------

        if (uploadedImages && uploadedImages.length > 0) {
            const images = uploadedImages.map((file) => ({
                review_id: newReview.id,
                image_url: file.path.replace('public/', '').replace(/\\/g, '/'),
            }));
            await ReviewImage.bulkCreate(images, { transaction });
        }

        await transaction.commit();
        res.status(201).json(newReview);
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ message: 'Gửi đánh giá thất bại.', error: error.message });
    }
};

module.exports = { getMyReviews, getProductReviews, createReview };
