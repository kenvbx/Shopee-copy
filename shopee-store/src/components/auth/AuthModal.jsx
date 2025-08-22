// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';

const AuthModal = () => {
    const { isModalOpen, closeModal, authView, setAuthView, login } = useAuth();
    const [activeTab, setActiveTab] = useState('login');

    // Form states
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(emailOrPhone, password);
            toast.success('Đăng nhập thành công!');
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng nhập không thành công. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axiosInstance.post('/api/auth/register', { name, emailOrPhone, password });
            toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
            setActiveTab('login'); // Switch to login tab after successful registration
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng ký không thành công. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    // Hàm reset state khi chuyển tab hoặc đóng modal
    const resetForm = () => {
        setEmailOrPhone('');
        setPassword('');
        setName('');
        setError('');
    };

    const handleClose = () => {
        resetForm();
        closeModal();
    };

    const handleTabChange = (tab) => {
        resetForm();
        setActiveTab(tab);
    };

    if (!isModalOpen) {
        return null;
    }

    return (
        <>
            <div className="mfp-bg mfp-login mfp-fade mfp-ready"></div>

            <div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready" style={{ overflow: 'hidden auto' }}>
                <div className="mfp-container mfp-s-ready mfp-inline-holder">
                    <div className="mfp-content">
                        <div className="login-popup">
                            <div className="form-box">
                                <div className="tab tab-nav-simple tab-nav-boxed form-tab">
                                    <ul className="nav nav-tabs nav-fill align-items-center border-no justify-content-center mb-5" role="tablist">
                                        <li className="nav-item">
                                            <a
                                                className={`nav-link border-no lh-1 ls-normal ${activeTab === 'login' ? 'active' : ''}`}
                                                href="#signin"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleTabChange('login');
                                                }}
                                            >
                                                Đăng nhập
                                            </a>
                                        </li>
                                        <li className="delimiter">hoặc</li>
                                        <li className="nav-item">
                                            <a
                                                className={`nav-link border-no lh-1 ls-normal ${activeTab === 'register' ? 'active' : ''}`}
                                                href="#register"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleTabChange('register');
                                                }}
                                            >
                                                Đăng ký
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        {/* Login Tab */}
                                        <div className={`tab-pane ${activeTab === 'login' ? 'active in' : ''}`} id="signin">
                                            <form onSubmit={handleLogin}>
                                                <div className="form-group mb-3">
                                                    <input type="text" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} className="form-control" placeholder="Email or Phone Number *" required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password *" required />
                                                </div>
                                                {error && activeTab === 'login' && <p style={{ color: 'red' }}>{error}</p>}
                                                <button className="btn btn-dark btn-block btn-rounded" type="submit" disabled={loading}>
                                                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                                                </button>
                                            </form>
                                        </div>

                                        {/* Register Tab */}
                                        <div className={`tab-pane ${activeTab === 'register' ? 'active in' : ''}`} id="register">
                                            <form onSubmit={handleRegister}>
                                                <div className="form-group mb-3">
                                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Your Name *" required />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <input type="text" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} className="form-control" placeholder="Email or Phone Number *" required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password *" required />
                                                </div>
                                                {error && activeTab === 'register' && <p style={{ color: 'red' }}>{error}</p>}
                                                <button className="btn btn-dark btn-block btn-rounded" type="submit" disabled={loading}>
                                                    {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <button title="Close (Esc)" type="button" className="mfp-close" onClick={closeModal}>
                                    <span>×</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthModal;
