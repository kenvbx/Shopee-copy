// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { useOptions } from '../../context/OptionsContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Navbar from '../common/Navbar';

function Header() {
    const navigate = useNavigate();
    const { options, loading } = useOptions();
    const { cart, itemCount, openMiniCart, removeFromCart, showMiniCart, closeMiniCart } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const { wishlistCount } = useWishlist();

    const [categories, setCategories] = useState([]);

    const { user, handleShowLogin, handleShowRegister } = useAuth();

    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const logoSrc = options.site_logo ? `${API_URL}/${options.site_logo}` : '/images/logo.png';

    const subTotal =
        cart?.CartItems?.reduce((sum, item) => {
            const price = item.Product?.sale_price || item.Product?.price || 0;
            return sum + item.quantity * price;
        }, 0) || 0;

    useEffect(() => {
        if (searchTerm.length < 2) {
            setSuggestions([]);
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            api.get(`/api/public/search/suggestions?q=${searchTerm}`)
                .then((res) => setSuggestions(res.data))
                .catch((err) => console.error(err));
        }, 300); // Đợi 300ms sau khi người dùng ngừng gõ

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // Tải lịch sử tìm kiếm từ localStorage khi component được mount
    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('search_history')) || [];
        setSearchHistory(history);
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/api/public/categories/hierarchy');
                setCategories(res.data || []);
            } catch (err) {
                console.error('Lỗi tải cây danh mục:', err);
                setCategories([]);
            }
        };
        fetchCategories();
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const term = searchTerm.trim();
        if (term) {
            // Lưu từ khóa mới vào lịch sử
            const newHistory = [term, ...searchHistory.filter((item) => item !== term)].slice(0, 5); // Giữ lại 5 mục gần nhất
            setSearchHistory(newHistory);
            localStorage.setItem('search_history', JSON.stringify(newHistory));

            navigate(`/search?q=${term}`);
            setIsSearchFocused(false); // Ẩn dropdown lịch sử sau khi tìm kiếm
        }
    };

    return (
        <header className="header">
            <div className="header-top">
                <div className="container">
                    <div className="header-left">
                        <p className="welcome-msg ls-normal">Welcome to Riode store message or remove it!</p>
                    </div>
                    <div className="header-right">
                        <div className="dropdown">
                            <a href="#currency">USD</a>
                            <ul className="dropdown-box">
                                <li>
                                    <a href="#USD">USD</a>
                                </li>
                                <li>
                                    <a href="#EUR">EUR</a>
                                </li>
                            </ul>
                        </div>
                        {/* End DropDown Menu */}
                        <div className="dropdown ml-5">
                            <a href="#language">ENG</a>
                            <ul className="dropdown-box">
                                <li>
                                    <a href="#USD">ENG</a>
                                </li>
                                <li>
                                    <a href="#EUR">FRH</a>
                                </li>
                            </ul>
                        </div>
                        {/* End DropDown Menu */}
                        <span className="divider" />
                        <a href="store-listing.html" className="contact d-lg-show">
                            <i className="d-icon-map" />
                            Vendors
                        </a>

                        {user ? (
                            <Link to="/account" title={user.name} className="help d-lg-show">
                                <i className="d-icon-info" /> {user.name}
                            </Link>
                        ) : (
                            // <Link className="header-widget" to="/account" title="{user.name}">
                            //     <img src={user.avatar ? `${API_URL}/${user.avatar}` : '/images/user.png.jpeg'} alt={user.name} className="rounded-circle me-3" />
                            //     <span>{user.name}</span>
                            // </Link>
                            <>
                                <Link className="login-link" to="/login" data-toggle="login-modal">
                                    <i className="d-icon-user" />
                                    Đăng nhập
                                </Link>
                                <span className="delimiter">/</span>
                                <Link className="register-link ml-0" to="/register" data-toggle="login-modal">
                                    Đăng ký
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {/* End HeaderTop */}
            <div className="header-middle">
                <div className="container">
                    <div className="header-left mr-4">
                        <a href="#" className="mobile-menu-toggle">
                            <i className="d-icon-bars2" />
                        </a>
                        <Link to="/" className="logo">
                            {loading ? <span>Loading...</span> : <img src={logoSrc} alt="logo" width={153} height={44} />}
                        </Link>

                        {/* End Logo */}
                        <div className="header-search hs-expanded">
                            <form onSubmit={handleSearchSubmit} className="input-wrapper">
                                <div className="select-box">
                                    <select name="cat" className="cat">
                                        <option value="all-cat" selected="">
                                            All Categories
                                        </option>
                                        <option value="travel">Travel</option>
                                        <option value="shopping">Shopping</option>
                                        <option value="fashion">Fashion</option>
                                        <option value="lifestyle">Lifestyle</option>
                                    </select>
                                </div>
                                <input type="text" className="form-control" placeholder="Tìm kiếm..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onFocus={() => setIsSearchFocused(true)} onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)} />
                                <button className="btn btn-search" type="submit">
                                    <i className="d-icon-search" />
                                </button>
                            </form>
                            {isSearchFocused && (
                                <div className="search-dropdown">
                                    {/* Hiển thị Gợi ý nếu có, ngược lại hiển thị Lịch sử */}
                                    {suggestions.length > 0 ? (
                                        <div className="autocomplete-suggestions">
                                            {suggestions.map((product) => (
                                                <div className="autocomplete-suggestion" key={product.slug}>
                                                    <Link to={`/product/${product.slug}`}>
                                                        <img className="search-image" src={product.main_image ? `${API_URL}/${product.main_image}` : 'https://placehold.co/50x50/EEE/31343C'} alt={product.name} />
                                                        <div className="search-info">
                                                            <div className="search-name">
                                                                <strong>{product.name}</strong>
                                                            </div>
                                                            <span className="search-price">
                                                                {product.sale_price ? (
                                                                    <>
                                                                        <span className="text-danger me-2">{new Intl.NumberFormat('vi-VN').format(product.sale_price)} đ</span>
                                                                        <del className="text-muted">{new Intl.NumberFormat('vi-VN').format(product.price)} đ</del>
                                                                    </>
                                                                ) : (
                                                                    <span className="text-danger">{new Intl.NumberFormat('vi-VN').format(product.price)} đ</span>
                                                                )}
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        searchHistory.length > 0 && (
                                            <ul>
                                                {searchHistory.map((item, index) => (
                                                    <li key={index}>
                                                        <Link style={{ width: '100%' }} to={`/search?q=${item}`}>
                                                            {item}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                        {/* End Header Search */}
                    </div>
                    <div className="header-right">
                        <div className="icon-box icon-box-side">
                            <div className="icon-box-icon mr-0 mr-lg-2">
                                <i className="d-icon-phone" />
                            </div>
                            <div className="icon-box-content d-lg-show">
                                <h4 className="icon-box-title text-dark text-normal">
                                    <a href="mailto:riode@mail.com" className="text-primary d-inline-block">
                                        Live chat
                                    </a>
                                    or:
                                </h4>
                                <p>
                                    <a href="tel:#">0(800) 123-456</a>
                                </p>
                            </div>
                        </div>
                        <span className="divider mr-4" />
                        <a href="#" className="compare">
                            <i className="d-icon-compare" />
                        </a>

                        <Link to="/account/wishlist" className="wishlist">
                            <i className="d-icon-heart" />
                            <sup>{wishlistCount}</sup>
                        </Link>

                        <span className="divider" />

                        <div className="dropdown cart-dropdown type2 cart-offcanvas mr-0 mr-lg-2">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    openMiniCart();
                                }}
                                className="cart-toggle label-block link"
                            >
                                <div className="cart-label d-lg-show">
                                    <span className="cart-name">Giỏ hàng:</span>
                                    <span className="cart-price">{new Intl.NumberFormat('vi-VN').format(subTotal)} đ</span>
                                </div>
                                <i className="d-icon-bag">
                                    <span className="cart-count">{itemCount}</span>
                                </i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-bottom sticky-header fix-top sticky-content d-lg-show">
                <div className="container">
                    <div className="header-left">
                        <div className="dropdown category-dropdown" data-visible="true">
                            <a href="#" className="category-toggle" role="button" data-toggle="dropdown" data-display="static" title="Browse Categories">
                                <i className="d-icon-bars" />
                                <span>Danh mục sản phẩm</span>
                            </a>
                            <div className="dropdown-box">
                                <ul className="menu vertical-menu category-menu">
                                    {categories.length === 0 ? (
                                        <li>
                                            <span>Đang tải danh mục...</span>
                                        </li>
                                    ) : (
                                        categories.map((category) => (
                                            <li key={category.id}>
                                                <Link to={`/products?category=${category.slug}`}>
                                                    <i className={category.icon || 'flaticon-vegetable'} />
                                                    {category.name}
                                                </Link>

                                                {Array.isArray(category.children) && category.children.length > 0 && (
                                                    <ul className="megamenu">
                                                        {category.children.map((child) => (
                                                            <li key={child.id}>
                                                                <h4 className="menu-title">{child.name}</h4>
                                                                <hr className="divider" />
                                                                <ul>
                                                                    {(child.children || []).map((grand) => (
                                                                        <li key={grand.id}>
                                                                            <Link to={`/products?category=${grand.slug}`}>{grand.name}</Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))
                                    )}
                                    <li>
                                        <Link to="/categories" className="font-weight-semi-bold text-primary text-uppercase ls-25">
                                            Xem tất cả danh mục
                                            <i className="d-icon-angle-right" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <nav className="main-nav">
                            <Navbar />
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
export default Header;
