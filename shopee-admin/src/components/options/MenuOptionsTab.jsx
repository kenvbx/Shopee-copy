// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';

const MenuOptionsTab = ({ options, setOptions }) => {
    // State nội bộ để quản lý các mục menu một cách dễ dàng
    const [menuItems, setMenuItems] = useState([]);

    // Khi component được tải, chuyển đổi chuỗi JSON từ `options` thành mảng để làm việc
    useEffect(() => {
        try {
            const parsedMenu = JSON.parse(options.main_menu || '[]');
            setMenuItems(parsedMenu);
        } catch (e) {
            setMenuItems([]);
        }
    }, [options.main_menu]);

    // Hàm cập nhật lại state `options` ở component cha mỗi khi menuItems thay đổi
    const updateParentState = (newItems) => {
        setMenuItems(newItems);
        setOptions((prev) => ({
            ...prev,
            main_menu: JSON.stringify(newItems, null, 2), // Chuyển lại thành chuỗi JSON
        }));
    };

    // Xử lý thay đổi cho input (label, url)
    const handleItemChange = (index, field, value) => {
        const newItems = [...menuItems];
        newItems[index][field] = value;
        updateParentState(newItems);
    };

    // Thêm một mục menu mới
    const handleAddItem = () => {
        const newItems = [...menuItems, { id: Date.now(), label: '', url: '' }];
        updateParentState(newItems);
    };

    // Xóa một mục menu
    const handleRemoveItem = (index) => {
        const newItems = menuItems.filter((_, i) => i !== index);
        updateParentState(newItems);
    };

    return (
        <div>
            <h6>Quản Lý Menu Chính</h6>
            <hr />
            <p className="text-muted">Thêm, xóa, hoặc sắp xếp lại các mục trong menu chính của trang web.</p>

            {menuItems.map((item, index) => (
                <div key={item.id} className="row g-3 align-items-center mb-3 p-2 border rounded">
                    <div className="col-md-4">
                        <label className="form-label">Nhãn (Label)</label>
                        <input type="text" className="form-control" placeholder="Ví dụ: Trang Chủ" value={item.label} onChange={(e) => handleItemChange(index, 'label', e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">URL</label>
                        <input type="text" className="form-control" placeholder="Ví dụ: /products" value={item.url} onChange={(e) => handleItemChange(index, 'url', e.target.value)} />
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveItem(index)}>
                            Xóa
                        </button>
                    </div>
                </div>
            ))}

            <button type="button" className="btn btn-secondary mt-3" onClick={handleAddItem}>
                + Thêm Mục Menu
            </button>
        </div>
    );
};

export default MenuOptionsTab;
