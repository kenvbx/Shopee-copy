// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const FeatureCard = ({ product }) => {
    const { addToCart } = useCart();
    const { addToWishlist, wishlistItems } = useWishlist();
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const isWished = wishlistItems.includes(product.id);

    const handleAddToCart = () => addToCart(product, 1);
    const handleWishlistClick = () => {
        // Logic thêm/xóa khỏi wishlist có thể được thêm vào đây
        addToWishlist(product.id);
    };

    return (
        <div className="feature-card">
            <div className="feature-media">
                <div className="feature-label">
                    <label className="label-text feat">feature</label>
                </div>
                <button className={`feature-wish wish ${isWished ? 'active' : ''}`} onClick={handleWishlistClick}>
                    <i className="fas fa-heart"></i>
                </button>
                <Link className="feature-image" to={`/product/${product.slug}`}>
                    <img src={product.main_image ? `${API_URL}/${product.main_image}` : '/images/product/09.jpg'} alt={product.name} />
                </Link>
            </div>
            <div className="feature-content">
                <h6 className="feature-name">
                    <Link to={`/product/${product.slug}`}>{product.name}</Link>
                </h6>
                <h6 className="feature-price">
                    {product.sale_price && <del>{new Intl.NumberFormat('vi-VN').format(product.price)} đ</del>}
                    <span>{new Intl.NumberFormat('vi-VN').format(product.sale_price || product.price)} đ</span>
                </h6>
                <p className="feature-desc">{product.short_description}</p>
                <button className="product-add" title="Add to Cart" onClick={handleAddToCart}>
                    <i className="fas fa-shopping-basket"></i>
                    <span>Thêm giỏ hàng</span>
                </button>
            </div>
        </div>
    );
};

export default FeatureCard;
