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
import api from '../../api/axiosInstance';

function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const placeholderImg = 'https://placehold.co/204x204/EEE/31343C';
    const productLink = product.slug ? `/product/${product.slug}` : '#';

    const isWished = wishlistItems.includes(product.id);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product, 1);
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

    // --- Derived rating/count fallbacks (support multiple API shapes) ---
    const initialAverageRating = product?.average_rating ?? product?.avg_rating ?? product?.rating ?? (Array.isArray(product?.reviews) && product.reviews.length ? product.reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0) / product.reviews.length : 0);
    const initialReviewCount = product?.review_count ?? product?.reviews_count ?? product?.reviewCount ?? (Array.isArray(product?.reviews) ? product.reviews.length : undefined);

    const [averageRating, setAverageRating] = useState(Number(initialAverageRating) || 0);
    const [reviewCount, setReviewCount] = useState(typeof initialReviewCount === 'number' ? initialReviewCount : undefined);

    // If list endpoints don't include review_count, lazily fetch reviews to compute count
    useEffect(() => {
        // Only fetch if reviewCount is undefined (meaning API didn't provide it)
        if (reviewCount === undefined && product?.id) {
            let isMounted = true;
            api.get(`/api/public/reviews/${product.id}`)
                .then((res) => {
                    if (!isMounted) return;
                    const list = Array.isArray(res.data) ? res.data : [];
                    setReviewCount(list.length);
                    // derive avg rating if backend didn't provide it
                    if (!product?.average_rating && !product?.avg_rating && !product?.rating) {
                        const avg = list.length ? list.reduce((s, r) => s + (Number(r.rating) || 0), 0) / list.length : 0;
                        setAverageRating(avg);
                    }
                })
                .catch(() => {
                    // if request fails, at least show 0 instead of hiding
                    if (isMounted) setReviewCount(0);
                });
            return () => {
                isMounted = false;
            };
        }
    }, [product?.id, reviewCount]);

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
                    <a href="#" className="btn-product-icon btn-quickview" title="Quick View">
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

                <div className="ratings-container">
                    <div className="ratings-full">
                        <span className="ratings" style={{ width: `${Math.max(0, Math.min(5, Number(averageRating) || 0)) * 20}%` }} />
                        <span className="tooltiptext tooltip-top">{(Number(averageRating) || 0).toFixed(1)} / 5</span>
                    </div>
                    <a href={`/product/${product.slug}#product-tab-reviews`} className="rating-reviews">
                        ( {typeof reviewCount === 'number' ? reviewCount : 0} đánh giá )
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
