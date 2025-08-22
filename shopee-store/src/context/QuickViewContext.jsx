// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { createContext, useState, useContext } from 'react';
import api from '../api/axiosInstance';

const QuickViewContext = createContext();

export const QuickViewProvider = ({ children }) => {
    const [product, setProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const openQuickView = async (productSlug) => {
        setLoading(true);
        setIsOpen(true);
        try {
            // Gọi API để lấy dữ liệu chi tiết của sản phẩm
            const response = await api.get(`/api/products/${productSlug}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Failed to fetch product for quick view:', error);
            closeQuickView(); // Đóng modal nếu có lỗi
        } finally {
            setLoading(false);
        }
    };

    const closeQuickView = () => {
        setIsOpen(false);
        setProduct(null); // Xóa dữ liệu sản phẩm khi đóng
    };

    const value = {
        isQuickViewOpen: isOpen,
        quickViewProduct: product,
        isQuickViewLoading: loading,
        openQuickView,
        closeQuickView,
    };

    return <QuickViewContext.Provider value={value}>{children}</QuickViewContext.Provider>;
};

export const useQuickView = () => {
    const context = useContext(QuickViewContext);
    if (!context) {
        throw new Error('useQuickView must be used within a QuickViewProvider');
    }
    return context;
};
