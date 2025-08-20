// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';

const GeneralOptionsTab = ({ options, setOptions }) => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    // Hàm chung để xử lý input text
    const handleChange = (e) => {
        setOptions((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Hàm xử lý upload ảnh
    const handleImageUpload = async (e, fieldName) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('option_image', file);

        try {
            const response = await api.post('/api/options/upload-image', formData);
            setOptions((prev) => ({ ...prev, [fieldName]: response.data.url }));
            toast.success('Upload ảnh thành công!');
        } catch (error) {
            toast.error('Upload ảnh thất bại.');
        }
    };

    return (
        <div>
            <h6>Cài Đặt Chung cho Website</h6>
            <hr />

            <div className="mb-3">
                <label className="form-label">Địa chỉ công ty</label>
                <input type="text" name="company_address" className="form-control" value={options.company_address || ''} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Số điện thoại</label>
                <input type="text" name="company_phone" className="form-control" value={options.company_phone || ''} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="company_email" className="form-control" value={options.company_email || ''} onChange={handleChange} />
            </div>
        </div>
    );
};

export default GeneralOptionsTab;
