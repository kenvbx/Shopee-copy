// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPasswordPage() {
    const { token } = useParams(); // Lấy token từ URL
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post('http://localhost:3001/api/auth/reset-password', { token, password });
        setMessage(response.data.message);
        setTimeout(() => navigate('/login'), 2000); // Chuyển về trang login sau 2s
        } catch (error) {
        setMessage(error.response?.data?.message || 'Lỗi.');
        }
    };

    return (
        <div>
        <h2>Đặt Lại Mật Khẩu Mới</h2>
        <form onSubmit={handleSubmit}>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật khẩu mới" required />
            <button type="submit">Cập Nhật Mật Khẩu</button>
        </form>
        {message && <p>{message}</p>}
        </div>
    );
}
export default ResetPasswordPage;