// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <aside className="sidebar-wrapper" data-simplebar="true">
            <div className="sidebar-header">
                <div>
                    <img src="assets/images/logo-icon.png" className="logo-icon" alt="logo icon" />
                </div>
                <div>
                    <h4 className="logo-text">ADMINCP</h4>
                </div>
                <div className="toggle-icon ms-auto">
                    <i className="bi bi-chevron-double-left" />
                </div>
            </div>
            {/*navigation*/}
            <ul className="metismenu" id="menu">
                <li>
                    <Link to="/dashboard">
                        <div className="parent-icon">
                            <i className="bi bi-house-door" />
                        </div>
                        <div className="menu-title">Bảng điều khiển</div>
                    </Link>
                </li>
                <li>
                    <a className="has-arrow" href="javascript:;">
                        <div className="parent-icon">
                            <i className="bi bi-cloud-arrow-down" />
                        </div>
                        <div className="menu-title">Banner</div>
                    </a>
                    <ul>
                        <li>
                            <Link to="/banners">
                                <i className="bi bi-arrow-right-short" />
                                Tất cả banner
                            </Link>
                        </li>
                        <li>
                            <Link to="/banners/add">
                                <i className="bi bi-arrow-right-short" />
                                Thêm mới banner
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href="javascript:;" className="has-arrow">
                        <div className="parent-icon">
                            <i className="bi bi-bag-check" />
                        </div>
                        <div className="menu-title">Sản phẩm</div>
                    </Link>
                    <ul>
                        <li>
                            <Link to="/products">
                                <i className="bi bi-arrow-right-short" />
                                Tất cả sản phẩm
                            </Link>
                        </li>
                        <li>
                            <Link to="/products/add">
                                <i className="bi bi-arrow-right-short" />
                                Thêm sản phẩm mới
                            </Link>
                        </li>
                        <li>
                            <Link to="/product-categories">
                                <i className="bi bi-arrow-right-short" />
                                Danh mục
                            </Link>
                        </li>
                        <li>
                            <Link to="/brands">
                                <i className="bi bi-arrow-right-short" />
                                Thương hiệu
                            </Link>
                        </li>
                        <li>
                            <Link to="/attributes">
                                <i className="bi bi-arrow-right-short" />
                                Thuộc tính
                            </Link>
                        </li>
                        <li>
                            <Link to="/tags">
                                <i className="bi bi-arrow-right-short" />
                                Thẻ
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to="javascript:;" className="has-arrow">
                        <div className="parent-icon">
                            <i className="bi bi-award" />
                        </div>
                        <div className="menu-title">Shop hàng</div>
                    </Link>
                    <ul>
                        <li>
                            <Link to="/sellers">
                                <i className="bi bi-arrow-right-short" />
                                Tất cả shop hàng
                            </Link>
                        </li>
                        <li>
                            <Link to="/sellers/add">
                                <i className="bi bi-arrow-right-short" />
                                Thêm shop hàng
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to="javascript:;" className="has-arrow">
                        <div className="parent-icon">
                            <i className="bi bi-person-check" />
                        </div>
                        <div className="menu-title">Thành viên</div>
                    </Link>
                    <ul>
                        <li>
                            <Link to="/users">
                                <i className="bi bi-arrow-right-short" />
                                Tất cả người dùng
                            </Link>
                        </li>
                        <li>
                            <Link to="/users/add">
                                <i className="bi bi-arrow-right-short" />
                                Thêm người dùng
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile">
                                <i className="bi bi-arrow-right-short" />
                                Hồ sơ
                            </Link>
                        </li>
                    </ul>
                </li>

                <li>
                    <Link to="/subscribers">
                        <div className="parent-icon">
                            <i className="bi bi-file-earmark-break" />
                        </div>
                        <div className="menu-title">Quản lý Đăng ký</div>
                    </Link>
                </li>

                <li>
                    <Link to="/options">
                        <div className="parent-icon">
                            <i className="bi bi-bookmark-star" />
                        </div>
                        <div className="menu-title">Tuỳ chọn</div>
                    </Link>
                </li>

                <li>
                    <a className="has-arrow" href="javascript:;">
                        <div className="parent-icon">
                            <i className="bi bi-file-earmark-spreadsheet" />
                        </div>
                        <div className="menu-title">Tables</div>
                    </a>
                    <ul>
                        <li>
                            {' '}
                            <a href="table-basic-table.html">
                                <i className="bi bi-arrow-right-short" />
                                Basic Table
                            </a>
                        </li>
                        <li>
                            {' '}
                            <a href="table-advance-tables.html">
                                <i className="bi bi-arrow-right-short" />
                                Advance Tables
                            </a>
                        </li>
                        <li>
                            {' '}
                            <a href="table-datatable.html">
                                <i className="bi bi-arrow-right-short" />
                                Data Table
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="menu-label">Pages</li>
                <li>
                    <a className="has-arrow" href="javascript:;">
                        <div className="parent-icon">
                            <i className="bi bi-lock" />
                        </div>
                        <div className="menu-title">Authentication</div>
                    </a>
                    <ul>
                        <li>
                            {' '}
                            <a href="authentication-signin.html" target="_blank">
                                <i className="bi bi-arrow-right-short" />
                                Sign In
                            </a>
                        </li>
                        <li>
                            {' '}
                            <a href="authentication-signup.html" target="_blank">
                                <i className="bi bi-arrow-right-short" />
                                Sign Up
                            </a>
                        </li>
                        <li>
                            {' '}
                            <a href="authentication-signin-with-header-footer.html" target="_blank">
                                <i className="bi bi-arrow-right-short" />
                                Sign In with Header &amp; Footer
                            </a>
                        </li>
                        <li>
                            {' '}
                            <a href="authentication-signup-with-header-footer.html" target="_blank">
                                <i className="bi bi-arrow-right-short" />
                                Sign Up with Header &amp; Footer
                            </a>
                        </li>
                        <li>
                            {' '}
                            <a href="authentication-forgot-password.html" target="_blank">
                                <i className="bi bi-arrow-right-short" />
                                Forgot Password
                            </a>
                        </li>
                        <li>
                            {' '}
                            <a href="authentication-reset-password.html" target="_blank">
                                <i className="bi bi-arrow-right-short" />
                                Reset Password
                            </a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a href="pages-timeline.html">
                        <div className="parent-icon">
                            <i className="bi bi-collection-play" />
                        </div>
                        <div className="menu-title">Timeline</div>
                    </a>
                </li>
                <li>
                    <a className="has-arrow" href="javascript:;">
                        <div className="parent-icon">
                            <i className="bx bx-error" />
                        </div>
                        <div className="menu-title">Errors</div>
                    </a>
                    <ul>
                        <li>
                            {' '}
                            <a href="pages-errors-404-error.html" target="_blank">
                                <i className="bi bi-arrow-right-short" />
                                404 Error
                            </a>
                        </li>
                        <li>
                            {' '}
                            <a href="pages-errors-500-error.html" target="_blank">
                                <i className="bi bi-arrow-right-short" />
                                500 Error
                            </a>
                        </li>
                        <li>
                            {' '}
                            <a href="pages-errors-coming-soon.html" target="_blank">
                                <i className="bi bi-arrow-right-short" />
                                Coming Soon
                            </a>
                        </li>
                        <li>
                            {' '}
                            <a href="pages-blank-page.html" target="_blank">
                                <i className="bi bi-arrow-right-short" />
                                Blank Page
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="pages-faq.html">
                        <div className="parent-icon">
                            <i className="bi bi-exclamation-triangle" />
                        </div>
                        <div className="menu-title">FAQ</div>
                    </a>
                </li>
                <li>
                    <a href="pages-pricing-tables.html">
                        <div className="parent-icon">
                            <i className="bi bi-credit-card-2-front" />
                        </div>
                        <div className="menu-title">Pricing Tables</div>
                    </a>
                </li>
                <li className="menu-label">Charts &amp; Maps</li>
                <li>
                    <a className="has-arrow" href="javascript:;">
                        <div className="parent-icon">
                            <i className="bi bi-graph-down" />
                        </div>
                        <div className="menu-title">Charts</div>
                    </a>
                    <ul>
                        <li>
                            {' '}
                            <a href="charts-apex-chart.html">
                                <i className="bi bi-arrow-right-short" />
                                Apex
                            </a>
                        </li>
                        <li>
                            {' '}
                            <a href="charts-chartjs.html">
                                <i className="bi bi-arrow-right-short" />
                                Chartjs
                            </a>
                        </li>
                        <li>
                            {' '}
                            <a href="charts-highcharts.html">
                                <i className="bi bi-arrow-right-short" />
                                Highcharts
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a className="has-arrow" href="javascript:;">
                        <div className="parent-icon">
                            <i className="bi bi-pin-map" />
                        </div>
                        <div className="menu-title">Maps</div>
                    </a>
                    <ul>
                        <li>
                            {' '}
                            <a href="map-google-maps.html">
                                <i className="bi bi-arrow-right-short" />
                                Google Maps
                            </a>
                        </li>
                        <li>
                            {' '}
                            <a href="map-vector-maps.html">
                                <i className="bi bi-arrow-right-short" />
                                Vector Maps
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="menu-label">Others</li>
                <li>
                    <a className="has-arrow" href="javascript:;">
                        <div className="parent-icon">
                            <i className="bi bi-list-task" />
                        </div>
                        <div className="menu-title">Menu Levels</div>
                    </a>
                    <ul>
                        <li>
                            {' '}
                            <a className="has-arrow" href="javascript:;">
                                <i className="bi bi-arrow-right-short" />
                                Level One
                            </a>
                            <ul>
                                <li>
                                    {' '}
                                    <a className="has-arrow" href="javascript:;">
                                        <i className="bi bi-arrow-right-short" />
                                        Level Two
                                    </a>
                                    <ul>
                                        <li>
                                            {' '}
                                            <a href="javascript:;">
                                                <i className="bi bi-arrow-right-short" />
                                                Level Three
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="https://codervent.com/skodash/documentation/index.html" target="_blank">
                        <div className="parent-icon">
                            <i className="bi bi-file-earmark-code" />
                        </div>
                        <div className="menu-title">Documentation</div>
                    </a>
                </li>
                <li>
                    <a href="https://themeforest.net/user/codervent" target="_blank">
                        <div className="parent-icon">
                            <i className="bi bi-headset" />
                        </div>
                        <div className="menu-title">Support</div>
                    </a>
                </li>
            </ul>
            {/*end navigation*/}
        </aside>
    );
}

export default Sidebar;
