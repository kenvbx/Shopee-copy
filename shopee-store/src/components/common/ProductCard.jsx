// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useQuickView } from '../../context/QuickViewContext';
import api from '../../api/axiosInstance';

function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const { openQuickView } = useQuickView();

    const placeholderImg = 'https://placehold.co/204x204/EEE/31343C';
    const productLink = product.slug ? `/product/${product.slug}` : '#';

    const isWished = wishlistItems.includes(product.id);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product, 1);
    };

    const handleQuickViewClick = (e) => {
        e.preventDefault(); // Ngăn chuyển trang
        openQuickView(product.slug);
    };

    const handleWishlistClick = (e) => {
        e.preventDefault();
        // Nếu đã yêu thích thì xóa, nếu chưa thì thêm
        if (isWished) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product.id);
        }
    };

    // --- BƯỚC 1: LẤY DỮ LIỆU RATING TRỰC TIẾP TỪ PROP 'product' ---
    const avgRating = parseFloat(product.rating_avg) || 0;
    const ratingCount = parseInt(product.rating_count, 10) || 0;
    const ratingWidth = `${(avgRating / 5) * 100}%`;

    return (
        <div className="product product-border text-center">
            <figure className="product-media">
                <Link to={`/product/${product.slug}`}>
                    <img src={product.main_image ? `${API_URL}/${product.main_image}` : '/images/product/01.jpg'} alt={product.name} width={260} height={293} />
                </Link>

                <div className="product-label-group">
                    <label className="product-label label-new">new</label>
                    {product.sale_price && <label className="product-label label-sale">-{Math.round(((product.price - product.sale_price) / product.price) * 100)}%</label>}
                </div>

                <div className="product-action-vertical">
                    <a href="#" className="btn-product-icon btn-cart" data-toggle="modal" data-target="#addCartModal" onClick={handleAddToCart} title="Thêm vào giỏ hàng">
                        <i className="d-icon-bag" />
                    </a>
                    <a href="#" className={`btn-product-icon btn-wishlist ${isWished ? 'active' : ''}`} title="Thêm vào yêu thích" onClick={handleWishlistClick}>
                        <i className="d-icon-heart" />
                    </a>
                    <a href="#" className="btn-product-icon btn-quickview" title="Xem nhanh" onClick={handleQuickViewClick}>
                        <i className="d-icon-search" />
                    </a>
                    <a href="#" className="btn-product-icon btn-compare" title="Compare">
                        <i className="d-icon-compare" />
                    </a>
                </div>
            </figure>
            <div className="product-details">
                <h3 className="product-name">
                    <Link to={`/product/${product.slug}`}>{product.name}</Link>
                </h3>
                <div class="product-price">
                    <ins class="new-price">{new Intl.NumberFormat('vi-VN').format(product.sale_price || product.price)} đ</ins>
                    <del class="old-price">{product.sale_price && <del>{new Intl.NumberFormat('vi-VN').format(product.price)} đ</del>}</del>
                </div>

                {ratingCount > 0 ? (
                    <div className="ratings-container">
                        <div className="ratings-full">
                            <span className="ratings" style={{ width: ratingWidth }} />
                            <span className="tooltiptext tooltip-top">{avgRating.toFixed(2)}</span>
                        </div>
                        <Link to={`/products/${product.slug}#product-tab-reviews`} className="rating-reviews">
                            ( {ratingCount} đánh giá )
                        </Link>
                    </div>
                ) : (
                    // Hiển thị một khoảng trống giữ chỗ để layout không bị vỡ
                    <div className="ratings-container" style={{ height: '1.2em' }}></div>
                )}
            </div>
        </div>
    );
}

export default ProductCard;
