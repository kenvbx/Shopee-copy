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
import SubBanner from '../home/SubBanner';

// Import CSS cho react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomeSlider = () => {
    const [slides, setSlides] = useState([]);
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/api/public/categories');
                setCategories(res.data); // giả sử API trả về [{id, name, slug, image_url}]
            } catch (err) {
                console.error('Lỗi khi tải danh mục:', err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                // Gọi API để lấy các banner có vị trí là 'homepage'
                const response = await api.get('/api/public/banners/homepage');
                setSlides(response.data);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu slider:', error);
            }
        };
        fetchSlides();
    }, []);

    // Cấu hình cho react-slick, tương tự như data-owl-options
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false, // Giao diện của bạn không có nút điều hướng trái/phải
    };

    const serviceSettings = {
        arrows: false,
        dots: false,
        infinite: false,
        autoplay: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1306, settings: { slidesToShow: 4 } },
            { breakpoint: 992, settings: { slidesToShow: 3 } },
            { breakpoint: 576, settings: { slidesToShow: 2 } },
            { breakpoint: 0, settings: { slidesToShow: 1 } },
        ],
    };

    if (slides.length === 0) {
        return null; // Không hiển thị gì nếu không có slide
    }

    return (
        <section className="grey-section pt-4 pb-10">
            <div className="container">
                <div className="intro-wrapper row">
                    <div className="col-lg-9 mb-4">
                        <Slider {...settings}>
                            {slides.map((slide, index) => (
                                <div key={slide.id || index} className="banner banner-fixed intro-slide intro-slide1 content-middle banner-radius">
                                    <figure>
                                        <img src={`${API_URL}/${slide.image_url}`} alt={slide.title} width={1030} height={498} style={{ height: 498, backgroundColor: '#e7e9e9' }} />
                                    </figure>
                                    <div className="banner-content">
                                        <div className="slide-animate" data-animation-options="{'name': 'fadeInLeftShorter', 'duration': '1s' }">
                                            <h4 className="banner-subtitle font-weight-semi-bold text-body text-uppercase">
                                                Sale up to <span className="text-secondary ls-l">20% OFF</span> Everything
                                            </h4>
                                            <h3 className="banner-title font-secondary font-weight-bold mb-1">{slide.title}</h3>
                                            <p className="font-weight-normal text-body mb-5">{slide.description}</p>
                                            <Link to={slide.link_url || '#'} className="btn btn-dark btn-rounded">
                                                <span>shop now</span>
                                                <i className="d-icon-arrow-right" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="col-lg-3">
                        <div className="row cols-lg-1 cols-sm-2 cols-1">
                            <SubBanner />
                        </div>
                    </div>
                </div>

                <Slider className="service-slider owl-theme bg-white mt-2 mb-10" {...serviceSettings}>
                    <div className="icon-box icon-box-side icon-box1">
                        <i className="icon-box-icon d-icon-truck" />
                        <div className="icon-box-content">
                            <h4 className="icon-box-title text-capitalize lh-1 ls-s">Free Shipping &amp; Return</h4>
                            <p className="lh-1">Free shipping on orders over $99</p>
                        </div>
                    </div>
                    <div className="icon-box icon-box-side icon-box2">
                        <i className="icon-box-icon d-icon-service" />
                        <div className="icon-box-content">
                            <h4 className="icon-box-title text-capitalize lh-1 ls-s">Customer Support 24/7</h4>
                            <p className="lh-1">Instant access to perfect support</p>
                        </div>
                    </div>
                    <div className="icon-box icon-box-side icon-box3">
                        <i className="icon-box-icon d-icon-secure" />
                        <div className="icon-box-content">
                            <h4 className="icon-box-title text-capitalize lh-1 ls-s">100% Secured Payment</h4>
                            <p className="lh-1">We ensure secured payment!</p>
                        </div>
                    </div>
                    <div className="icon-box icon-box-side icon-box4">
                        <i className="icon-box-icon d-icon-money" />
                        <div className="icon-box-content">
                            <h4 className="icon-box-title text-capitalize lh-1 ls-s">Money Back Guarantee</h4>
                            <p className="lh-1">Any back within 30 days</p>
                        </div>
                    </div>
                </Slider>

                <div className="row cols-lg-6 cols-sm-3 cols-2 pt-6 pb-2">
                    {categories.slice(0, 6).map((cat) => (
                        <div className="category-wrap mb-4" key={cat.id}>
                            <div className="category category-default1 category-absolute">
                                <Link to={`/category/${cat.slug}`}>
                                    <figure>
                                        <img src={cat.image ? `${API_URL}/${cat.image}` : 'https://placehold.co/213x213/EEE/31343C'} alt={cat.name} width={213} height={213} />
                                    </figure>
                                    <div className="category-content">
                                        <h4 className="category-name">{cat.name}</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeSlider;
