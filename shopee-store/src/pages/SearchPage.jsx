// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import ProductCard from '../components/common/ProductCard'; // Tái sử dụng ProductCard
import ShopSidebar from '../components/ShopSidebar';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q'); // Lấy từ khóa 'q' từ URL

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query) {
            const fetchResults = async () => {
                setLoading(true);
                try {
                    const response = await api.get(`/api/public/search?q=${query}`);
                    setProducts(response.data.data);
                } catch (error) {
                    console.error('Lỗi tìm kiếm:', error);
                    setProducts([]); // Đặt lại kết quả về rỗng nếu có lỗi
                } finally {
                    setLoading(false);
                }
            };
            fetchResults();
        }
    }, [query]); // Chạy lại mỗi khi từ khóa tìm kiếm trên URL thay đổi

    return (
        <>
            <main className="main">
                <nav className="breadcrumb-nav">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li>
                                <a href="/">
                                    <i className="d-icon-home" />
                                </a>
                            </li>
                            <li>Kết quả tìm kiếm cho: "{query}"</li>
                        </ul>
                    </div>
                </nav>
                <div className="page-content pb-10 mb-3">
                    <div className="container">
                        <div className="row gutter-lg main-content-wrap">
                            <ShopSidebar />
                            <div className="col-lg-9 main-content">
                                <div
                                    className="shop-banner-default banner mb-1"
                                    style={{
                                        backgroundImage: 'url("images/shop/banner.jpg")',
                                        backgroundColor: '#4e6582',
                                    }}
                                >
                                    <div className="banner-content">
                                        <h4 className="banner-subtitle font-weight-bold ls-normal text-uppercase text-white">Riode Shop</h4>
                                        <h1 className="banner-title font-weight-bold text-white">Inner Top Banner</h1>
                                        <a href="#" className="btn btn-white btn-outline btn-icon-right btn-rounded text-normal">
                                            Discover now
                                            <i className="d-icon-arrow-right" />
                                        </a>
                                    </div>
                                </div>
                                <nav className="toolbox sticky-toolbox sticky-content fix-top">
                                    <div className="toolbox-left">
                                        <div className="toolbox-item toolbox-sort select-box text-dark">
                                            <label>Sort By :</label>
                                            <select name="orderby" className="form-control">
                                                <option value="default">Default</option>
                                                <option value="popularity" selected="selected">
                                                    Most Popular
                                                </option>
                                                <option value="rating">Average rating</option>
                                                <option value="date">Latest</option>
                                                <option value="price-low">Sort forward price low</option>
                                                <option value="price-high">Sort forward price high</option>
                                                <option value="">Clear custom sort</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="toolbox-right">
                                        <div className="toolbox-item toolbox-show select-box text-dark">
                                            <label>Show :</label>
                                            <select name="count" className="form-control">
                                                <option value={12}>12</option>
                                                <option value={24}>24</option>
                                                <option value={36}>36</option>
                                            </select>
                                        </div>
                                        <div className="toolbox-item toolbox-layout">
                                            <a href="shop-list-mode.html" className="d-icon-mode-list btn-layout" />
                                            <a href="shop.html" className="d-icon-mode-grid btn-layout active" />
                                        </div>
                                    </div>
                                </nav>
                                <div className="row cols-2 cols-sm-3 product-wrapper">
                                    {loading ? (
                                        <p>Đang tìm kiếm...</p>
                                    ) : products.length > 0 ? (
                                        <>
                                            {products.map((product) => (
                                                <div className="product-wrap" key={product.id}>
                                                    <ProductCard product={product} />
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <p>Không tìm thấy sản phẩm nào phù hợp.</p>
                                    )}
                                </div>
                                <nav className="toolbox toolbox-pagination">
                                    <p className="show-info">Showing 12 of 56 Products</p>
                                    <ul className="pagination">
                                        <li className="page-item disabled">
                                            <a className="page-link page-link-prev" href="#" aria-label="Previous" tabIndex={-1} aria-disabled="true">
                                                <i className="d-icon-arrow-left" />
                                                Prev
                                            </a>
                                        </li>
                                        <li className="page-item active" aria-current="page">
                                            <a className="page-link" href="#">
                                                1
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                2
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                3
                                            </a>
                                        </li>
                                        <li className="page-item page-item-dots">
                                            <a className="page-link" href="#">
                                                6
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link page-link-next" href="#" aria-label="Next">
                                                Next
                                                <i className="d-icon-arrow-right" />
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default SearchPage;
