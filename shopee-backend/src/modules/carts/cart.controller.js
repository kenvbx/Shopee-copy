// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { Cart, CartItem, Product, sequelize } = require('../../models');

// Thêm sản phẩm vào giỏ hàng
const addToCart = async (req, res) => {
    try {
        const userId = req.user.id; // Lấy từ authMiddleware
        const { productId, variationId, quantity } = req.body;

        // Tìm hoặc tạo giỏ hàng cho người dùng
        const [cart] = await Cart.findOrCreate({ where: { user_id: userId } });

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const [cartItem, created] = await CartItem.findOrCreate({
            where: { cart_id: cart.id, product_id: productId, variation_id: variationId || null },
            defaults: { quantity: quantity },
        });

        // Nếu sản phẩm đã có, cộng thêm số lượng
        if (!created) {
            cartItem.quantity += quantity;
            await cartItem.save();
        }

        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.', error: error.message });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { cartItemId } = req.params;
        const { quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({ message: 'Số lượng phải lớn hơn 0.' });
        }

        const cart = await Cart.findOne({ where: { user_id: userId } });
        if (!cart) return res.status(404).json({ message: 'Không tìm thấy giỏ hàng.' });

        const [updated] = await CartItem.update({ quantity: quantity }, { where: { id: cartItemId, cart_id: cart.id } });

        if (updated === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng.' });
        }

        res.status(200).json({ message: 'Cập nhật số lượng thành công.' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.', error: error.message });
    }
};

// Lấy thông tin giỏ hàng
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({
            where: { user_id: userId },
            include: [
                {
                    model: CartItem,
                    include: [{ model: Product, attributes: ['name', 'price', 'main_image'] }],
                },
            ],
        });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.', error: error.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { cartItemId } = req.params; // ID của cart_item cần xóa

        const cart = await Cart.findOne({ where: { user_id: userId } });
        if (!cart) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng.' });
        }

        const result = await CartItem.destroy({
            where: {
                id: cartItemId,
                cart_id: cart.id, // Đảm bảo chỉ xóa item trong giỏ hàng của chính user đó
            },
        });

        if (result === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng.' });
        }

        res.status(200).json({ message: 'Đã xóa sản phẩm khỏi giỏ hàng.' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.', error: error.message });
    }
};

// HÀM Đồng bộ giỏ hàng của khách vào tài khoản
const syncCart = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const userId = req.user.id;
        const guestCartItems = req.body.items; // Mảng items từ localStorage

        if (!Array.isArray(guestCartItems) || guestCartItems.length === 0) {
            return res.status(200).json({ message: 'Không có gì để đồng bộ.' });
        }

        // Lấy hoặc tạo giỏ hàng của người dùng
        const [userCart] = await Cart.findOrCreate({ where: { user_id: userId }, transaction });

        // Lặp qua từng sản phẩm trong giỏ hàng của khách
        for (const guestItem of guestCartItems) {
            // Tìm xem sản phẩm này đã có trong giỏ hàng trên server chưa
            const existingItem = await CartItem.findOne({
                where: {
                    cart_id: userCart.id,
                    product_id: guestItem.product_id,
                    variation_id: guestItem.variation_id || null,
                },
                transaction,
            });

            if (existingItem) {
                // Nếu đã có, cộng dồn số lượng
                existingItem.quantity += guestItem.quantity;
                await existingItem.save({ transaction });
            } else {
                // Nếu chưa có, tạo mới
                await CartItem.create(
                    {
                        cart_id: userCart.id,
                        product_id: guestItem.product_id,
                        variation_id: guestItem.variation_id || null,
                        quantity: guestItem.quantity,
                    },
                    { transaction }
                );
            }
        }

        await transaction.commit();
        res.status(200).json({ message: 'Đồng bộ giỏ hàng thành công.' });
    } catch (error) {
        await transaction.rollback();
        console.error('Lỗi đồng bộ giỏ hàng:', error);
        res.status(500).json({ message: 'Lỗi máy chủ.', error: error.message });
    }
};

module.exports = { addToCart, updateCartItem, getCart, removeFromCart, syncCart };
