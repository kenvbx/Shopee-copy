// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function AuthModal() {
    // Lấy state và các hàm từ AuthContext
    const { showAuthModal, handleCloseAuthModal, authView, switchToLogin, switchToRegister, login } = useAuth();

    // State cho form đăng nhập
    const [loginData, setLoginData] = useState({ emailOrPhone: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);

    // State cho form đăng ký
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
    const handleRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value });

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/auth/login', {
                emailOrPhone: loginData.emailOrPhone,
                password: loginData.password,
                rememberMe: rememberMe,
            });
            login(response.data.token);
            toast.success('Đăng nhập thành công!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đăng nhập thất bại.');
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/auth/register', registerData);
            toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
            switchToLogin();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đăng ký thất bại.');
        }
    };

    return (
        // Thêm class `opened` dựa vào state `showAuthModal`
        <div className={`dropdown login-dropdown off-canvas ${showAuthModal ? 'opened' : ''}`}>
            <div className="canvas-overlay" onClick={handleCloseAuthModal}></div>
            <div className="dropdown-box scrollable">
                <div className="login-popup">
                    <div className="form-box">
                        <div className="tab tab-nav-simple tab-nav-boxed form-tab">
                            <ul className="nav nav-tabs nav-fill align-items-center border-no justify-content-center mb-5">
                                <li className="nav-item">
                                    <a
                                        className={`nav-link border-no lh-1 ls-normal ${authView === 'login' ? 'active' : ''}`}
                                        href="#signin"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            switchToLogin();
                                        }}
                                    >
                                        Đăng nhập
                                    </a>
                                </li>
                                <li className="delimiter">hoặc</li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link border-no lh-1 ls-normal ${authView === 'register' ? 'active' : ''}`}
                                        href="#register"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            switchToRegister();
                                        }}
                                    >
                                        Đăng ký
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                {/* Form Đăng nhập */}
                                <div className={`tab-pane ${authView === 'login' ? 'active' : ''}`} id="signin">
                                    <form onSubmit={handleLoginSubmit}>
                                        <div className="form-group mb-3">
                                            <input type="text" className="form-control" name="emailOrPhone" placeholder="Email hoặc số điện thoại" required onChange={handleLoginChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" name="password" placeholder="Mật khẩu" required onChange={handleLoginChange} />
                                        </div>
                                        <div className="form-footer">
                                            <div className="form-checkbox">
                                                <input type="checkbox" className="custom-checkbox" id="signin-remember" name="signin-remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                                                <label className="form-control-label" htmlFor="signin-remember">
                                                    Ghi nhớ đăng nhập
                                                </label>
                                            </div>
                                            <Link to="/forgot-password" className="lost-link">
                                                Quên mật khẩu?
                                            </Link>
                                        </div>
                                        <button className="btn btn-dark btn-block btn-rounded" type="submit">
                                            Login
                                        </button>
                                    </form>
                                    <div className="form-choice text-center">
                                        <label className="ls-m">or Login With</label>
                                        <div className="social-links">
                                            <a href="#" className="social-link social-google fab fa-google border-no" />
                                            <a href="#" className="social-link social-facebook fab fa-facebook-f border-no" />
                                            <a href="#" className="social-link social-twitter fab fa-twitter border-no" />
                                        </div>
                                    </div>
                                </div>

                                {/* Form Đăng ký */}
                                <div className={`tab-pane ${authView === 'register' ? 'active' : ''}`} id="register">
                                    <form onSubmit={handleRegisterSubmit}>
                                        <div className="form-group mb-3">
                                            <input type="text" className="form-control" name="name" placeholder="Họ và tên" required onChange={handleRegisterChange} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input type="text" className="form-control" name="emailOrPhone" placeholder="Email hoặc số điện thoại" required onChange={handleRegisterChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" name="password" placeholder="Mật khẩu" required onChange={handleRegisterChange} />
                                        </div>
                                        <div className="form-footer">
                                            <div className="form-checkbox">
                                                <input type="checkbox" className="custom-checkbox" id="register-agree" name="register-agree" required="" />
                                                <label className="form-control-label" htmlFor="register-agree">
                                                    I agree to the privacy policy
                                                </label>
                                            </div>
                                        </div>
                                        <button className="btn btn-dark btn-block btn-rounded" type="submit">
                                            Đăng ký
                                        </button>
                                    </form>
                                    <div className="form-choice text-center">
                                        <label className="ls-m">or Register With</label>
                                        <div className="social-links">
                                            <a href="#" className="social-link social-google fab fa-google border-no" />
                                            <a href="#" className="social-link social-facebook fab fa-facebook-f border-no" />
                                            <a href="#" className="social-link social-twitter fab fa-twitter border-no" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button title="Close (Esc)" type="button" className="mfp-close" onClick={handleCloseAuthModal}>
                        <span>×</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthModal;
