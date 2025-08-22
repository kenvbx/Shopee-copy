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
        <footer className="footer">
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
            <div className="container">
                <div className="footer-top">
                    <div className="row align-items-center">
                        <div className="col-lg-3">
                            <Link className="logo-footer" to="/">
                                {loading ? <span>...</span> : <img src={logoSrc} alt="logo" width={153} height={44} />}
                            </Link>

                            {/* End FooterLogo */}
                        </div>
                        <div className="col-lg-4 widget-newsletter mb-4 mb-lg-0">
                            <h4 className="widget-title ls-normal">Subscribe to our Newsletter</h4>
                            <p>Get all the latest information on Events, Sales and Offers.</p>
                        </div>
                        <div className="col-lg-5 widget-newsletter">
                            <form action="#" className="input-wrapper-inline mx-auto mx-lg-0">
                                <input type="email" className="form-control" name="email" id="email" placeholder="Email address here..." required="" />
                                <button className="btn btn-primary btn-rounded btn-md ml-2" type="submit">
                                    subscribe
                                    <i className="d-icon-arrow-right" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="footer-middle">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="widget widget-info">
                                <h4 className="widget-title">Thông tin liên hệ</h4>
                                <ul className="widget-body">
                                    <li>
                                        <label>Điện thoại:</label>
                                        <a href="tel:#"> {options.company_phone || '...'}</a>
                                    </li>
                                    <li>
                                        <label>Email:</label>
                                        <a href="mailto:mail@riode.com"> {options.company_email || '...'}</a>
                                    </li>
                                    <li>
                                        <label>Địa chỉ:</label>
                                        <a href="#"> {options.company_address || '...'}</a>
                                    </li>
                                    <li>
                                        <label>WORKING DAYS / HOURS:</label>
                                    </li>
                                    <li>
                                        <a href="#">Mon - Sun / 9:00 AM - 8:00 PM</a>
                                    </li>
                                </ul>
                            </div>
                            {/* End Widget */}
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="widget">
                                <h4 className="widget-title">My Account</h4>
                                <ul className="widget-body">
                                    <li>
                                        <a href="about-us.html">Track My Order</a>
                                    </li>
                                    <li>
                                        <a href="#">View Cart</a>
                                    </li>
                                    <li>
                                        <a href="#">Sign in</a>
                                    </li>
                                    <li>
                                        <a href="#">My Wishlist</a>
                                    </li>
                                    <li>
                                        <a href="#">Privacy Policy</a>
                                    </li>
                                </ul>
                            </div>
                            {/* End Widget */}
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="widget">
                                <h4 className="widget-title">About Us</h4>
                                <ul className="widget-body">
                                    <li>
                                        <a href="about-us.html">About Us</a>
                                    </li>
                                    <li>
                                        <a href="#">Order History</a>
                                    </li>
                                    <li>
                                        <a href="#">Returns</a>
                                    </li>
                                    <li>
                                        <a href="#">Custom Service</a>
                                    </li>
                                    <li>
                                        <a href="#">Terms &amp; Condition</a>
                                    </li>
                                </ul>
                            </div>
                            {/* End Widget */}
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="widget">
                                <h4 className="widget-title">Customer Service</h4>
                                <ul className="widget-body">
                                    <li>
                                        <a href="#">Payment Methods</a>
                                    </li>
                                    <li>
                                        <a href="#">Money-back Guarantee!</a>
                                    </li>
                                    <li>
                                        <a href="#">Products Returns</a>
                                    </li>
                                    <li>
                                        <a href="#">Support Center</a>
                                    </li>
                                    <li>
                                        <a href="#">Shipping</a>
                                    </li>
                                </ul>
                            </div>
                            {/* End Widget */}
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="widget widget-instagram pl-lg-10 mb-0 mb-md-6">
                                <h4 className="widget-title">Instagram</h4>
                                <figure className="widget-body row">
                                    <div className="col-3">
                                        <img src="images/instagram/01.jpg" alt="instagram 1" width={64} height={64} />
                                    </div>
                                    <div className="col-3">
                                        <img src="images/instagram/02.jpg" alt="instagram 2" width={64} height={64} />
                                    </div>
                                    <div className="col-3">
                                        <img src="images/instagram/03.jpg" alt="instagram 3" width={64} height={64} />
                                    </div>
                                    <div className="col-3">
                                        <img src="images/instagram/04.jpg" alt="instagram 4" width={64} height={64} />
                                    </div>
                                    <div className="col-3">
                                        <img src="images/instagram/05.jpg" alt="instagram 5" width={64} height={64} />
                                    </div>
                                    <div className="col-3">
                                        <img src="images/instagram/06.jpg" alt="instagram 6" width={64} height={64} />
                                    </div>
                                    <div className="col-3">
                                        <img src="images/instagram/07.jpg" alt="instagram 7" width={64} height={64} />
                                    </div>
                                    <div className="col-3">
                                        <img src="images/instagram/08.jpg" alt="instagram 8" width={64} height={64} />
                                    </div>
                                </figure>
                            </div>
                            {/* End Instagram */}
                        </div>
                    </div>
                </div>
                {/* End FooterMiddle */}
                <div className="footer-main">
                    <div className="widget widget-category">
                        <div className="category-box">
                            <h6 className="category-name">Clothing &amp; Apparel:</h6>
                            <a href="#">Boots</a>
                            <a href="#">Dresses</a>
                            <a href="#">Jeans</a>
                            <a href="#">Leather Backpack</a>
                            <a href="#">Men's Sneaker</a>
                            <a href="#">Men's T-shirt</a>
                            <a href="#">Peter England Shirts</a>
                            <a href="#">Rayban</a>
                            <a href="#">Sunglasses</a>
                        </div>
                        <div className="category-box">
                            <h6 className="category-name">Computer &amp; Technologies:</h6>
                            <a href="#">Apple</a>
                            <a href="#">Drone</a>
                            <a href="#">Game Controller</a>
                            <a href="#">iMac</a>
                            <a href="#">Laptop</a>
                            <a href="#">Smartphone</a>
                            <a href="#">Tablet</a>
                            <a href="#">Wireless Speaker</a>
                        </div>
                        <div className="category-box">
                            <h6 className="category-name">Consumer Electric:</h6>
                            <a href="#">Air Condition</a>
                            <a href="#">Audio Speaker</a>
                            <a href="#">Refrigerator</a>
                            <a href="#">Security Camera</a>
                            <a href="#">TV Television</a>
                            <a href="#">Washing Machine</a>
                        </div>
                        <div className="category-box">
                            <h6 className="category-name">Jewellery &amp; Watches:</h6>
                            <a href="#">Ammolite</a>
                            <a href="#">Australian Opal</a>
                            <a href="#">Diamond Ring</a>
                            <a href="#">Faceted Carnelian</a>
                            <a href="#">Gucci</a>
                            <a href="#">Leather Watcher</a>
                            <a href="#">Necklace</a>
                            <a href="#">Pendant</a>
                            <a href="#">Rolex</a>
                            <a href="#">Silver Earing</a>
                            <a href="#">Sun Pyrite</a>
                            <a href="#">Watches</a>
                        </div>
                        <div className="category-box">
                            <h6 className="category-name">Healthy &amp; Beauty:</h6>
                            <a href="#">Body Shower</a>
                            <a href="#">Hair Care</a>
                            <a href="#">LipStick</a>
                            <a href="#">Makeup</a>
                            <a href="#">Perfume</a>
                            <a href="#">Skin Care</a>
                        </div>
                        <div className="category-box">
                            <h6 className="category-name">Home, Garden &amp; Kitchen:</h6>
                            <a href="#">Bed Room</a>
                            <a href="#">Blender</a>
                            <a href="#">Chair</a>
                            <a href="#">Cookware</a>
                            <a href="#">Decor</a>
                            <a href="#">Garden Equipments</a>
                            <a href="#">Library</a>
                            <a href="#">Living Room</a>
                            <a href="#">Shield-Oval</a>
                            <a href="#">Sofa</a>
                            <a href="#">Utensil</a>
                            <a href="#">Wayfarer</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-left">
                        <figure className="payment">
                            <img src="images/payment.png" alt="payment" width={159} height={29} />
                        </figure>
                    </div>
                    <div className="footer-center">
                        <p className="copyright">Riode eCommerce © 2021. All Rights Reserved</p>
                    </div>
                    <div className="footer-right">
                        <div className="social-links">
                            <a href="#" className="social-link social-facebook fab fa-facebook-f" />
                            <a href="#" className="social-link social-twitter fab fa-twitter" />
                            <a href="#" className="social-link social-linkedin fab fa-linkedin-in" />
                        </div>
                    </div>
                </div>
                {/* End FooterBottom */}
            </div>
        </footer>
    );
};

export default Footer;
