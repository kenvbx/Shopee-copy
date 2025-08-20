// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState } from 'react';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // BƯỚC 1: Gọi API
            const response = await api.post('/api/auth/forgot-password', { email });

            // BƯỚC 2: Nếu API trả về thành công (status 200) -> hiển thị toast.success
            toast.success(response.data.message, {
                autoClose: 5000,
            });
        } catch (error) {
            // BƯỚC 3: Nếu API trả về lỗi (ví dụ: status 404) -> hiển thị toast.error
            // Lấy thông báo lỗi cụ thể từ backend
            const errorMessage = error.response?.data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại.';
            toast.error(errorMessage);
        }
    };

    return (
        <section className="forgot-password pt-4 pb-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-3" />
                    <div className="col-md-6">
                        <div className="sec-box-white">
                            <div className="successful">
                                <form onSubmit={handleSubmit} className="login-form reset-password">
                                    <h4 className="title">Đặt lại mật khẩu</h4>
                                    <div className="row grid-space-0">
                                        <div className="item col-sm-12 ">
                                            <p>Nhập email tài khoản của bạn để nhận liên kết cho phép bạn đặt lại mật khẩu của mình.</p>
                                        </div>
                                        <div className="item col-sm-12 mb-3">
                                            <input type="email" className="form-control" id="email-for-pass" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập địa chỉ Email" required />
                                        </div>
                                        <div className="item col-sm-12 text-center">
                                            <button type="submit" className="btn btn-primary round md btn-reset" style={{ margin: '0 auto' }} data-loading="">
                                                Đặt lại mật khẩu
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPasswordPage;
