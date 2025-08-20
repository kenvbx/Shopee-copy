// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState } from 'react';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/public/subscribe-newsletter', { email });
            toast.success(response.data.message);
            setEmail(''); // Xóa email trong ô input sau khi thành công
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đăng ký thất bại, vui lòng thử lại.');
        }
    };

    return (
        <section className="news-part" style={{ backgroundImage: 'url(/images/newsletter.jpg)' }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-5 col-lg-6 col-xl-7">
                        <div className="news-text">
                            <h2>Get 20% Discount for Subscriber</h2>
                            <p>Lorem ipsum dolor consectetur adipisicing accusantium</p>
                        </div>
                    </div>
                    <div className="col-md-7 col-lg-6 col-xl-5">
                        <form className="news-form" onSubmit={handleSubmit}>
                            <input type="email" placeholder="Enter Your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <button type="submit">
                                <span>
                                    <i className="icofont-ui-email"></i>Subscribe
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
