// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/auth/admin/login', {
                ...formData,
                rememberMe: rememberMe,
            });
            localStorage.setItem('admin_token', response.data.token); // Lưu token riêng cho admin
            window.location.href = '/dashboard'; // Chuyển hướng đến trang dashboard sau khi login
        } catch (err) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra.');
        }
    };

    return (
        <div className="wrapper">
            <main className="authentication-content">
                <div className="container-fluid">
                    <div className="authentication-card">
                        <div className="card shadow rounded-0 overflow-hidden">
                            <div className="row g-0">
                                <div className="col-lg-6 bg-login d-flex align-items-center justify-content-center">
                                    <img src="assets/images/error/login-img.jpg" className="img-fluid" alt="" />
                                </div>
                                <div className="col-lg-6">
                                    <div className="card-body p-4 p-sm-5">
                                        <h5 className="card-title">Đăng nhập</h5>
                                        <p className="card-text mb-5">See your growth and get consulting support!</p>
                                        {error && <p style={{ color: 'red' }}>{error}</p>}
                                        <form onSubmit={handleSubmit} className="form-body">
                                            <div className="d-grid">
                                                <a className="btn btn-white radius-30" href="javascript:;">
                                                    <span className="d-flex justify-content-center align-items-center">
                                                        <img className="me-2" src="assets/images/icons/search.svg" width={16} alt="" />
                                                        <span>Sign in with Google</span>
                                                    </span>
                                                </a>
                                            </div>
                                            <div className="login-separater text-center mb-4">
                                                {' '}
                                                <span>OR SIGN IN WITH EMAIL</span>
                                                <hr />
                                            </div>
                                            <div className="row g-3">
                                                <div className="col-12">
                                                    <label htmlFor="inputEmailAddress" className="form-label">
                                                        Địa chỉ email
                                                    </label>
                                                    <div className="ms-auto position-relative">
                                                        <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                                                            <i className="bi bi-envelope-fill" />
                                                        </div>
                                                        <input placeholder="Địa chỉ email" className="form-control radius-30 ps-5" type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="inputChoosePassword" className="form-label">
                                                        Mật khẩu
                                                    </label>
                                                    <div className="ms-auto position-relative">
                                                        <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                                                            <i className="bi bi-lock-fill" />
                                                        </div>
                                                        <input placeholder="Mật khẩu" className="form-control radius-30 ps-5" type="password" name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                                                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                                            Ghi nhớ đăng nhập
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-6 text-end">
                                                    <Link to="/forgot-password">Quên mật khẩu?</Link>
                                                </div>
                                                <div className="col-12">
                                                    <div className="d-grid">
                                                        <button type="submit" className="btn btn-primary radius-30">
                                                            Đăng Nhập
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
export default LoginPage;
