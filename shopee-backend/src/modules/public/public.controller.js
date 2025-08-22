// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const db = require('../../models/index.js');
const { Product, ProductCategory, Brand, Tag, ProductImage, Variation, VariationImage, AttributeValue, Attribute, Banner, Subscriber, sequelize, Post, User, ProductReview } = require('../../models');
const { Op } = require('sequelize');

// HÀM HELPER (có thể đặt ở đầu file):
const buildHierarchy = (categories, parentId = null) => {
    return categories
        .filter((category) => category.parent_id === parentId)
        .map((category) => ({
            ...category.get({ plain: true }), // Chuyển instance Sequelize thành object thường
            children: buildHierarchy(categories, category.id),
        }));
};

// HÀM Lấy danh mục theo dạng cây phân cấp
const getCategoryHierarchy = async (req, res) => {
    try {
        const categories = await ProductCategory.findAll({
            where: { status: 'active' },
            order: [['sort_order', 'ASC']],
        });
        const categoryTree = buildHierarchy(categories);
        res.status(200).json(categoryTree);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

const getPublicCategories = async (req, res) => {
    try {
        const categories = await ProductCategory.findAll({
            where: { status: 'active' }, // Chỉ lấy danh mục đang hoạt động
            order: [['sort_order', 'ASC']],
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

const getPublicProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12; // Hiển thị 12 sản phẩm mỗi trang
        const offset = (page - 1) * limit;

        const { count, rows } = await Product.findAndCountAll({
            where: {
                status: 'active',
                visibility: 'public',
            },
            limit,
            offset,
            order: [['created_at', 'DESC']],
            include: [
                // Lấy kèm các thông tin cần thiết
                { model: Brand, as: 'Brand', attributes: ['name'] },
            ],
            distinct: true, // Quan trọng khi dùng limit với include
        });

        res.status(200).json({
            data: rows,
            pagination: { totalItems: count, totalPages: Math.ceil(count / limit), currentPage: page },
        });
    } catch (error) {
        console.error('Lỗi khi tải sản phẩm công khai:', error);
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

const getPublicProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        // BƯỚC 1: Lấy thông tin sản phẩm chính
        const product = await Product.findOne({
            where: {
                slug: slug,
                status: 'active',
                visibility: 'public',
            },
            include: [
                {
                    model: ProductCategory,
                    as: 'ProductCategories',
                    through: { attributes: [] },
                },
                { model: Brand, as: 'Brand' },
                { model: Tag, as: 'Tags', through: { attributes: [] } },
                { model: ProductImage, as: 'ProductImages' },
                {
                    model: Variation,
                    as: 'Variations',
                    include: [{ model: VariationImage, as: 'GalleryImages' }],
                },
            ],
        });

        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
        }

        // BƯỚC 2: Thêm logic tính toán rating (giống như đã làm ở controller kia)
        const ratingStats = await ProductReview.findOne({
            where: { product_id: product.id },
            attributes: [
                [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'rating_count'],
                [db.sequelize.fn('AVG', db.sequelize.col('rating')), 'rating_avg'],
            ],
            raw: true,
        });

        // BƯỚC 3: Gộp kết quả lại
        const productJson = product.toJSON();
        productJson.rating_count = parseInt(ratingStats.rating_count, 10) || 0;
        productJson.rating_avg = ratingStats.rating_avg ? parseFloat(ratingStats.rating_avg).toFixed(2) : '0.00';

        res.status(200).json(productJson);
    } catch (error) {
        console.error('Lỗi khi tải chi tiết sản phẩm:', error);
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

// HÀM Tìm kiếm sản phẩm công khai
const searchPublicProducts = async (req, res) => {
    try {
        const query = req.query.q || ''; // Lấy từ khóa từ query param 'q'
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const offset = (page - 1) * limit;

        if (!query) {
            return res.status(400).json({ message: 'Vui lòng nhập từ khóa tìm kiếm.' });
        }

        const { count, rows } = await Product.findAndCountAll({
            where: {
                status: 'active',
                visibility: 'public',
                [Op.or]: [
                    // Tìm kiếm ở cả tên và mô tả
                    { name: { [Op.like]: `%${query}%` } },
                    { description: { [Op.like]: `%${query}%` } },
                ],
            },
            limit,
            offset,
            order: [['created_at', 'DESC']],
        });

        res.status(200).json({
            data: rows,
            pagination: { totalItems: count, totalPages: Math.ceil(count / limit), currentPage: page },
        });
    } catch (error) {
        console.error('Lỗi khi tìm kiếm sản phẩm:', error);
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

const getSearchSuggestions = async (req, res) => {
    try {
        const query = req.query.q || '';
        if (query.length < 2) {
            // Chỉ tìm khi có ít nhất 2 ký tự
            return res.json([]);
        }

        const products = await Product.findAll({
            where: {
                status: 'active',
                visibility: 'public',
                name: { [Op.like]: `%${query}%` },
            },
            limit: 5, // Giới hạn 5 gợi ý sản phẩm
            attributes: ['name', 'slug', 'main_image', 'price', 'sale_price'],
        });

        // (Nâng cao) Bạn có thể tìm thêm trong Categories, Brands ở đây

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

const getFeaturedCategories = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8;

        const categories = await ProductCategory.findAll({
            where: {
                status: 'active',
                is_featured: true,
            },
            // Thêm logic đếm sản phẩm
            attributes: {
                include: [[sequelize.fn('COUNT', sequelize.col('Products.id')), 'product_count']],
            },
            include: [
                {
                    model: Product,
                    attributes: [], // Không cần lấy thông tin sản phẩm, chỉ dùng để đếm
                    through: { attributes: [] },
                },
            ],
            group: ['ProductCategory.id'],
            limit: limit,
            order: [['sort_order', 'ASC']],
            subQuery: false,
        });

        res.status(200).json(categories);
    } catch (error) {
        console.error('Lỗi khi tải danh mục nổi bật:', error);
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

const getBannersByPosition = async (req, res) => {
    try {
        const { position } = req.params; // Ví dụ: 'homepage'
        const banners = await Banner.findAll({
            where: {
                status: 'active',
                position: position,
            },
            order: [['sort_order', 'ASC']],
        });
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

const getFeaturedProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8; // Mặc định lấy 8 sản phẩm

        const products = await Product.findAll({
            where: {
                status: 'active',
                visibility: 'public',
                is_featured: true, // Chỉ lấy sản phẩm được đánh dấu là nổi bật
            },
            limit: limit,
            order: [['created_at', 'DESC']],
        });

        res.status(200).json(products);
    } catch (error) {
        console.error('Lỗi khi tải sản phẩm nổi bật:', error);
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

const subscribeToNewsletter = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Vui lòng nhập địa chỉ email.' });
        }

        const [subscriber, created] = await Subscriber.findOrCreate({
            where: { email: email },
            defaults: { email: email, status: 'subscribed' },
        });

        if (!created && subscriber.status === 'subscribed') {
            return res.status(200).json({ message: 'Email này đã được đăng ký trước đó.' });
        }

        if (!created && subscriber.status === 'unsubscribed') {
            subscriber.status = 'subscribed';
            await subscriber.save();
        }

        res.status(201).json({ message: 'Cảm ơn bạn đã đăng ký nhận tin!' });
    } catch (error) {
        res.status(400).json({ message: 'Địa chỉ email không hợp lệ.' });
    }
};

const getOnSaleProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const now = new Date();

        // Lấy TẤT CẢ sản phẩm có sale_price > 0, không bắt buộc phải có lịch khuyến mãi
        const products = await Product.findAll({
            where: {
                status: 'active',
                visibility: 'public',
                sale_price: { [Op.gt]: 0 },
            },
            limit: limit,
            order: [['updated_at', 'DESC']],
            // Sắp xếp ưu tiên theo % giảm giá cao nhất, sau đó theo thời gian cập nhật gần nhất
            order: [
                [sequelize.literal('(price - sale_price) / NULLIF(price, 0)'), 'DESC'],
                ['updated_at', 'DESC'],
            ],
        });

        res.status(200).json(products);
    } catch (error) {
        console.error('Lỗi khi tải sản phẩm giảm giá:', error);
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

const getNewestProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10; // Mặc định lấy 10 sản phẩm

        const products = await Product.findAll({
            where: {
                status: 'active',
                visibility: 'public',
            },
            limit: limit,
            order: [['created_at', 'DESC']], // Sắp xếp theo ngày tạo mới nhất
        });

        res.status(200).json(products);
    } catch (error) {
        console.error('Lỗi khi tải sản phẩm mới:', error);
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

const getTopSellingProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const products = await Product.findAll({
            where: { status: 'active', visibility: 'public' },
            order: [['sold_count', 'DESC']], // Sắp xếp theo số lượng đã bán
            limit: limit,
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

const getTopRatedProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const products = await Product.findAll({
            where: { status: 'active', visibility: 'public' },
            order: [['rating_avg', 'DESC']], // Sắp xếp theo điểm đánh giá
            limit: limit,
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

const getTopDiscountedProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const products = await Product.findAll({
            where: {
                status: 'active',
                visibility: 'public',
                sale_price: { [Op.gt]: 0 }, // Phải có giá khuyến mãi
            },
            // Sắp xếp theo % giảm giá
            order: [[sequelize.literal('(price - sale_price) / price'), 'DESC']],
            limit: limit,
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

const getFeaturedBrands = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8; // Get up to 8 brands

        const brands = await Brand.findAll({
            where: { status: 'active' },
            // Add the logic to count associated products
            attributes: {
                include: [[sequelize.fn('COUNT', sequelize.col('Products.id')), 'product_count']],
            },
            include: [
                {
                    model: Product,
                    as: 'Products',
                    attributes: [], // We only need this for counting, so no product attributes are needed
                    where: { status: 'active' }, // Only count active products
                    required: false, // Use LEFT JOIN to include brands with 0 products
                },
            ],
            group: ['Brand.id'],
            order: [['name', 'ASC']],
            limit: limit,
            subQuery: false,
        });

        res.status(200).json(brands);
    } catch (error) {
        console.error('Error fetching featured brands:', error);
        res.status(500).json({ message: 'Server Error.' });
    }
};

const getRecentPosts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 4; // Lấy 4 bài viết
        const posts = await Post.findAll({
            where: { status: 'published' },
            limit: limit,
            order: [['created_at', 'DESC']],
            include: [{ model: User, attributes: ['name'] }], // Lấy kèm tên tác giả
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

const getProductNavigation = async (req, res) => {
    try {
        const { id } = req.params;

        // Tìm sản phẩm hiện tại để lấy ngày tạo của nó
        const currentProduct = await Product.findByPk(id, { attributes: ['created_at'] });
        if (!currentProduct) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại.' });
        }

        // Tìm sản phẩm trước đó (có ngày tạo cũ hơn gần nhất)
        const prevProduct = await Product.findOne({
            where: {
                created_at: { [Op.lt]: currentProduct.created_at },
                status: 'active',
            },
            order: [['created_at', 'DESC']],
            attributes: ['name', 'slug', 'main_image'],
        });

        // Tìm sản phẩm tiếp theo (có ngày tạo mới hơn gần nhất)
        const nextProduct = await Product.findOne({
            where: {
                created_at: { [Op.gt]: currentProduct.created_at },
                status: 'active',
            },
            order: [['created_at', 'ASC']],
            attributes: ['name', 'slug', 'main_image'],
        });

        res.status(200).json({ prev: prevProduct, next: nextProduct });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

const getRelatedProducts = async (req, res) => {
    try {
        const { productId } = req.params;
        const limit = parseInt(req.query.limit) || 10;

        // 1. Tìm danh mục của sản phẩm hiện tại
        const currentProduct = await Product.findByPk(productId, {
            include: [{ model: ProductCategory, as: 'ProductCategories', attributes: ['id'], through: { attributes: [] } }],
        });

        if (!currentProduct || !currentProduct.ProductCategories.length) {
            return res.json([]);
        }

        const categoryIds = currentProduct.ProductCategories.map((cat) => cat.id);

        // 2. Tìm các sản phẩm khác trong cùng danh mục đó
        const relatedProducts = await Product.findAll({
            limit: limit,
            where: {
                id: { [Op.ne]: productId },
                status: 'active',
                visibility: 'public',
            },
            include: [
                {
                    model: ProductCategory,
                    as: 'ProductCategories',
                    where: { id: { [Op.in]: categoryIds } },
                    attributes: [],
                    through: { attributes: [] },
                },
                {
                    model: Brand,
                    as: 'Brand',
                    attributes: ['name', 'slug'],
                },
            ],
            distinct: true,
        });

        res.status(200).json(relatedProducts);
    } catch (error) {
        console.error('Lỗi khi tải sản phẩm liên quan:', error);
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

module.exports = {
    getCategoryHierarchy,
    getPublicCategories,
    getPublicProducts,
    getPublicProductBySlug,
    searchPublicProducts,
    getSearchSuggestions,
    getFeaturedCategories,
    getBannersByPosition,
    getFeaturedProducts,
    subscribeToNewsletter,
    getOnSaleProducts,
    getNewestProducts,
    getTopSellingProducts,
    getTopRatedProducts,
    getTopDiscountedProducts,
    getFeaturedBrands,
    getRecentPosts,
    getProductNavigation,
    getRelatedProducts,
};
