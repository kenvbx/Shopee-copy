// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axiosInstance';

// 1. Tạo Context
const OptionsContext = createContext(null);

// 2. Tạo Provider (Nhà cung cấp)
export const OptionsProvider = ({ children }) => {
    const [options, setOptions] = useState({});
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    // useEffect sẽ tự động chạy một lần để tải tất cả các tùy chọn
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await api.get('/api/options');
                setOptions(response.data);
            } catch (error) {
                console.error('Lỗi khi tải cài đặt trang web:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, []); // Mảng rỗng đảm bảo chỉ chạy 1 lần

    useEffect(() => {
        if (options.site_favicon) {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.getElementsByTagName('head')[0].appendChild(link);
            }
            link.href = `${API_URL}/${options.site_favicon}`;
        }
    }, [options, API_URL]);

    const value = {
        options,
        loading,
    };

    return <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>;
};

// 3. Tạo hook để dễ dàng sử dụng
export const useOptions = () => {
    const context = useContext(OptionsContext);
    if (context === undefined) {
        throw new Error('useOptions must be used within an OptionsProvider');
    }
    return context;
};
