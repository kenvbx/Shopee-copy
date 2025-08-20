// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import api from '../../api/axiosInstance';

// Component con để hiển thị các ngôi sao
const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(<li key={i} className={`fas fa-star ${i <= rating ? 'active' : ''}`}></li>);
    }
    return <ul>{stars}</ul>;
};

const TestimonialSection = () => {
    const [testimonials, setTestimonials] = useState([]);
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await api.get('/api/public/testimonials');
                setTestimonials(response.data);
            } catch (error) {
                console.error('Lỗi khi tải testimonials:', error);
            }
        };
        fetchTestimonials();
    }, []);

    const settings = {
        dots: false,
        infinite: testimonials.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    if (testimonials.length === 0) {
        return null;
    }

    return (
        <section className="section testimonial-part">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-heading">
                            <h2>client's feedback</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Slider {...settings} className="testimonial-slider slider-arrow">
                            {testimonials.map((item) => (
                                <div key={item.id}>
                                    <div className="testimonial-card">
                                        <i className="fas fa-quote-left"></i>
                                        <p>{item.content}</p>
                                        <h5>{item.author_name}</h5>
                                        <StarRating rating={item.rating} />
                                        <img src={item.avatar_url ? `${API_URL}/${item.avatar_url}` : '/images/avatar/01.jpg'} alt={item.author_name} />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
