// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';
import ProductCard from '../common/ProductCard';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DealsSection = () => {
    const [products, setProducts] = useState([]);
    const [timeLeft, setTimeLeft] = useState({});

    const sliderSettings = {
        arrows: true,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5, // <- số item muốn hiển thị mặc định
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1380, settings: { slidesToShow: 5 } }, // >=1400px: vẫn 5
            { breakpoint: 1200, settings: { slidesToShow: 4 } }, // <1200px: 4
            { breakpoint: 992, settings: { slidesToShow: 3 } }, // <992px: 3
            { breakpoint: 768, settings: { slidesToShow: 2 } }, // <768px: 2
            { breakpoint: 576, settings: { slidesToShow: 1 } }, // <576px: 1
        ],
    };

    // Logic cho đồng hồ đếm ngược
    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date('2025-12-31') - +new Date();
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return timeLeft;
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Logic tải sản phẩm giảm giá
    useEffect(() => {
        const fetchOnSaleProducts = async () => {
            try {
                const response = await api.get('/api/public/products/on-sale?limit=8');
                setProducts(response.data);
            } catch (error) {
                console.error('Lỗi tải sản phẩm giảm giá:', error);
            }
        };
        fetchOnSaleProducts();
    }, []);

    return (
        <>
            <section className="container pt-6 pb-2">
                <h2 className="title with-link pt-6">
                    Giá sốc hôm nay
                    <span className="countdown-container d-inline-flex align-items-center font-weight-normal ml-0 ml-md-4 mt-2 mt-md-0 mb-2 mb-md-0 ls-normal text-white flex-wrap bg-primary">
                        <label className="text-white text-capitalize mr-2">Offer Ends In:</label>
                        <span className="countdown countdown-compact">{`${String(timeLeft.days || 0).padStart(2, '0')}d:${String(timeLeft.hours || 0).padStart(2, '0')}:${String(timeLeft.minutes || 0).padStart(2, '0')}:${String(timeLeft.seconds || 0).padStart(2, '0')}`}</span>
                    </span>
                    <Link to="/products?on_sale=1" className="btn btn-dark btn-link btn-underline d-inline-block text-capitalize font-weight-semi-bold ls-normal">
                        More Products
                        <i className="d-icon-arrow-right" />
                    </Link>
                </h2>
                <Slider {...sliderSettings} className="deal-slider">
                    {products.map((product) => (
                        <div key={product.id} className="px-2">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </Slider>

                <div className="banner-grid-3cols row cols-lg-3 cols-md-2 cols-1 justify-content-center">
                    <div
                        className="banner banner-fixed content-middle banner-radius mb-4"
                        data-animation-options="{
                'name': 'fadeInLeftShorter', 'duration': '1s'
            }"
                    >
                        <figure>
                            <img src="images/demos/demo-market2/banner/1.jpg" alt="Banner" width={447} height={180} style={{ backgroundColor: '#f1f1f1' }} />
                        </figure>
                        <div className="banner-content">
                            <h4 className="banner-subtitle text-uppercase text-body font-weight-normal ls-normal">New Arrivals</h4>
                            <h3 className="banner-title font-secondary font-weight-semi-bold text-uppercase ls-m">
                                Ski Clothes Sale
                                <br />
                                <span className="font-weight-normal text-normal">Up to</span>
                                <span className="text-capitalize text-secondary">35% Off</span>
                            </h3>
                            <a href="market2-shop.html" className="btn btn-dark btn-link btn-underline">
                                Shop Now
                                <i className="d-icon-arrow-right" />
                            </a>
                        </div>
                    </div>
                    <div
                        className="banner banner-fixed content-middle banner-radius mb-4"
                        data-animation-options="{
                'name': 'fadeIn'
            }"
                    >
                        <figure>
                            <img src="images/demos/demo-market2/banner/2.jpg" alt="Banner" width={447} height={180} style={{ backgroundColor: '#2b2833' }} />
                        </figure>
                        <div className="banner-content">
                            <h4 className="banner-subtitle text-white text-uppercase font-weight-normal ls-normal">Best Seller</h4>
                            <h3 className="banner-title text-white font-secondary font-weight-semi-bold text-uppercase ls-m">
                                Trending Women's
                                <br />
                                <span className="font-weight-normal text-uppercase">Sunglasses</span>
                            </h3>
                            <a href="market2-shop.html" className="btn btn-white btn-link btn-underline">
                                Shop Now
                                <i className="d-icon-arrow-right" />
                            </a>
                        </div>
                    </div>
                    <div
                        className="banner banner-fixed content-middle banner-radius mb-4"
                        data-animation-options="{
                'name': 'fadeInRightShorter', 'duration': '1s'
            }"
                    >
                        <figure>
                            <img src="images/demos/demo-market2/banner/3.jpg" alt="Banner" width={447} height={180} style={{ backgroundColor: '#edecec' }} />
                        </figure>
                        <div className="banner-content">
                            <h4 className="banner-subtitle text-uppercase text-body font-weight-normal ls-normal">New Arrivals</h4>
                            <h3 className="banner-title font-secondary font-weight-semi-bold text-uppercase ls-m">
                                New Latest Bag
                                <br />
                                <span className="font-weight-normal text-uppercase">Collection</span>
                            </h3>
                            <a href="market2-shop.html" className="btn btn-dark btn-link btn-underline">
                                Shop Now
                                <i className="d-icon-arrow-right" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DealsSection;
