// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState } from 'react';
import axios from 'axios';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const origin = window.location.origin; // Lấy URL gốc của trang web (vd: http://localhost:5173)
            const response = await axios.post('http://localhost:3001/api/auth/forgot-password', { email, origin });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Đã có lỗi xảy ra.');
        }
    };

    return (
        <div>
        <h2>Quên Mật Khẩu</h2>
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email của bạn" required />
            <button type="submit">Gửi Link Reset</button>
        </form>
        {message && <p>{message}</p>}
        </div>
    );
}
export default ForgotPasswordPage;