// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const db = require('../../models');
const { Review, Product, User, ReviewImage } = db; // lấy model từ index.js
const sequelize = db.sequelize; // lấy instance sequelize
const { Op } = require('sequelize');

const updateProductRatings = async (productId) => {
    try {
        const stats = await db.ProductReview.findOne({
            where: { product_id: productId, is_approved: true },
            attributes: [
                [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'rating_count'],
                [db.sequelize.fn('AVG', db.sequelize.col('rating')), 'rating_avg'],
            ],
            raw: true,
        });

        const rating_count = parseInt(stats.rating_count, 10) || 0;
        const rating_avg = parseFloat(stats.rating_avg) || 0;

        await db.Product.update({ rating_count, rating_avg }, { where: { id: productId } });
    } catch (error) {
        console.error(`Lỗi khi cập nhật rating cho sản phẩm ${productId}:`, error);
    }
};

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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const filter = req.query.filter || 'all';
        const offset = (page - 1) * limit;

        let whereCondition = {
            product_id: productId,
            is_approved: true,
        };

        let includeCondition = [
            {
                model: db.User,
                as: 'User',
                attributes: ['name', 'avatar'],
            },
            {
                model: db.ReviewImage,
                as: 'ReviewImages',
                attributes: ['image_url'],
            },
        ];

        // Nếu lọc theo 'images', yêu cầu phải có ít nhất một ảnh liên kết
        if (filter === 'images') {
            const imageInclude = includeCondition.find((i) => i.as === 'ReviewImages');
            if (imageInclude) {
                imageInclude.required = true;
            }
        }

        // Nếu lọc theo 'videos', chỉ lấy review có trường 'video_url' không rỗng
        if (filter === 'videos') {
            whereCondition.video_url = { [Op.ne]: null, [Op.ne]: '' };
        }
        // ------------------------------------

        const { count, rows } = await db.ProductReview.findAndCountAll({
            where: whereCondition,
            include: includeCondition,
            limit,
            offset,
            order: [['created_at', 'DESC']],
            distinct: true,
        });

        res.status(200).json({
            data: rows,
            pagination: {
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
            },
        });
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
        const { productId, rating, content, title, images } = req.body;

        if (!productId || !rating) {
            return res.status(400).json({ message: 'Thiếu dữ liệu bắt buộc.', missing: !productId ? ['productId'] : ['rating'] });
        }

        const newReview = await db.ProductReview.create(
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

        await updateProductRatings(productId);

        res.status(201).json(newReview);
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ message: 'Gửi đánh giá thất bại.', error: error.message });
    }
};

module.exports = { getMyReviews, getProductReviews, createReview };
