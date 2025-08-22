// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import MiniCart from './components/MiniCart';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SearchPage from './pages/SearchPage';
import AccountLayout from './layouts/AccountLayout';
import ProfilePage from './pages/ProfilePage';
import MyOrdersPage from './pages/MyOrdersPage';
import InvoicePage from './pages/InvoicePage';
import CouponsPage from './pages/CouponsPage';
import WishlistPage from './pages/WishlistPage';
import MyReviewsPage from './pages/MyReviewsPage';
import MyNotifiesPage from './pages/MyNotifiesPage';
import SecurityPage from './pages/SecurityPage';
import MessagePage from './pages/MessagePage';
import RefundPage from './pages/RefundPage';
import ComplainPage from './pages/ComplainPage';
import ConsultPage from './pages/ConsultPage';
import InformPage from './pages/InformPage';
import MallconsultPage from './pages/MallconsultPage';
import FeedbackPage from './pages/FeedbackPage';

function App() {
    return (
        <>
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <Routes>
                {/* Tất cả các route bên trong đây sẽ có chung Header và Footer */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/account" element={<AccountLayout />}>
                        <Route index element={<Navigate to="profile" replace />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="orders" element={<MyOrdersPage />} />
                        <Route path="invoice" element={<InvoicePage />} />
                        <Route path="coupons" element={<CouponsPage />} />
                        <Route path="wishlist" element={<WishlistPage />} />
                        <Route path="reviews" element={<MyReviewsPage />} />
                        <Route path="notifies" element={<MyNotifiesPage />} />
                        <Route path="security" element={<SecurityPage />} />
                        <Route path="message" element={<MessagePage />} />
                        <Route path="refund" element={<RefundPage />} />
                        <Route path="complain" element={<ComplainPage />} />
                        <Route path="consult" element={<ConsultPage />} />
                        <Route path="inform" element={<InformPage />} />
                        <Route path="mallconsult" element={<MallconsultPage />} />
                        <Route path="feedback" element={<FeedbackPage />} />
                    </Route>

                    <Route path="/products" element={<ProductListPage />} />
                    <Route path="/product/:slug" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="search" element={<SearchPage />} />

                    <Route
                        path="/order-success"
                        element={
                            <div className="container" style={{ padding: '100px 0' }}>
                                <h2>Đặt hàng thành công!</h2>
                                <p>Cảm ơn bạn đã mua sắm.</p>
                            </div>
                        }
                    />
                </Route>
            </Routes>
            <MiniCart />
        </>
    );
}

export default App;
