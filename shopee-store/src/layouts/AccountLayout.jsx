// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AccountLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const handleLogout = () => {
        logout();
        navigate('/'); // Chuyển về trang chủ sau khi đăng xuất
    };

    if (!user) {
        return <div className="container py-80 text-center">Đang tải thông tin...</div>;
    }

    return (
        <section className="inner-section profile-part pt-4">
            <div className="container">
                <div className="row">
                    <dic className="col-md-7 col-lg-3 account-sidebar" role="tablist">
                        <Link to="/account/profile" className="accountLink">
                            <div className="accountLink_ava">
                                <img src={user.avatar ? `${API_URL}/${user.avatar}` : '/images/user.png.jpeg'} alt={user.name} className="rounded-circle me-3" />
                            </div>
                            <div className="accountLink_name">
                                <span>{user.name}</span>
                            </div>
                        </Link>

                        <h5 class="ps-3 mb-1 mt-4">
                            <b>Quản lý đơn hàng</b>
                        </h5>

                        <NavLink to="/account/orders" className="nav-link">
                            Đơn hàng
                        </NavLink>

                        <NavLink to="/account/reviews" className="nav-link">
                            Đánh giá
                        </NavLink>

                        <h5 class="ps-3 mb-1 mt-2">
                            <b>Quản lý tài khoản</b>
                        </h5>

                        <NavLink to="/account/profile" className="nav-link">
                            Tài khoản
                        </NavLink>

                        <NavLink to="/account/security" className="nav-link">
                            Bảo mật tài khoản
                        </NavLink>

                        <NavLink to="/account/notifies" className="nav-link">
                            Thông báo
                        </NavLink>

                        <NavLink to="/account/invoice" className="nav-link">
                            Quản lý hóa đơn
                        </NavLink>

                        <NavLink to="/account/message" className="nav-link">
                            Tin nhắn
                        </NavLink>

                        <NavLink to="/account/wishlist" className="nav-link">
                            Yêu thích
                        </NavLink>
                        <h5 class="ps-3 mb-1 mt-2">
                            <b>Quản lý tài chính</b>
                        </h5>

                        <NavLink to="/account/coupons" className="nav-link">
                            Voucher của tôi
                        </NavLink>

                        <h5 class="ps-3 mb-1 mt-2">
                            <b>Hỗ trợ khách hàng</b>
                        </h5>

                        <NavLink to="/account/refund" className="nav-link">
                            Hoàn tiền
                        </NavLink>

                        <NavLink to="/account/complain" className="nav-link">
                            Khiếu nại sản phẩm
                        </NavLink>

                        <NavLink to="/account/consult" className="nav-link">
                            Tư vấn hàng hoá
                        </NavLink>

                        <NavLink to="/account/inform" className="nav-link">
                            Báo cáo vi phạm
                        </NavLink>

                        <NavLink to="/account/mallconsult" className="nav-link">
                            Dịch vụ khách hàng
                        </NavLink>

                        <NavLink to="/account/feedback" className="nav-link">
                            Phản hồi
                        </NavLink>
                        <hr className="hrCustom" />
                        <Link to="#" className="nav-link" onClick={handleLogout}>
                            <img className="h-[24px] w-[24px]" alt="" src="../public/images/checkout.svg" />
                            Đăng xuất
                        </Link>
                    </dic>
                    <div className="col-lg-9 account-content-wrap">
                        <Outlet />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AccountLayout;
