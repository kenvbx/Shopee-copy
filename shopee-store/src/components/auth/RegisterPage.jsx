// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState } from 'react';
import { useOptions } from '../context/OptionsContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { options, loading } = useOptions();

    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const [formData, setFormData] = useState({
        name: '',
        emailOrPhone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Mật khẩu xác nhận không khớp!');
            return;
        }

        try {
            const payload = {
                name: formData.name,
                emailOrPhone: formData.emailOrPhone,
                password: formData.password,
            };

            await api.post('/api/auth/register', payload);
            toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
            navigate('/login'); // Chuyển đến trang đăng nhập sau khi đăng ký
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đăng ký thất bại.');
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
                                <h2>Join Now!</h2>
                                <p>Setup A New Account In A Minute</p>
                            </div>
                            <div className="user-form-group">
                                <form className="user-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input type="text" name="name" className="form-control" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="emailOrPhone" className="form-control" placeholder="Enter your email or phone" value={formData.emailOrPhone} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" className="form-control" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="confirmPassword" className="form-control" placeholder="Enter repeat password" value={formData.confirmPassword} onChange={handleChange} required />
                                    </div>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" id="check" required />
                                        <label className="form-check-label" htmlFor="check">
                                            Accept all the <a href="#">Terms & Conditions</a>
                                        </label>
                                    </div>
                                    <div className="form-button">
                                        <button type="submit">Đăng ký</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="user-form-remind">
                            <p>
                                Bạn đã có tài khoản?<Link to="/login">Đăng nhập</Link>
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

export default RegisterPage;
