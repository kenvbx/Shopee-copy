// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosInstance';

// Hàm helper xây dựng cây phân cấp (nếu bạn muốn hiển thị thụt vào)
const buildCategoryHierarchy = (categories, parentId = null, level = 0) => {
    // ... logic giữ nguyên ...
};

function ShopSidebar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/api/public/categories');
                // Nếu bạn muốn hiển thị phẳng, chỉ cần set response.data
                setCategories(response.data);
            } catch (error) {
                console.error('Lỗi tải danh mục:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <>
            <aside className="col-lg-3 sidebar sidebar-fixed shop-sidebar sticky-sidebar-wrapper">
                <div className="sidebar-overlay" />
                <a href="#" className="sidebar-toggle">
                    <i className="fas fa-chevron-right" />
                </a>
                <a className="sidebar-close" href="#">
                    <i className="d-icon-times" />
                </a>
                <div className="sidebar-content">
                    <div className="pin-wrapper" style={{ height: '1683.2px' }}>
                        <div
                            className="sticky-sidebar"
                            style={{
                                borderBottom: '0px none rgb(102, 102, 102)',
                                width: '272.5px',
                            }}
                        >
                            <div className="widget widget-collapsible">
                                <h3 className="widget-title">
                                    Tất cả sản phẩm
                                    <span className="toggle-btn" />
                                </h3>
                                <ul className="widget-body filter-items search-ul" style={{ display: 'block' }}>
                                    {categories.map((cat) => (
                                        <li key={cat.id}>
                                            <Link to={`/products?category=${cat.slug}`}>
                                                {cat.name} <span>(xx)</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="widget widget-collapsible">
                                <h3 className="widget-title">
                                    Filter by Price
                                    <span className="toggle-btn" />
                                </h3>
                                <div className="widget-body mt-3">
                                    <form action="#">
                                        <div className="filter-price-slider noUi-target noUi-ltr noUi-horizontal">
                                            <div className="noUi-base">
                                                <div className="noUi-connects">
                                                    <div
                                                        className="noUi-connect"
                                                        style={{
                                                            transform: 'translate(0%, 0px) scale(1, 1)',
                                                        }}
                                                    />
                                                </div>
                                                <div
                                                    className="noUi-origin"
                                                    style={{
                                                        transform: 'translate(-100%, 0px)',
                                                        zIndex: 5,
                                                    }}
                                                >
                                                    <div className="noUi-handle noUi-handle-lower" data-handle={0} tabIndex={0} role="slider" aria-orientation="horizontal" aria-valuemin={0.0} aria-valuemax={100.0} aria-valuenow={0.0} aria-valuetext={18.0} />
                                                </div>
                                                <div
                                                    className="noUi-origin"
                                                    style={{
                                                        transform: 'translate(0%, 0px)',
                                                        zIndex: 4,
                                                    }}
                                                >
                                                    <div className="noUi-handle noUi-handle-upper" data-handle={1} tabIndex={0} role="slider" aria-orientation="horizontal" aria-valuemin={0.0} aria-valuemax={100.0} aria-valuenow={100.0} aria-valuetext={35.0} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="filter-actions">
                                            <div className="filter-price-text mb-4">
                                                Price:
                                                <span className="filter-price-range">$18 - $35</span>
                                            </div>
                                            <button type="submit" className="btn btn-dark btn-filter btn-rounded">
                                                Filter
                                            </button>
                                        </div>
                                    </form>
                                    {/* End Filter Price Form */}
                                </div>
                            </div>
                            <div className="widget widget-collapsible">
                                <h3 className="widget-title">
                                    Size
                                    <span className="toggle-btn" />
                                </h3>
                                <ul className="widget-body filter-items">
                                    <li>
                                        <a href="#">Extra Large</a>
                                    </li>
                                    <li>
                                        <a href="#">Large</a>
                                    </li>
                                    <li>
                                        <a href="#">Medium</a>
                                    </li>
                                    <li>
                                        <a href="#">Small</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="widget widget-collapsible">
                                <h3 className="widget-title">
                                    Color
                                    <span className="toggle-btn" />
                                </h3>
                                <ul className="widget-body filter-items">
                                    <li>
                                        <a href="#">Black</a>
                                    </li>
                                    <li>
                                        <a href="#">Blue</a>
                                    </li>
                                    <li>
                                        <a href="#">Green</a>
                                    </li>
                                    <li>
                                        <a href="#">White</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="widget widget-collapsible">
                                <h3 className="widget-title">
                                    Brands
                                    <span className="toggle-btn" />
                                </h3>
                                <ul className="widget-body filter-items">
                                    <li>
                                        <a href="#">Cinderella</a>
                                    </li>
                                    <li>
                                        <a href="#">Comedy</a>
                                    </li>
                                    <li>
                                        <a href="#">Rightcheck</a>
                                    </li>
                                    <li>
                                        <a href="#">SkillStar</a>
                                    </li>
                                    <li>
                                        <a href="#">SLS</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default ShopSidebar;
