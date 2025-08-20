// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useOptions } from '../../context/OptionsContext';

/**
 * Component con, sử dụng đệ quy để render các cấp menu.
 * @param {Array} items - Mảng các mục menu con.
 */
const SubMenu = ({ items }) => {
    return (
        <ul className="dropdown-position-list">
            {items.map((subItem) => (
                <li key={subItem.id}>
                    <Link to={subItem.url}>{subItem.label}</Link>
                    {/* Nếu có cấp menu con nữa, gọi lại chính nó (đệ quy) */}
                    {subItem.children && <SubMenu items={subItem.children} />}
                </li>
            ))}
        </ul>
    );
};

/**
 * Component chính cho thanh điều hướng.
 */
const Navbar = () => {
    const { options, loading } = useOptions();
    const [menuItems, setMenuItems] = useState([]);

    // Xử lý và chuyển đổi JSON menu từ options
    useEffect(() => {
        if (options.main_menu) {
            try {
                const parsedMenu = JSON.parse(options.main_menu);
                setMenuItems(parsedMenu);
            } catch (e) {
                console.error('Lỗi khi đọc dữ liệu menu:', e);
                setMenuItems([]);
            }
        }
    }, [options.main_menu]);

    return (
        <>
            <ul className="menu menu-active-underline">
                {loading ? (
                    <li>
                        <Link to="#">Đang tải menu...</Link>
                    </li>
                ) : (
                    menuItems.map((item) => (
                        <li key={item.id} className={`navbar-item ${item.children ? (item.isMegaMenu ? 'dropdown-megamenu' : 'dropdown') : ''}`}>
                            <NavLink className={`navbar-link ${item.children ? 'dropdown-arrow' : ''}`} to={item.url}>
                                {item.label}
                            </NavLink>

                            {/* Render menu con nếu có */}
                            {item.children &&
                                (item.isMegaMenu ? (
                                    // Xử lý Mega Menu
                                    <div className="megamenu">
                                        <div className="container">
                                            <div className="row">
                                                {/* Lặp qua các cột trong mega menu */}
                                                {item.children.map((column) => (
                                                    <div className="col-lg-3" key={column.id}>
                                                        <div className="megamenu-wrap">
                                                            <h5 className="megamenu-title">{column.title}</h5>
                                                            <ul className="megamenu-list">
                                                                {column.children.map((link) => (
                                                                    <li key={link.id}>
                                                                        <Link to={link.url}>{link.label}</Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // Xử lý Dropdown thường bằng component đệ quy
                                    <SubMenu items={item.children} />
                                ))}
                        </li>
                    ))
                )}
            </ul>
        </>
    );
};

export default Navbar;
