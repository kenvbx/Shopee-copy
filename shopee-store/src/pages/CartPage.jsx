// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
    const { cart, itemCount, removeFromCart, updateQuantity } = useCart();
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    // Tính toán các giá trị cho sidebar
    const subTotal =
        cart?.CartItems?.reduce((sum, item) => {
            return sum + item.quantity * (item.Product?.price || 0);
        }, 0) || 0;
    const deliveryFee = 30000; // Giả sử phí vận chuyển cố định
    const discount = 0; // Sẽ tích hợp sau
    const total = subTotal + deliveryFee - discount;

    if (!itemCount || itemCount === 0) {
        return (
            <section className="cart_view pt_120 xs_pt_80 pb_120 xs_pb_80">
                <div className="container text-center">
                    <h2>Giỏ hàng của bạn đang trống.</h2>
                    <Link to="/products" className="common_btn mt-4">
                        Tiếp tục mua sắm <span></span>
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <main className="main cart">
            <div className="page-content pt-7 pb-10">
                <div className="step-by pr-4 pl-4">
                    <h3 className="title title-simple title-step active">
                        <a href="/cart">1. Giỏ hàng</a>
                    </h3>
                    <h3 className="title title-simple title-step">
                        <a href="/checkout">2. Thanh toán</a>
                    </h3>
                    <h3 className="title title-simple title-step">
                        <a href="/order-success">3. Hoàn thành</a>
                    </h3>
                </div>
                <div className="container mt-7 mb-2">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 pr-lg-4">
                            <table className="shop-table cart-table">
                                <thead>
                                    <tr>
                                        <th>
                                            <span>Sản phẩm</span>
                                        </th>
                                        <th />
                                        <th>
                                            <span>Giá</span>
                                        </th>
                                        <th>
                                            <span>Số lượng</span>
                                        </th>
                                        <th>Tạm tính</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart?.CartItems?.map((item) => {
                                        const price = item.Product?.sale_price || item.Product?.price || 0;
                                        // Tạo link cho từng sản phẩm bên trong vòng lặp
                                        const productLink = item.Product?.slug ? `/product/${item.Product.slug}` : '#';
                                        return (
                                            <tr key={item.id || item.product_id}>
                                                <td className="product-thumbnail">
                                                    <figure>
                                                        <Link to={productLink}>
                                                            <img src={item.Product?.main_image ? `${API_URL}/${item.Product.main_image}` : 'https://via.placeholder.com/80'} width={100} height={100} alt={item.Product?.name} />
                                                        </Link>
                                                    </figure>
                                                </td>
                                                <td className="product-name">
                                                    <div className="product-name-section">
                                                        <Link to={productLink}>{item.Product?.name}</Link>
                                                    </div>
                                                </td>

                                                <td className="product-subtotal">
                                                    <span className="amount">
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }).format(price)}
                                                    </span>
                                                </td>

                                                <td className="product-quantity">
                                                    <div className="input-group">
                                                        <button onClick={() => updateQuantity(item, item.quantity - 1)} className="quantity-minus d-icon-minus" />
                                                        <input className="quantity form-control" type="number" value={item.quantity} readOnly min={1} max={1000000} />
                                                        <button onClick={() => updateQuantity(item, item.quantity + 1)} className="quantity-plus d-icon-plus" />
                                                    </div>
                                                </td>

                                                <td className="product-price">
                                                    <span className="amount">
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }).format(item.quantity * price)}
                                                    </span>
                                                </td>
                                                <td className="product-close">
                                                    <a
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            removeFromCart(item);
                                                        }}
                                                        href="#"
                                                        className="product-remove"
                                                        title="Remove this product"
                                                    >
                                                        <i className="fas fa-times" />
                                                    </a>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className="cart-actions mb-6 pt-4">
                                <Link to="/products" className="btn btn-dark btn-md btn-rounded btn-icon-left mr-4 mb-4">
                                    <i className="d-icon-arrow-left" />
                                    Tiếp tục mua sắm
                                </Link>
                                <button type="submit" className="btn btn-outline btn-dark btn-md btn-rounded btn-disabled">
                                    Cập nhật giỏ hàng
                                </button>
                            </div>
                            <div className="cart-coupon-box mb-8">
                                <h4 className="title coupon-title text-uppercase ls-m">Mã giảm giá</h4>
                                <input type="text" name="coupon_code" className="input-text form-control text-grey ls-m mb-4" id="coupon_code" defaultValue="" placeholder="Enter coupon code here..." />
                                <button type="submit" className="btn btn-md btn-dark btn-rounded btn-outline">
                                    Áp dụng
                                </button>
                            </div>
                        </div>
                        <aside className="col-lg-4 sticky-sidebar-wrapper">
                            <div className="sticky-sidebar" data-sticky-options="{'bottom': 20}">
                                <div className="summary mb-4">
                                    <h3 className="summary-title text-left">Tổng Giỏ Hàng ({itemCount})</h3>
                                    <table className="shipping">
                                        <tbody>
                                            <tr className="summary-subtotal">
                                                <td>
                                                    <h4 className="summary-subtitle">Tạm tính</h4>
                                                </td>
                                                <td>
                                                    <p className="summary-subtotal-price">
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }).format(subTotal)}
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr className="summary-subtotal">
                                                <td>
                                                    <h4 className="summary-subtitle">Phí vận chuyển</h4>
                                                </td>
                                                <td>
                                                    <p className="summary-subtotal-price">
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }).format(deliveryFee)}
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr className="summary-subtotal">
                                                <td>
                                                    <h4 className="summary-subtitle">Giảm giá</h4>
                                                </td>
                                                <td>
                                                    <p className="summary-subtotal-price">
                                                        <span>
                                                            {new Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }).format(discount)}
                                                        </span>
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table className="total">
                                        <tbody>
                                            <tr className="summary-subtotal">
                                                <td>
                                                    <h4 className="summary-subtitle">Tổng cộng</h4>
                                                </td>
                                                <td>
                                                    <p className="summary-total-price ls-s">
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }).format(total)}
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Link to="/checkout" className="btn btn-dark btn-rounded btn-checkout">
                                        Thanh toán
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CartPage;
