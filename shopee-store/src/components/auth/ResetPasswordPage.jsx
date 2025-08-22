// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function ResetPasswordPage() {
    const { token } = useParams(); // Lấy token từ URL
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Mật khẩu mới và mật khẩu xác nhận không khớp!');
            return; // Dừng lại nếu không khớp
        }

        try {
            await axios.post('http://localhost:3001/api/auth/reset-password', { token, password });
            toast.success('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
            setTimeout(() => navigate('/'), 2000); // Chuyển về trang login sau 2s
        } catch (error) {
            toast.error(error.response?.data?.message || 'Lỗi khi đổi mật khẩu.');
        }
    };

    return (
        <section className="reset-password pt-4 pb-4">
            <div className="container">
                <div className="row ">
                    <div className="col-md-3" />
                    <div className="col-md-6">
                        <div className="sec-box-white">
                            <div className="form-wrapper successful">
                                <form onSubmit={handleSubmit} className="login-form reset-password">
                                    <h4 className="title">Đặt lại mật khẩu</h4>
                                    <div className="row grid-space-0">
                                        <div className="item col-sm-12 form-group mb-3">
                                            <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật khẩu mới" required />
                                        </div>
                                        <div className="item col-sm-12 form-group mb-3">
                                            <input className="form-control" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Nhập lại mật khẩu mới" required />
                                        </div>
                                        <div className="item  col-sm-12 text-center">
                                            <button type="submit" className="btn btn-primary btn-center btn-reset">
                                                Đặt lại mật khẩu
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                {message && <p>{message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default ResetPasswordPage;
