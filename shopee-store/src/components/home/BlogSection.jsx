// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import api from '../../api/axiosInstance';

const BlogSection = () => {
    const [posts, setPosts] = useState([]);
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const response = await api.get('/api/public/posts/recent?limit=4');
                setPosts(response.data);
            } catch (error) {
                console.error('Lỗi khi tải bài viết:', error);
            }
        };
        fetchRecentPosts();
    }, []);

    const settings = {
        dots: false,
        infinite: posts.length > 3,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            { breakpoint: 992, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };

    if (posts.length === 0) {
        return null;
    }

    return (
        <section className="section blog-part">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-heading">
                            <h2>Read our articles</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Slider {...settings} className="blog-slider slider-arrow">
                            {posts.map((post) => (
                                <div key={post.id}>
                                    <div className="blog-card">
                                        <div className="blog-media">
                                            <Link className="blog-img" to={`/blog/${post.slug}`}>
                                                <img src={post.featured_image ? `${API_URL}/${post.featured_image}` : '/images/blog/01.jpg'} alt={post.title} />
                                            </Link>
                                        </div>
                                        <div className="blog-content">
                                            <ul className="blog-meta">
                                                <li>
                                                    <i className="fas fa-user"></i>
                                                    <span>{post.User?.name || 'Admin'}</span>
                                                </li>
                                                <li>
                                                    <i className="fas fa-calendar-alt"></i>
                                                    <span>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                </li>
                                            </ul>
                                            <h4 className="blog-title">
                                                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                            </h4>
                                            <p className="blog-desc">{post.excerpt}</p>
                                            <Link className="blog-btn" to={`/blog/${post.slug}`}>
                                                <span>read more</span>
                                                <i className="icofont-arrow-right"></i>
                                            </Link>
                                        </div>
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

export default BlogSection;
