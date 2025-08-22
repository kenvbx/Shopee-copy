// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../api/axiosInstance';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('user_token'));
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authView, setAuthView] = useState('login');

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await api.get('/api/auth/me');
                    setUser(response.data);
                } catch (error) {
                    console.error('Token không hợp lệ, đang đăng xuất:', error);
                    logout(); // Tự động đăng xuất nếu token sai
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, [token]);

    const openModal = (view = 'login') => {
        setAuthView(view);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const switchToRegister = () => setAuthView('register');
    const switchToLogin = () => setAuthView('login');

    /**
     * Hàm đăng nhập, gọi API và cập nhật state
     * @param {string} email
     * @param {string} password
     */
    const login = async (emailOrPhone, password) => {
        try {
            const response = await api.post('/api/auth/login', { emailOrPhone, password });
            const newToken = response.data.token;

            localStorage.setItem('user_token', newToken);

            api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            setToken(newToken); // Thao tác này sẽ trigger useEffect để fetch user

            closeModal();
            return response.data;
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            // Ném lỗi ra ngoài để component có thể bắt và hiển thị
            throw error;
        }
    };

    /**
     * Hàm đăng xuất
     */
    const logout = () => {
        localStorage.removeItem('user_token');
        setToken(null);
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
    };

    /**
     * Cập nhật thông tin user (ví dụ: sau khi edit profile)
     * @param {object} newUserData
     */
    const updateUser = (newUserData) => {
        setUser((prevUser) => ({ ...prevUser, ...newUserData }));
    };

    const value = {
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        updateUser,

        isModalOpen,
        authView,
        openModal,
        closeModal,
        switchToRegister,
        switchToLogin,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// Hook tùy chỉnh để dễ dàng sử dụng context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
