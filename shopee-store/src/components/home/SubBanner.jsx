// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosInstance';

const SubBanner = () => {
    const [banners, setBanners] = useState([]);
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                // Lấy 2 banner có vị trí là 'under_slider'
                const response = await api.get('/api/public/banners/under_slider?limit=2');
                setBanners(response.data);
            } catch (error) {
                console.error('Lỗi khi tải sub-banner:', error);
            }
        };
        fetchBanners();
    }, []);

    if (banners.length === 0) {
        return null;
    }

    return (
        <>
            {banners.map((banner) => (
                <>
                    <div className="banner-wrap" key={banner.id}>
                        <div className="banner banner-fixed intro-banner banner-radius mb-4">
                            <figure>
                                <img src={`${API_URL}/${banner.image_url}`} alt="Banner" width={330} height={239} style={{ backgroundColor: '#e4e4e4' }} />
                            </figure>
                            <div className="banner-content">
                                <h4 className="banner-subtitle text-uppercase font-weight-normal text-body ls-m">New Arrivals</h4>
                                <h3 className="banner-title font-secondary text-uppercase font-weight-semi-bold ls-m">
                                    Summer
                                    <br />
                                    Sale 20% Off
                                </h3>
                                <a href={banner.link_url || '#'} className="btn btn-dark btn-link btn-underline font-weight-normal">
                                    Shop Now
                                    <i className="d-icon-arrow-right" />
                                </a>
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </>
    );
};

export default SubBanner;
