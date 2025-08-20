// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';
import FeatureCard from '../common/FeatureCard';
import ProductCard from '../common/ProductCard';
import Slider from 'react-slick';
import CategoryWithChildren from '../CategoryWithChildren';

const ProductWrapper_2 = () => {
    const categoryId = 6;
    const [products, setProducts] = useState([]);
    const [catProducts, setCatProducts] = useState([]);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await api.get('/api/public/products/featured?limit=4'); // Lấy 4 sản phẩm
                setProducts(response.data);
            } catch (error) {
                console.error('Lỗi tải sản phẩm nổi bật:', error);
            }
        };
        fetchFeaturedProducts();
    }, []);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const catRes = await api.get('/api/public/categories/hierarchy');
                const target = (catRes.data || []).find((c) => String(c.id) === String(categoryId));
                if (!target) {
                    setCatProducts([]);
                    return;
                }

                const prodRes = await api.get(`/api/public/products?category=${encodeURIComponent(target.slug)}&limit=12`);
                // prodRes.data = { data: [...], pagination: {...} }
                setCatProducts(Array.isArray(prodRes.data?.data) ? prodRes.data.data : []);
                // Nếu muốn dùng phân trang sau này:
                // setCatPagination(prodRes.data?.pagination ?? null);
            } catch (error) {
                console.error('Lỗi tải sản phẩm theo danh mục:', error);
                setCatProducts([]);
            }
        };
        fetchCategoryProducts();
    }, [categoryId]);

    if (products.length === 0) {
        return null;
    }

    return (
        <div className="product-wrapper row mb-10 pb-2">
            <CategoryWithChildren categoryId={categoryId} />
            <div className="col-xl-5col4 col-lg-9 col-md-8 mb-4">
                <Slider
                    className=""
                    dots={false}
                    arrows={true}
                    infinite={catProducts.length > 4}
                    speed={500}
                    slidesToShow={4}
                    slidesToScroll={1}
                    responsive={[
                        { breakpoint: 1200, settings: { slidesToShow: 4 } },
                        { breakpoint: 992, settings: { slidesToShow: 3 } },
                        { breakpoint: 768, settings: { slidesToShow: 2 } },
                        { breakpoint: 576, settings: { slidesToShow: 2 } },
                    ]}
                >
                    {catProducts.map((p) => (
                        <div className="product-wrap h-100 mb-0" key={p.id}>
                            <ProductCard product={p} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ProductWrapper_2;
