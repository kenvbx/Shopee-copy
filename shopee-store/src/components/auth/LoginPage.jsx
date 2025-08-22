// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState } from 'react';
import { useOptions } from '../context/OptionsContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const navigate = useNavigate();
    const { options, loading } = useOptions();
    const { login } = useAuth();

    const [formData, setFormData] = useState({ emailOrPhone: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);

    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/auth/login', {
                emailOrPhone: formData.emailOrPhone,
                password: formData.password,
                rememberMe: rememberMe,
            });
            login(response.data.token);
            toast.success('Đăng nhập thành công!');
            navigate('/'); // Chuyển về trang chủ sau khi đăng nhập
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đăng nhập thất bại.');
        }
    };

    return (
        <section className="user-form-part">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-10">
                        <div className="user-form-logo">
                            <Link to="/">{loading ? <span>Loading...</span> : <img src={options.site_logo ? `${API_URL}/${options.site_logo}` : '/assets/img/logo.png'} alt="logo" />}</Link>
                        </div>
                        <div className="user-form-card">
                            <div className="user-form-title">
                                <h2>welcome!</h2>
                                <p>Use your credentials to access</p>
                            </div>
                            <div className="user-form-group">
                                <form onSubmit={handleSubmit} className="user-form">
                                    <div className="form-group">
                                        <input type="text" name="emailOrPhone" className="form-control" placeholder="Enter your email or phone" value={formData.emailOrPhone} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" className="form-control" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                                    </div>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" id="check" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                                        <label className="form-check-label" htmlFor="check">
                                            Ghi nhớ đăng nhập
                                        </label>
                                    </div>
                                    <div className="form-button">
                                        <button type="submit">Đăng nhập</button>
                                        <p>
                                            <Link to="/reset-password">Quên mật khẩu?</Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="user-form-remind">
                            <p>
                                Bạn chưa có tài khoản?<Link to="/register">Đăng ký ngay</Link>
                            </p>
                        </div>
                        <div className="user-form-footer">
                            <p>
                                Greeny | © Copyright by <a href="#">Mironcoder</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
