// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';

const HeaderOptionsTab = ({ options, setOptions }) => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const handleImageUpload = async (e, fieldName) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('option_image', file);

        try {
            const response = await api.post('/api/options/upload-image', formData);
            // Cập nhật lại state options với URL ảnh mới
            setOptions((prev) => ({
                ...prev,
                [fieldName]: response.data.url,
            }));
            toast.success('Upload ảnh thành công!');
        } catch (error) {
            toast.error('Upload ảnh thất bại.');
        }
    };

    return (
        <div>
            <h6>Tùy Chỉnh Header</h6>
            <hr />
            {/* Phần Favicon */}
            <div className="mb-3">
                <label className="form-label">Favicon</label>
                <input type="file" className="form-control" onChange={(e) => handleImageUpload(e, 'site_favicon')} accept="image/png, image/jpeg, image/ico" />
                {options.site_favicon && (
                    <div className="mt-2">
                        <img src={`${API_URL}/${options.site_favicon}`} alt="Favicon Preview" style={{ width: '32px', height: '32px' }} />
                    </div>
                )}
            </div>

            {/* Phần Logo */}
            <div className="mb-3">
                <label className="form-label">Logo</label>
                <input type="file" className="form-control" onChange={(e) => handleImageUpload(e, 'site_logo')} accept="image/png, image/jpeg, image/svg+xml" />
                {options.site_logo && (
                    <div className="mt-2" style={{ background: '#f0f0f0', padding: '10px' }}>
                        <img src={`${API_URL}/${options.site_logo}`} alt="Logo Preview" style={{ maxHeight: '60px' }} />
                    </div>
                )}
            </div>

            {/* Thêm các tùy chọn khác cho Header ở đây */}
        </div>
    );
};

export default HeaderOptionsTab;
