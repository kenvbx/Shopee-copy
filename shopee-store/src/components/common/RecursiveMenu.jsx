// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

/**
 * Component đệ quy để render menu động, hỗ trợ cả dropdown thường và mega menu.
 * @param {Array} menuItems - Mảng chứa các đối tượng mục menu.
 */
const RecursiveMenu = ({ menuItems }) => {
    // Nếu không có dữ liệu menu thì không render gì cả
    if (!menuItems || menuItems.length === 0) {
        return null;
    }

    return (
        <ul className="menu">
            {menuItems.map((item) => (
                // Mỗi mục menu là một thẻ <li>
                // Chúng ta dùng NavLink để mục đang active có thể được highlight
                <li key={item.id}>
                    <NavLink to={item.url}>{item.label}</NavLink>

                    {/* KIỂM TRA XEM MỤC NÀY CÓ MENU CON KHÔNG */}
                    {item.children &&
                        item.children.length > 0 &&
                        // NẾU LÀ MEGA MENU
                        (item.isMegaMenu ? (
                            <div className="megamenu">
                                <div className="row">
                                    {/* Lặp qua các "con" của mega menu (có thể là cột hoặc banner) */}
                                    {item.children.map((column) => {
                                        // Nếu là một cột chứa các link
                                        if (column.type === 'column') {
                                            return (
                                                <div key={column.id} className="col-6 col-sm-4 col-md-3 col-lg-4">
                                                    <h4 className="menu-title">{column.title}</h4>
                                                    <ul>
                                                        {column.children.map((link) => (
                                                            <li key={link.id}>
                                                                <Link to={link.url}>
                                                                    {link.label}
                                                                    {/* Hiển thị các tag đặc biệt nếu có */}
                                                                    {link.isNew && <span className="tip tip-new">New</span>}
                                                                    {link.isHot && <span className="tip tip-hot">Hot</span>}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            );
                                        }

                                        // Nếu là một banner quảng cáo
                                        if (column.type === 'banner') {
                                            return (
                                                <div key={column.id} className="col-6 col-sm-4 col-md-3 col-lg-4 menu-banner menu-banner1 banner banner-fixed">
                                                    <figure>
                                                        <img src={column.imageUrl} alt="Menu banner" width={221} height={330} />
                                                    </figure>
                                                    <div className="banner-content y-50">
                                                        <h4 className="banner-subtitle font-weight-bold text-primary ls-m">{column.subtitle}</h4>
                                                        <h3 className="banner-title font-weight-bold">{column.title}</h3>
                                                        <Link to={column.url} className="btn btn-link btn-underline">
                                                            shop now <i className="d-icon-arrow-right" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        return null; // Bỏ qua nếu type không hợp lệ
                                    })}
                                </div>
                            </div>
                        ) : (
                            // NẾU LÀ DROPDOWN THƯỜNG
                            // Sử dụng đệ quy: gọi lại chính component này để render menu con
                            <RecursiveMenu menuItems={item.children} />
                        ))}
                </li>
            ))}
        </ul>
    );
};

export default RecursiveMenu;
