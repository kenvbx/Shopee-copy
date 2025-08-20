// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ CartItems: [] });
    const [itemCount, setItemCount] = useState(0);
    const [showMiniCart, setShowMiniCart] = useState(false);
    const { token } = useAuth();

    const toggleMiniCart = () => setShowMiniCart(!showMiniCart);
    const openMiniCart = () => setShowMiniCart(true);
    const closeMiniCart = () => setShowMiniCart(false);

    // HÀM MỚI: Dọn dẹp giỏ hàng
    const clearCart = () => {
        if (!token) {
            // Chỉ áp dụng cho khách
            localStorage.removeItem('guest_cart');
        }
        // Reset state
        setCart({ CartItems: [] });
        setItemCount(0);
    };
    // Hàm tính tổng số lượng sản phẩm
    const calculateItemCount = (items) => {
        return items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    };

    const updateQuantity = async (item, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(item); // Nếu số lượng là 0, xóa sản phẩm
            return;
        }

        if (token) {
            // LOGIC CHO USER ĐÃ ĐĂNG NHẬP
            try {
                await api.put(`/api/cart/item/${item.id}`, { quantity: newQuantity });
                fetchCart();
            } catch (error) {
                toast.error('Cập nhật thất bại.');
            }
        } else {
            // LOGIC CHO KHÁCH (GUEST)
            let currentCart = JSON.parse(localStorage.getItem('guest_cart')) || {
                CartItems: [],
            };
            const itemIndex = currentCart.CartItems.findIndex((cartItem) => cartItem.product_id === item.product_id && cartItem.variation_id === item.variation_id);
            if (itemIndex > -1) {
                currentCart.CartItems[itemIndex].quantity = newQuantity;
                localStorage.setItem('guest_cart', JSON.stringify(currentCart));
                setCart(currentCart);
                setItemCount(calculateItemCount(currentCart.CartItems));
            }
        }
    };

    const removeFromCart = async (itemToRemove) => {
        // --- BƯỚC 1: CẬP NHẬT GIAO DIỆN NGAY LẬP TỨC (OPTIMISTIC UPDATE) ---
        const previousCart = cart; // Lưu lại trạng thái giỏ hàng cũ để có thể khôi phục nếu lỗi

        // Tạo một giỏ hàng mới bằng cách lọc ra sản phẩm cần xóa
        const newCartItems = cart.CartItems.filter((item) => {
            // Logic xóa cho cả khách và người dùng đã đăng nhập
            const itemId = item.id || item.product_id;
            const itemToRemoveId = itemToRemove.id || itemToRemove.product_id;
            return itemId !== itemToRemoveId;
        });

        // Cập nhật state ngay lập tức để người dùng thấy sản phẩm biến mất
        setCart({ ...cart, CartItems: newCartItems });
        setItemCount(calculateItemCount(newCartItems));
        toast.info('Đã xóa sản phẩm khỏi giỏ hàng.');

        // --- BƯỚC 2: GỬI YÊU CẦU LÊN SERVER (HOẶC CẬP NHẬT LOCALSTORAGE) ---
        try {
            if (token) {
                // Nếu là người dùng đã đăng nhập, gọi API
                await api.delete(`/api/cart/item/${itemToRemove.id}`);
            } else {
                // Nếu là khách, cập nhật localStorage
                localStorage.setItem('guest_cart', JSON.stringify({ CartItems: newCartItems }));
            }
        } catch (error) {
            // --- BƯỚC 3: NẾU CÓ LỖI, KHÔI PHỤC LẠI GIAO DIỆN ---
            toast.error('Xóa sản phẩm thất bại, vui lòng thử lại.');
            setCart(previousCart); // Trả lại giỏ hàng về trạng thái cũ
            setItemCount(calculateItemCount(previousCart.CartItems));
        }
    };

    // Tải giỏ hàng khi có token (người dùng đăng nhập) hoặc khi component được mount
    useEffect(() => {
        const handleAuthChange = async () => {
            if (token) {
                // --- NGƯỜI DÙNG VỪA ĐĂNG NHẬP ---
                const guestCart = JSON.parse(localStorage.getItem('guest_cart'));
                const serverCartResponse = await api.get('/api/cart');
                let serverCart = serverCartResponse.data || { CartItems: [] };

                if (guestCart && guestCart.CartItems && guestCart.CartItems.length > 0) {
                    try {
                        // Gửi giỏ hàng của khách lên server để đồng bộ
                        await api.post('/api/cart/sync', { items: guestCart.CartItems });
                        localStorage.removeItem('guest_cart');

                        // Gộp giỏ hàng ngay trên frontend để cập nhật UI tức thì
                        const mergedCartItems = [...serverCart.CartItems];
                        guestCart.CartItems.forEach((guestItem) => {
                            const existingIndex = mergedCartItems.findIndex((serverItem) => serverItem.product_id === guestItem.product_id);
                            if (existingIndex > -1) {
                                mergedCartItems[existingIndex].quantity += guestItem.quantity;
                            } else {
                                mergedCartItems.push(guestItem);
                            }
                        });
                        serverCart.CartItems = mergedCartItems;
                    } catch (error) {
                        console.error('Đồng bộ giỏ hàng thất bại:', error);
                    }
                }
                // Cập nhật giỏ hàng cuối cùng
                setCart(serverCart);
                setItemCount(calculateItemCount(serverCart.CartItems));
            } else {
                // --- NGƯỜI DÙNG VỪA ĐĂNG XUẤT HOẶC LÀ KHÁCH ---
                const localCart = JSON.parse(localStorage.getItem('guest_cart'));
                setCart(localCart || { CartItems: [] });
                setItemCount(calculateItemCount(localCart?.CartItems));
            }
        };
        handleAuthChange();
    }, [token]);

    const fetchCartFromServer = async () => {
        try {
            const response = await api.get('/api/cart');
            setCart(response.data || { CartItems: [] });
            setItemCount(calculateItemCount(response.data?.CartItems));
        } catch (error) {
            setCart({ CartItems: [] });
            setItemCount(0);
        }
    };

    const addToCart = async (product, quantity, variation = null) => {
        if (token) {
            // --- LOGIC CHO NGƯỜI DÙNG ĐÃ ĐĂNG NHẬP ---
            try {
                await api.post('/api/cart/add', {
                    productId: product.id,
                    quantity,
                    variationId: variation?.id,
                });
                toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
                // Tải lại giỏ hàng từ server để cập nhật
                const response = await api.get('/api/cart');
                setCart(response.data || { CartItems: [] });
                setItemCount(calculateItemCount(response.data?.CartItems));
            } catch (error) {
                toast.error('Thêm vào giỏ hàng thất bại.');
            }
        } else {
            // --- LOGIC CHO KHÁCH (GUEST) ---
            const currentCart = JSON.parse(localStorage.getItem('guest_cart')) || {
                CartItems: [],
            };
            const existingItemIndex = currentCart.CartItems.findIndex((item) => item.product_id === product.id && item.variation_id === variation?.id);

            if (existingItemIndex > -1) {
                // Nếu sản phẩm đã có, tăng số lượng
                currentCart.CartItems[existingItemIndex].quantity += quantity;
            } else {
                // Nếu chưa có, thêm sản phẩm mới
                const newItem = {
                    product_id: product.id,
                    variation_id: variation?.id,
                    quantity: quantity,
                    // Thêm thông tin sản phẩm để có thể hiển thị trong trang giỏ hàng
                    Product: {
                        name: product.name,
                        price: product.price,
                        main_image: product.main_image,
                        slug: product.slug,
                    },
                };
                currentCart.CartItems.push(newItem);
            }

            // Lưu lại vào localStorage và cập nhật state
            localStorage.setItem('guest_cart', JSON.stringify(currentCart));
            setCart(currentCart);
            setItemCount(calculateItemCount(currentCart.CartItems));
            toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                itemCount,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                showMiniCart,
                openMiniCart,
                closeMiniCart,
                fetchCartFromServer,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
