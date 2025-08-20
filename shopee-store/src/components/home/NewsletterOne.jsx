// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState } from 'react';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';

const NewsletterOne = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/public/subscribe-newsletter', { email });
            toast.success(response.data.message);
            setEmail(''); // Xóa email trong ô input sau khi thành công
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đăng ký thất bại.');
        }
    };

    return (
        <div className="banner-content w-100 " data-animation-options="{ 'delay': '.2s', 'name': 'blurIn'}">
            <h4 className="banner-subtitle font-weight-bold ls-s text-white text-uppercase">Coming soon</h4>
            <h2 className="banner-title font-weight-normal ls-m">
                <strong>Black Friday</strong>
                Sale
            </h2>
            <p className="font-primary text-dark ls-normal text-capitalize lh-1">Get 10% off first order</p>
            <form onSubmit={handleSubmit} className="input-wrapper input-wrapper-inline">
                <input type="email" className="form-control mb-4" placeholder="Email address here..." value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button className="btn btn-secondary btn-sm" type="submit">
                    Subscribe
                    <i className="d-icon-arrow-right" />
                </button>
            </form>
        </div>
    );
};

export default NewsletterOne;
