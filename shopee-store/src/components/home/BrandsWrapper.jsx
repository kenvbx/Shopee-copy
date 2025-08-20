// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosInstance';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BrandsWrapper = () => {
    const [brands, setBrands] = useState([]);
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await api.get('/api/public/brands/featured?limit=12');
                setBrands(res.data || []);
            } catch (err) {
                console.error('Failed to fetch brands:', err);
                setBrands([]);
            }
        };
        fetchBrands();
    }, []);

    const settings = {
        dots: false,
        infinite: brands.length > 6,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 5 } },
            { breakpoint: 992, settings: { slidesToShow: 4 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 576, settings: { slidesToShow: 2 } },
        ],
    };
    return (
        <>
            <h2 className="title">Featured Brands</h2>
            <div className="brands-wrapper bg-white pl-md-4 pr-md-4 mb-10">
                {brands.length ? (
                    <Slider {...settings} className="brand-slider">
                        {brands.map((brand) => (
                            <figure>
                                <img src={brand.logo_url ? `${API_URL}/${brand.logo_url}` : '/images/brand/01.jpg'} alt={brand.name} width={213} height={100} />
                            </figure>
                        ))}
                    </Slider>
                ) : null}
            </div>
        </>
    );
};

export default BrandsWrapper;
