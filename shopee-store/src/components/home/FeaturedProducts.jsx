// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import api from '../../api/axiosInstance';
import ProductCard from '../ProductCard';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await api.get('/api/public/products/featured?limit=8');
                setProducts(response.data);
            } catch (error) {
                console.error('Lỗi tải sản phẩm nổi bật:', error);
            }
        };
        fetchFeaturedProducts();
    }, []);

    // Cấu hình cho slider
    const settings = {
        dots: false,
        infinite: products.length > 4,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 992, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 576, settings: { slidesToShow: 1 } },
        ],
    };

    if (products.length === 0) {
        return null; // Không hiển thị nếu không có sản phẩm nào
    }

    return (
        <>
            <h2 className="title title-line title-underline with-link">
                Sản phẩm nổi bật
                <a href="#" className="font-weight-semi-bold">
                    Xem thêm
                    <i className="d-icon-arrow-right" />
                </a>
            </h2>
            <div className="row gutter-xs">
                {products.map((product) => (
                    <div key={product.id} className="col-md-3 col-6 mb-4">
                        <ProductCard product={product} />
                        {/* <div className="product text-center">
                            <figure className="product-media">
                                <a href="demo3-product.html">
                                    <img src="images/demos/demo3/products/1.jpg" alt="product" width={280} height={315} style={{ backgroundColor: '#f5f5f5' }} />
                                </a>
                                <div className="product-label-group">
                                    <label className="product-label label-new">new</label>
                                </div>
                                <div className="product-action-vertical">
                                    <a href="#" className="btn-product-icon btn-cart" data-toggle="modal" data-target="#addCartModal" title="Add to cart">
                                        <i className="d-icon-bag" />
                                    </a>
                                    <a href="#" className="btn-product-icon btn-wishlist" title="Add to wishlist">
                                        <i className="d-icon-heart" />
                                    </a>
                                </div>
                                <div className="product-action">
                                    <a href="#" className="btn-product btn-quickview" title="Quick View">
                                        Quick View
                                    </a>
                                </div>
                            </figure>
                            <div className="product-details">
                                <div className="product-cat">
                                    <a href="demo3-shop.html">Women’s</a>
                                </div>
                                <h3 className="product-name">
                                    <a href="demo3-product.html">Comfortable Brown Scarf</a>
                                </h3>
                                <div className="product-price">
                                    <span className="price">$28.74</span>
                                </div>
                                <div className="ratings-container">
                                    <div className="ratings-full">
                                        <span className="ratings" style={{ width: '60%' }} />
                                        <span className="tooltiptext tooltip-top" />
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                ))}
            </div>
        </>
    );
};

export default FeaturedProducts;
