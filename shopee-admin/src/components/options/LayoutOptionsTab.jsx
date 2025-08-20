// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';

// Component này nhận `options` và `handleChange` từ component cha
const LayoutOptionsTab = ({ options, handleChange }) => {
    return (
        <div>
            <h6>Tùy chỉnh Layout và Màu sắc</h6>
            <hr />
            <div className="mb-3">
                <label className="form-label">Màu chủ đạo (Primary Color)</label>
                <input type="color" className="form-control form-control-color" name="primary_color" value={options.primary_color || '#007bff'} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label className="form-label">Font chữ chính</label>
                <input type="text" className="form-control" name="body_font" value={options.body_font || ''} onChange={handleChange} placeholder="Ví dụ: Arial, sans-serif" />
            </div>
            {/* Thêm các tùy chọn khác cho layout ở đây */}
        </div>
    );
};

export default LayoutOptionsTab;
