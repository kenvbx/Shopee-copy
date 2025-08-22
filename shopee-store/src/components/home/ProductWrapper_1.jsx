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
import CategoryWithChildren from '../CategoryWithChildren';

const ProductWrapper_1 = () => {
    const categoryId = 1;
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
        <>
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
            <div className="banner-grid-2cols row cols-md-2 mb-10 pb-2">
                <div
                    className="banner banner-fixed content-middle banner-radius mb-4"
                    data-animation-options="{
                          'name': 'fadeInLeftShorter', 'duration': '1s'
                      }"
                >
                    <figure>
                        <img src="images/demos/demo-market2/banner/4.jpg" alt="Banner" width={680} height={180} style={{ backgroundColor: '#dedfe0' }} />
                    </figure>
                    <div className="banner-content">
                        <h4 className="banner-subtitle font-weight-normal ls-normal text-dark">Final Reduction</h4>
                        <h3 className="banner-title font-weight-semi-bold font-secondary ls-m mb-3">Sale up to 20% Off</h3>
                        <hr className="divider border-no" />
                        <div className="banner-price-info font-weight-normal text-body">
                            Only From
                            <span className="font-weight-bold text-secondary ml-1 ls-m">$270.00</span>
                        </div>
                    </div>
                </div>
                <div
                    className="banner banner-fixed content-middle banner-radius mb-4"
                    data-animation-options="{
                          'name': 'fadeInRightShorter', 'duration': '1s'
                      }"
                >
                    <figure>
                        <img src="images/demos/demo-market2/banner/5.jpg" alt="Banner" width={680} height={180} style={{ backgroundColor: '#636363' }} />
                    </figure>
                    <div className="banner-content">
                        <h4 className="banner-subtitle font-weight-normal ls-normal">Weekend Sale</h4>
                        <h3 className="banner-title text-white font-weight-semi-bold font-secondary ls-m mb-3">Fine Smart Speaker</h3>
                        <hr className="divider border-no bg-light" />
                        <div className="banner-price-info font-weight-normal text-white">
                            Starting at
                            <span className="font-weight-bold text-secondary ml-1 ls-m">$185.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductWrapper_1;
