// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axiosInstance';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

// 1. Tạo Context
const WishlistContext = createContext(null);

// 2. Tạo Provider
export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [wishlistCount, setWishlistCount] = useState(0);
    const { token, handleShowLogin } = useAuth(); // Lấy token để biết người dùng đã đăng nhập chưa

    // Hàm để tải lại danh sách yêu thích
    const fetchWishlist = async () => {
        if (!token) {
            setWishlistItems([]);
            setWishlistCount(0); // Nếu chưa đăng nhập, wishlist là 0
            return;
        }
        try {
            const response = await api.get('/api/wishlist');
            const itemIds = response.data.map((item) => item.product_id); // Lấy ra mảng các ID
            setWishlistItems(itemIds);
            setWishlistCount(response.data.length || 0);
        } catch (error) {
            console.error('Lỗi khi tải wishlist:', error);
            setWishlistItems([]);
            setWishlistCount(0);
        }
    };

    // Tự động tải lại wishlist khi người dùng đăng nhập hoặc đăng xuất
    useEffect(() => {
        fetchWishlist();
    }, [token]);

    const addToWishlist = async (productId) => {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!token) {
            toast.info('Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích.');
            handleShowLogin(); // Mở popup đăng nhập
            return;
        }

        setWishlistItems((prev) => [...prev, productId]);
        setWishlistCount((prev) => prev + 1);

        try {
            await api.post('/api/wishlist', { productId });
            toast.success('Đã thêm vào danh sách yêu thích!');
            // Tải lại số lượng sau khi thêm thành công
            fetchWishlist();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Thêm vào danh sách yêu thích thất bại.');
            // Nếu lỗi, trả lại trạng thái cũ
            setWishlistItems((prev) => prev.filter((id) => id !== productId));
            setWishlistCount((prev) => prev - 1);
        }
    };

    const removeFromWishlist = async (productId) => {
        // Cập nhật giao diện ngay lập tức
        setWishlistItems((prev) => prev.filter((id) => id !== productId));
        setWishlistCount((prev) => prev - 1);

        try {
            await api.delete(`/api/wishlist/${productId}`);
            toast.info('Đã xóa khỏi danh sách yêu thích.');
        } catch (error) {
            toast.error('Xóa thất bại.');
            // Nếu lỗi, tải lại dữ liệu từ server
            fetchWishlist();
        }
    };

    const value = {
        wishlistItems,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        fetchWishlist,
    };

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

// 3. Tạo hook để dễ dàng sử dụng
export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
