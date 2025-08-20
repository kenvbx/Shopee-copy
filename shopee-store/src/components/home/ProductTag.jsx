// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect, useMemo } from 'react';
import Slider from 'react-slick';
import api from '../../api/axiosInstance';
import ProductCard from '../common/ProductCard';

/**
 * Hiển thị sản phẩm theo TAG (tab).
 * Ưu tiên endpoint:  /api/public/products/by-tags?tags=<slug>&limit=<n>
 * Fallback (nếu backend chưa có): /api/public/products?tags=<slug>&limit=<n>
 * Tab "View All" sẽ gọi /api/public/products?limit=<n>
 */
const DEFAULT_TABS = [
    { id: 'new', label: 'New Arrivals', tag: 'new' },
    { id: 'best', label: 'Best Seller', tag: 'best_seller' },
    { id: 'popular', label: 'Most Popular', tag: 'popular' },
    { id: 'all', label: 'View All', tag: null },
];

const ProductTag = ({ tabs = DEFAULT_TABS, limit = 20 }) => {
    const [activeId, setActiveId] = useState(tabs[0]?.id || 'new');
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    const sliderSettings = useMemo(
        () => ({
            dots: true,
            arrows: false,
            infinite: items.length > 5,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            responsive: [
                { breakpoint: 1200, settings: { slidesToShow: 4 } },
                { breakpoint: 992, settings: { slidesToShow: 3 } },
                { breakpoint: 768, settings: { slidesToShow: 2 } },
                { breakpoint: 576, settings: { slidesToShow: 2 } },
            ],
        }),
        [items.length]
    );

    useEffect(() => {
        const fetchByTag = async (tag) => {
            setLoading(true);
            try {
                let res;
                if (tag) {
                    // Thử /by-tags trước
                    try {
                        res = await api.get('/api/public/products/by-tags', { params: { tags: tag, limit } });
                    } catch {
                        // Fallback sang /products?tags=
                        res = await api.get('/api/public/products', { params: { tags: tag, limit } });
                    }
                } else {
                    // View All
                    res = await api.get('/api/public/products', { params: { limit } });
                }

                // Một số API trả {data, pagination}, số khác trả mảng
                const payload = Array.isArray(res.data) ? res.data : res.data?.data || [];
                setItems(payload);
            } catch (err) {
                console.error('Lỗi tải sản phẩm theo tag:', err);
                setItems([]);
            } finally {
                setLoading(false);
            }
        };

        const current = tabs.find((t) => t.id === activeId);
        fetchByTag(current?.tag || null);
    }, [activeId, tabs, limit]);

    return (
        <>
            <div className="title-wrapper d-flex justify-content-between flex-wrap mb-3 pt-6">
                <h2 className="title d-block text-left mr-4">
                    Selected Products
                    <br />
                    <span className="d-block font-weight-normal text-body text-normal ls-normal">All our new arrivals in a exclusive brand selection</span>
                </h2>
                <div className="tab tab-nav-boxed">
                    <ul className="nav nav-tabs border-no">
                        {tabs.map((t) => (
                            <li className="nav-item" key={t.id}>
                                <a
                                    href={`#tab-${t.id}`}
                                    className={`nav-link ${activeId === t.id ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveId(t.id);
                                    }}
                                >
                                    {t.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="tab-content mb-10 pb-6">
                <div className="tab-pane active" id={`tab-${activeId}`}>
                    {loading ? (
                        <p>Đang tải sản phẩm...</p>
                    ) : items.length === 0 ? (
                        <p>Chưa có sản phẩm phù hợp.</p>
                    ) : (
                        <Slider {...sliderSettings}>
                            {items.map((product) => (
                                <div key={product.id} className="px-2">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </Slider>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductTag;
