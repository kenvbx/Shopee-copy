// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const RecentView = () => {
    const [viewedProducts, setViewedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchViewedProducts = async () => {
            const productIds = JSON.parse(localStorage.getItem('viewedProducts')) || [];

            if (productIds.length > 0) {
                try {
                    const response = await axiosInstance.post('/api/products/by-ids', { ids: productIds });
                    setViewedProducts(response.data);
                } catch (error) {
                    console.error('Failed to fetch viewed products', error);
                }
            }
            setLoading(false);
        };

        fetchViewedProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Or a skeleton loader
    }

    if (viewedProducts.length === 0) {
        return null; // Don't show the section if there are no viewed products
    }

    const settings = {
        dots: true,
        infinite: false, // Để false để không lặp lại từ đầu khi hết sản phẩm
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 4, // Lướt 4 sản phẩm một lần
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <h2 className="title ls-normal">Sản phẩm vừa xem</h2>
            <Slider {...settings} className="recent-view-slider mb-8">
                {viewedProducts.map((product) => (
                    <Link to={`/products/${product.slug}`} key={product.id}>
                        <figure className="product-border">
                            <img src={`${import.meta.env.VITE_API_BASE_URL}/${product.main_image}`} alt={product.name} width="153" height="172" style={{ objectFit: 'cover' }} />
                        </figure>
                    </Link>
                ))}
            </Slider>
        </>
    );
};

export default RecentView;
