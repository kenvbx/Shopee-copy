// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { Order, OrderItem, Cart, CartItem, Product, Variation, sequelize } = require('../../models');

/**
 * Tạo một đơn hàng mới cho cả người dùng đã đăng nhập và khách.
 */
const createOrder = async (req, res) => {
    // Bắt đầu một transaction để đảm bảo tất cả các thao tác CSDL là an toàn
    const transaction = await sequelize.transaction();

    try {
        const userId = req.user ? req.user.id : null; // Lấy userId nếu có, ngược lại là null

        // Lấy thông tin giao hàng và giỏ hàng từ body của request
        const {
            receiver_name,
            receiver_phone,
            city,
            district,
            ward,
            receiver_address,
            note,
            items, // Dành cho giỏ hàng của khách
        } = req.body;

        // --- BƯỚC 1: Lấy thông tin giỏ hàng ---
        let cartItems;

        if (userId) {
            // Nếu là người dùng đã đăng nhập, lấy giỏ hàng từ CSDL
            const cart = await Cart.findOne({
                where: { user_id: userId },
                include: [
                    {
                        model: CartItem,
                        include: [
                            { model: Product, attributes: ['id', 'name', 'price', 'sale_price', 'stock'] },
                            { model: Variation, attributes: ['id', 'price', 'sale_price', 'stock'] },
                        ],
                    },
                ],
                transaction,
            });
            if (!cart || !cart.CartItems || cart.CartItems.length === 0) {
                return res.status(400).json({ message: 'Giỏ hàng của bạn đang trống.' });
            }
            cartItems = cart.CartItems;
        } else {
            // Nếu là khách, lấy giỏ hàng từ `items` do frontend gửi lên
            if (!items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ message: 'Giỏ hàng của bạn đang trống.' });
            }
            // `items` từ localStorage sẽ có cấu trúc hơi khác
            // Chúng ta cần làm giàu dữ liệu này bằng cách lấy giá chính xác từ CSDL
            const productIds = items.map((item) => item.product_id);
            const productsInDB = await Product.findAll({ where: { id: productIds }, transaction });

            cartItems = items.map((item) => {
                const productDetail = productsInDB.find((p) => p.id === item.product_id);
                if (!productDetail) {
                    throw new Error(`Sản phẩm với ID ${item.product_id} không tồn tại.`);
                }
                return {
                    ...item,
                    Product: productDetail, // Gắn thông tin sản phẩm thật vào
                };
            });
        }

        // --- BƯỚC 2: Tính toán tổng tiền ở backend (quan trọng để bảo mật) ---
        const total = cartItems.reduce((sum, item) => {
            const price = item.Product.sale_price || item.Product.price; // Lấy giá khuyến mãi nếu có
            return sum + item.quantity * price;
        }, 0);

        const fullAddress = `${receiver_address}, ${ward}, ${district}, ${city}`;

        // --- BƯỚC 3: Tạo bản ghi trong bảng `orders` ---
        const newOrder = await Order.create(
            {
                user_id: userId,
                total: total,
                receiver_name,
                receiver_phone,
                receiver_address: fullAddress,
                note,
                status: 'pending', // Trạng thái ban đầu
                payment_status: 'unpaid',
            },
            { transaction }
        );

        // --- BƯỚC 4: Tạo các bản ghi trong bảng `order_items` ---
        const orderItemsToCreate = cartItems.map((item) => ({
            order_id: newOrder.id,
            product_id: item.product_id,
            variation_id: item.variation_id,
            quantity: item.quantity,
            price: item.Product.sale_price || item.Product.price,
            product_name: item.Product.name,
            seller_id: item.Product.seller_id, // Lấy seller_id từ sản phẩm
        }));
        await OrderItem.bulkCreate(orderItemsToCreate, { transaction });

        // --- BƯỚC 5: Xóa giỏ hàng sau khi đã đặt hàng (chỉ cho người dùng đã đăng nhập) ---
        if (userId) {
            const cart = await Cart.findOne({ where: { user_id: userId } });
            if (cart) {
                await CartItem.destroy({ where: { cart_id: cart.id }, transaction });
            }
        }

        // Nếu tất cả thành công, xác nhận transaction
        await transaction.commit();

        res.status(201).json({ message: 'Đặt hàng thành công!', orderId: newOrder.id });
    } catch (error) {
        // Nếu có bất kỳ lỗi nào, hoàn tác tất cả thay đổi
        await transaction.rollback();
        console.error('Lỗi khi tạo đơn hàng:', error);
        res.status(500).json({ message: 'Lỗi máy chủ.', error: error.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Người dùng chưa được xác thực.' });
        }

        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const { status } = req.query;

        const whereCondition = { user_id: userId };
        if (status) {
            whereCondition.status = status;
        }

        const { count, rows } = await Order.findAndCountAll({
            where: whereCondition,
            order: [['created_at', 'DESC']],
            limit,
            offset,
        });

        res.status(200).json({
            data: rows,
            pagination: { totalItems: count, totalPages: Math.ceil(count / limit), currentPage: page },
        });
    } catch (error) {
        console.error('Lỗi khi lấy lịch sử đơn hàng:', error);
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

const getMyOrderDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const { orderId } = req.params;

        const order = await Order.findOne({
            where: {
                id: orderId,
                user_id: userId, // Quan trọng: Đảm bảo đơn hàng này thuộc về người dùng đang đăng nhập
            },
            include: [
                {
                    model: OrderItem,
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'slug', 'main_image'], // Lấy các thông tin cần thiết của sản phẩm
                        },
                    ],
                },
            ],
        });

        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

module.exports = { createOrder, getMyOrders, getMyOrderDetails };
