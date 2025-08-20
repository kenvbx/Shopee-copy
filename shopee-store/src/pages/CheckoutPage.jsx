// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CheckoutPage() {
    const { cart, itemCount, clearCart, fetchCart } = useCart();
    const { token } = useAuth(); // Kiểm tra xem user đã đăng nhập chưa
    const navigate = useNavigate();

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [billingDetails, setBillingDetails] = useState({
        receiver_name: '',
        receiver_phone: '',
        city: '',
        district: '',
        ward: '',
        receiver_address: '', // Địa chỉ cụ thể (số nhà, tên đường)
        note: '',
    });

    const subTotal = cart?.CartItems?.reduce((sum, item) => sum + item.quantity * (item.Product?.price || 0), 0) || 0;
    const total = subTotal + 30000; // Giả sử phí ship 30k

    // Tải danh sách tỉnh/thành phố khi component được mount
    useEffect(() => {
        axios
            .get('https://provinces.open-api.vn/api/?depth=1')
            .then((res) => setProvinces(res.data))
            .catch((err) => console.error('Lỗi tải danh sách tỉnh thành:', err));
    }, []);

    // Tải danh sách quận/huyện khi tỉnh/thành phố thay đổi
    useEffect(() => {
        if (billingDetails.city) {
            const selectedProvince = provinces.find((p) => p.name === billingDetails.city);
            if (selectedProvince) {
                axios
                    .get(`https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`)
                    .then((res) => setDistricts(res.data.districts))
                    .catch((err) => console.error('Lỗi tải danh sách quận huyện:', err));
            }
        }
        setBillingDetails((prev) => ({ ...prev, district: '', ward: '' })); // Reset khi đổi tỉnh
    }, [billingDetails.city]);

    // Tải danh sách phường/xã khi quận/huyện thay đổi
    useEffect(() => {
        if (billingDetails.district) {
            const selectedDistrict = districts.find((d) => d.name === billingDetails.district);
            if (selectedDistrict) {
                axios
                    .get(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`)
                    .then((res) => setWards(res.data.wards))
                    .catch((err) => console.error('Lỗi tải danh sách phường xã:', err));
            }
        }
        setBillingDetails((prev) => ({ ...prev, ward: '' })); // Reset khi đổi huyện
    }, [billingDetails.district]);

    const handleChange = (e) => {
        setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...billingDetails,
            items: cart?.CartItems, // <-- Thêm dòng này để gửi kèm giỏ hàng
        };
        try {
            const response = await api.post('/api/orders/checkout', payload);
            toast.success('Đặt hàng thành công!');

            clearCart(); // Gọi hàm dọn dẹp giỏ hàng

            // Chuyển hướng
            navigate('/order-success', { state: { orderId: response.data.orderId } });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đặt hàng thất bại.');
        }
    };

    return (
        <main className="main checkout">
            <div className="page-content pt-7 pb-10 mb-10">
                <div className="step-by pr-4 pl-4">
                    <h3 className="title title-simple title-step">
                        <a href="/cart">1. Giỏ hàng</a>
                    </h3>
                    <h3 className="title title-simple title-step active">
                        <a href="/checkout">2. Thanh toán</a>
                    </h3>
                    <h3 className="title title-simple title-step">
                        <a href="/order-success">3. Hoàn thành</a>
                    </h3>
                </div>
                <div className="container mt-7">
                    <div className="card accordion">
                        <div className="alert alert-light alert-primary alert-icon mb-4 card-header">
                            <i className="fas fa-exclamation-circle" />
                            <span className="text-body">Returning customer?</span>
                            <a href="#alert-body1" className="text-primary collapse">
                                Click here to login
                            </a>
                        </div>
                        <div className="alert-body collapsed" id="alert-body1">
                            <p>If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing section.</p>
                            <div className="row cols-md-2">
                                <form className="mb-4 mb-md-0">
                                    <label htmlFor="username">Username Or Email *</label>
                                    <input type="text" className="input-text form-control mb-0" name="username" id="username" autoComplete="username" />
                                </form>
                                <form className="mb-4 mb-md-0">
                                    <label htmlFor="password">Password *</label>
                                    <input className="input-text form-control mb-0" type="password" name="password" id="password" autoComplete="current-password" />
                                </form>
                            </div>
                            <div className="checkbox d-flex align-items-center justify-content-between">
                                <div className="form-checkbox pt-0 mb-0">
                                    <input type="checkbox" className="custom-checkbox" id="signin-remember" name="signin-remember" />
                                    <label className="form-control-label" htmlFor="signin-remember">
                                        Remember Me
                                    </label>
                                </div>
                                <a href="#" className="lost-link">
                                    Lost your password?
                                </a>
                            </div>
                            <div className="link-group">
                                <a href="#" className="btn btn-dark btn-rounded mb-4">
                                    Login
                                </a>
                                <span className="d-inline-block text-body font-weight-semi-bold">or Login With</span>
                                <div className="social-links mb-4">
                                    <a href="#" className="social-link social-google fab fa-google" />
                                    <a href="#" className="social-link social-facebook fab fa-facebook-f" />
                                    <a href="#" className="social-link social-twitter fab fa-twitter" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card accordion">
                        <div className="alert alert-light alert-primary alert-icon mb-4 card-header">
                            <i className="fas fa-exclamation-circle" />
                            <span className="text-body">Have a coupon?</span>
                            <a href="#alert-body2" className="text-primary">
                                Click here to enter your code
                            </a>
                        </div>
                        <div className="alert-body mb-4 collapsed" id="alert-body2">
                            <p>If you have a coupon code, please apply it below.</p>
                            <div className="check-coupon-box d-flex">
                                <input type="text" name="coupon_code" className="input-text form-control text-grey ls-m mr-4" id="coupon_code" defaultValue="" placeholder="Coupon code" />
                                <button type="submit" className="btn btn-dark btn-rounded btn-outline">
                                    Apply Coupon
                                </button>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="form">
                        <div className="row">
                            <div className="col-lg-7 mb-6 mb-lg-0 pr-lg-4">
                                <h3 className="title title-simple text-left text-uppercase">Thông tin giao hàng</h3>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <label>Họ và tên</label>
                                        <input type="text" className="form-control" name="receiver_name" value={billingDetails.receiver_name} onChange={handleChange} required />
                                    </div>
                                    <div className="col-xs-6">
                                        <label>Số điện thoại</label>
                                        <input type="text" className="form-control" name="receiver_phone" value={billingDetails.receiver_phone} onChange={handleChange} required />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-4">
                                        <label>Tỉnh/Thành phố</label>
                                        <select className="form-control" name="city" value={billingDetails.city} onChange={handleChange} required>
                                            <option value="">Chọn Tỉnh/Thành</option>
                                            {provinces.map((p) => (
                                                <option key={p.code} value={p.name}>
                                                    {p.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-xs-4">
                                        <label>Quận/Huyện</label>
                                        <select className="form-control" name="district" value={billingDetails.district} onChange={handleChange} required disabled={!billingDetails.city}>
                                            <option value="">Chọn Quận/Huyện</option>
                                            {districts.map((d) => (
                                                <option key={d.code} value={d.name}>
                                                    {d.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-xs-4">
                                        <label>Xã/Phường</label>
                                        <select className="form-control" name="ward" value={billingDetails.ward} onChange={handleChange} required disabled={!billingDetails.district}>
                                            <option value="">Chọn Phường/Xã</option>
                                            {wards.map((w) => (
                                                <option key={w.code} value={w.name}>
                                                    {w.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <label>Địa chỉ (Số nhà, tên đường) *</label>
                                <input type="text" className="form-control" name="receiver_address" value={billingDetails.receiver_address} onChange={handleChange} required />

                                {/* <div className="form-checkbox mb-0">
                                        <input type="checkbox" className="custom-checkbox" id="create-account" name="create-account" />
                                        <label className="form-control-label ls-s" htmlFor="create-account">
                                            Create an account?
                                        </label>
                                    </div>
                                    <div className="form-checkbox mb-6">
                                        <input type="checkbox" className="custom-checkbox" id="different-address" name="different-address" />
                                        <label className="form-control-label ls-s" htmlFor="different-address">
                                            Ship to a different address?
                                        </label>
                                    </div> */}
                                <label></label>

                                <h2 className="title title-simple text-uppercase text-left">Thông tin bổ sung</h2>
                                <label>Ghi chú đơn hàng</label>
                                <textarea className="form-control pb-2 pt-2 mb-0" rows="5" name="note" value={billingDetails.note} onChange={handleChange}></textarea>
                            </div>
                            <aside className="col-lg-5 sticky-sidebar-wrapper">
                                <div className="sticky-sidebar mt-1" data-sticky-options="{'bottom': 50}">
                                    <div className="summary pt-5">
                                        <h3 className="title title-simple text-left text-uppercase">Tóm tắt đơn hàng ({itemCount})</h3>
                                        <table className="order-table">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="product-name">
                                                        Fashionable Overnight Bag <span className="product-quantity">×&nbsp;1</span>
                                                    </td>
                                                    <td className="product-total text-body">$110.00</td>
                                                </tr>
                                                <tr>
                                                    <td className="product-name">
                                                        Mackintosh Poket backpack <span className="product-quantity">×&nbsp;1</span>
                                                    </td>
                                                    <td className="product-total text-body">$180.00</td>
                                                </tr>
                                                <tr className="summary-subtotal">
                                                    <td>
                                                        <h4 className="summary-subtitle">Tạm tính</h4>
                                                    </td>
                                                    <td className="summary-subtotal-price pb-0 pt-0">{new Intl.NumberFormat('vi-VN').format(subTotal)} đ</td>
                                                </tr>
                                                <tr className="sumnary-shipping shipping-row-last">
                                                    <td colSpan={2}>
                                                        <h4 className="summary-subtitle">Calculate Shipping</h4>
                                                        <ul>
                                                            <li>
                                                                <div className="custom-radio">
                                                                    <input type="radio" id="flat_rate" name="shipping" className="custom-control-input" defaultChecked="" />
                                                                    <label className="custom-control-label" htmlFor="flat_rate">
                                                                        Flat rate
                                                                    </label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="custom-radio">
                                                                    <input type="radio" id="free-shipping" name="shipping" className="custom-control-input" />
                                                                    <label className="custom-control-label" htmlFor="free-shipping">
                                                                        Free shipping
                                                                    </label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="custom-radio">
                                                                    <input type="radio" id="local_pickup" name="shipping" className="custom-control-input" />
                                                                    <label className="custom-control-label" htmlFor="local_pickup">
                                                                        Local pickup
                                                                    </label>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr className="summary-total">
                                                    <td className="pb-0">
                                                        <h4 className="summary-subtitle">Tổng cộng</h4>
                                                    </td>
                                                    <td className=" pt-0 pb-0">
                                                        <p className="summary-total-price ls-s text-primary">{new Intl.NumberFormat('vi-VN').format(total)} đ</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="payment accordion radio-type">
                                            <h4 className="summary-subtitle ls-m pb-3">Payment Methods</h4>
                                            <div className="card">
                                                <div className="card-header">
                                                    <a href="#collapse1" className="collapse text-body text-normal ls-m">
                                                        Check payments
                                                    </a>
                                                </div>
                                                <div id="collapse1" className="expanded" style={{ display: 'block' }}>
                                                    <div className="card-body ls-m">Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header">
                                                    <a href="#collapse2" className="expand text-body text-normal ls-m">
                                                        Cash on delivery
                                                    </a>
                                                </div>
                                                <div id="collapse2" className="collapsed">
                                                    <div className="card-body ls-m">Pay with cash upon delivery.</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-checkbox mt-4 mb-5">
                                            <input type="checkbox" className="custom-checkbox" id="terms-condition" name="terms-condition" />
                                            <label className="form-control-label" htmlFor="terms-condition">
                                                I have read and agree to the website <a href="#">terms and conditions </a>*
                                            </label>
                                        </div>
                                        <button type="submit" className="btn btn-dark btn-rounded btn-order">
                                            Đặt Hàng
                                        </button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default CheckoutPage;
