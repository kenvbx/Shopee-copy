// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MiniCart = () => {
    const { cart, itemCount, removeFromCart, showMiniCart, closeMiniCart } = useCart();
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const subTotal =
        cart?.CartItems?.reduce((sum, item) => {
            const price = item.Product?.sale_price || item.Product?.price || 0;
            return sum + item.quantity * price;
        }, 0) || 0;

    return (
        <div className={`dropdown cart-dropdown type2 off-canvas mr-0 mr-lg-2 ${showMiniCart ? 'opened' : ''}`}>
            <div className="canvas-overlay" onClick={closeMiniCart}></div>

            <div className="dropdown-box">
                <div className="canvas-header">
                    <h4 className="canvas-title">Giỏ hàng</h4>
                    <a href="#" className="btn btn-dark btn-link btn-icon-right btn-close">
                        Đóng
                        <i className="d-icon-arrow-right" />
                        <span className="sr-only">Cart</span>
                    </a>
                </div>

                <div className="products scrollable">
                    {cart?.CartItems?.map((item) => (
                        <div className="product product-cart" key={item.id || item.product_id}>
                            <figure className="product-media">
                                <Link to={`/product/${item.Product?.slug}`}>
                                    <img src={item.Product?.main_image ? `${API_URL}/${item.Product.main_image}` : 'images/cart/product-1.jpg'} alt={item.Product?.name} width="80" height="88" />
                                </Link>
                                <button className="btn btn-link btn-close" onClick={() => removeFromCart(item)}>
                                    <i className="fas fa-times"></i>
                                    <span className="sr-only">Đóng</span>
                                </button>
                            </figure>
                            <div className="product-detail">
                                <Link to={`/product/${item.Product?.slug}`} className="product-name">
                                    {item.Product?.name}
                                </Link>
                                <div className="price-box">
                                    <span className="product-quantity">{item.quantity}</span>
                                    <span className="product-price">{new Intl.NumberFormat('vi-VN').format(item.Product?.price || 0)} đ</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* End of Products  */}
                <div className="cart-total">
                    <label>Subtotal:</label>
                    <span className="price">{new Intl.NumberFormat('vi-VN').format(subTotal)} đ</span>
                </div>
                {/* End of Cart Total */}
                <div className="cart-action">
                    <Link to="/cart" className="btn btn-dark btn-link" onClick={closeMiniCart}>
                        Xem giỏ hàng
                    </Link>
                    <Link to="/checkout" className="btn btn-dark" onClick={closeMiniCart}>
                        <span>Thanh toán</span>
                    </Link>
                </div>
                {/* End of Cart Action */}
            </div>
            {/* End Dropdown Box */}
        </div>
    );
};

export default MiniCart;
