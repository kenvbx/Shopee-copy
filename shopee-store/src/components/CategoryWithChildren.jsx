// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
// components/home/CategoryWithChildren.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import { Link } from 'react-router-dom';

export default function CategoryWithChildren({ categoryId /* hoặc categorySlug */ }) {
    const [cat, setCat] = useState(null);

    useEffect(() => {
        const run = async () => {
            const res = await api.get('/api/public/categories/hierarchy');
            // tìm theo id
            const found = res.data.find((c) => String(c.id) === String(categoryId));
            // // hoặc theo slug:
            // const found = res.data.find(c => c.slug === categorySlug);

            setCat(found || null);
        };
        run().catch(console.error);
    }, [categoryId]);

    if (!cat) return null;

    return (
        <div className="col-xl-5col col-lg-3 col-md-4 mb-4">
            <div className="category-wrapper bg-white d-flex flex-column align-items-start h-100">
                <h2 className="title text-left">{cat.name}</h2>
                <ul className="pl-0 mt-0 flex-1">
                    {(cat.children || []).map((child) => (
                        <li key={child.id}>
                            <Link to={`/products?category=${child.slug}`}>{child.name}</Link>
                        </li>
                    ))}
                </ul>
                <Link to={`/products?category=${cat.slug}`} className="btn btn-dark btn-link btn-underline text-left">
                    Browse All <i className="d-icon-arrow-right" />
                </Link>
            </div>
        </div>
    );
}
