// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axiosInstance';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('user_token'));
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authView, setAuthView] = useState('login');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    // Gọi API để lấy thông tin user đầy đủ
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

    const handleShowLogin = () => {
        setAuthView('login');
        setShowAuthModal(true);
    };

    const handleShowRegister = () => {
        setAuthView('register');
        setShowAuthModal(true);
    };

    const handleCloseAuthModal = () => {
        setShowAuthModal(false);
    };

    const switchToRegister = () => setAuthView('register');
    const switchToLogin = () => setAuthView('login');

    const login = async (newToken) => {
        localStorage.setItem('user_token', newToken);
        setToken(newToken);
        handleCloseAuthModal();
    };

    const logout = () => {
        localStorage.removeItem('user_token');
        setToken(null);
        setUser(null);
    };

    const updateUser = (newUserData) => {
        setUser((prevUser) => ({ ...prevUser, ...newUserData }));
    };

    const value = {
        user,
        token,
        loading,
        login,
        logout,
        showAuthModal,
        authView,
        handleShowLogin,
        handleShowRegister,
        handleCloseAuthModal,
        switchToRegister,
        switchToLogin,
        updateUser,
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
