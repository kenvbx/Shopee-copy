// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOptions } from '../../context/OptionsContext'; // 1. Import hook useOptions

const Footer = () => {
    // 2. Lấy dữ liệu options và trạng thái loading từ context
    const { options, loading } = useOptions();
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    // State để lưu trữ các mục menu đã được xử lý
    const [quickLinks1, setQuickLinks1] = useState([]);
    const [quickLinks2, setQuickLinks2] = useState([]);

    useEffect(() => {
        // Xử lý và chuyển đổi JSON menu từ options
        if (options.footer_links_col1) {
            try {
                setQuickLinks1(JSON.parse(options.footer_links_col1));
            } catch (e) {
                setQuickLinks1([]);
            }
        }
        if (options.footer_links_col2) {
            try {
                setQuickLinks2(JSON.parse(options.footer_links_col2));
            } catch (e) {
                setQuickLinks2([]);
            }
        }
    }, [options]); // Chạy lại mỗi khi options thay đổi

    const logoSrc = options.site_logo ? `${API_URL}/${options.site_logo}` : '/images/logo.png';

    return (
        <footer className="footer-part">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-xl-3">
                        <div className="footer-widget">
                            <Link className="footer-logo" to="/">
                                {loading ? <span>...</span> : <img src={logoSrc} alt="logo" />}
                            </Link>
                            <p className="footer-desc">{options.footer_description || 'Mô tả mặc định...'}</p>
                            {/* Social links sẽ được làm động sau */}
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                        <div className="footer-widget contact">
                            <h3 className="footer-title">contact us</h3>
                            <ul className="footer-contact">
                                <li>
                                    <i className="icofont-ui-email"></i>
                                    <p>
                                        <span>{options.company_email || '...'}</span>
                                    </p>
                                </li>
                                <li>
                                    <i className="icofont-ui-touch-phone"></i>
                                    <p>
                                        <span>{options.company_phone || '...'}</span>
                                    </p>
                                </li>
                                <li>
                                    <i className="icofont-location-pin"></i>
                                    <p>{options.company_address || '...'}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                        <div className="footer-widget">
                            <h3 className="footer-title">quick Links</h3>
                            <div className="footer-links">
                                <ul>
                                    {quickLinks1.map((link) => (
                                        <li key={link.id}>
                                            <Link to={link.url}>{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                                <ul>
                                    {quickLinks2.map((link) => (
                                        <li key={link.id}>
                                            <Link to={link.url}>{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                        <div className="footer-widget">
                            <h3 className="footer-title">Download App</h3>
                            <p className="footer-desc">Lorem ipsum dolor sit amet tenetur dignissimos ipsum.</p>
                            <div className="footer-app">
                                <a href="#">
                                    <img src="/images/google-store.png" alt="google" />
                                </a>
                                <a href="#">
                                    <img src="/images/app-store.png" alt="app" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="footer-bottom">
                            <p className="footer-copytext">&copy; All Copyrights Reserved by Your Company</p>
                            {/* Payment methods */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
