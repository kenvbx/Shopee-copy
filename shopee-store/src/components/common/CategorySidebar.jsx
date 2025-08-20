// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosInstance';

const CategorySidebar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/api/public/categories/hierarchy');
                setCategories(response.data);
            } catch (error) {
                console.error('Lỗi tải cây danh mục:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="banner-category">
            <div className="banner-category-head">
                <i className="fas fa-bars"></i>
                <span>Danh mục</span>
            </div>
            <ul className="banner-category-list">
                {categories.map((category) => (
                    <li className="banner-category-item" key={category.id}>
                        <Link to={`/products?category=${category.slug}`}>
                            <i className={category.icon || 'flaticon-vegetable'}></i>
                            <span>{category.name}</span>
                        </Link>
                        {category.children && category.children.length > 0 && (
                            <div className="banner-category-dropdown">
                                {category.children.map((child) => (
                                    <>
                                        <h5>{child.name}</h5>
                                        <div className="banner-sub-category">
                                            {/* This structure assumes a simple list. You can add columns if needed. */}
                                            <ul>
                                                {category.children.map((child) => (
                                                    <li key={child.id}>
                                                        <Link to={`/products?category=${child.slug}`}>{child.name}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategorySidebar;
