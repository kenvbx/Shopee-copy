// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function BannerFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [formData, setFormData] = useState({
        title: '',
        link_url: '',
        position: 'homepage',
        status: 'active',
        sort_order: 0,
        start_date: null,
        end_date: null,
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            api.get(`/api/banners/${id}`).then((res) => {
                // Chuyển đổi chuỗi ngày tháng từ CSDL thành đối tượng Date
                setFormData({
                    ...res.data,
                    start_date: res.data.start_date ? new Date(res.data.start_date) : null,
                    end_date: res.data.end_date ? new Date(res.data.end_date) : null,
                });
            });
        }
    }, [id, isEditMode]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleDateChange = (date, fieldName) => setFormData({ ...formData, [fieldName]: date });
    const handleFileChange = (e) => setImageFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        for (const key in formData) {
            if (formData[key] !== null && formData[key] !== '') {
                // Chuyển đối tượng Date thành chuỗi ISO để backend xử lý
                if (key === 'start_date' || key === 'end_date') {
                    data.append(key, formData[key].toISOString());
                } else {
                    data.append(key, formData[key]);
                }
            }
        }

        if (imageFile) {
            data.append('image', imageFile);
        }

        try {
            if (isEditMode) {
                await api.put(`/api/banners/${id}`, data);
                toast.success('Cập nhật banner thành công!');
            } else {
                await api.post('/api/banners', data);
                toast.success('Tạo banner mới thành công!');
            }
            navigate('/banners');
        } catch (error) {
            toast.error('Có lỗi xảy ra.');
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5>{isEditMode ? 'Sửa Banner' : 'Thêm Banner Mới'}</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Tiêu đề</label>
                        <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label>Ảnh Banner</label>
                        <input type="file" className="form-control" onChange={handleFileChange} />
                    </div>
                    <div className="mb-3">
                        <label>Đường dẫn (Link)</label>
                        <input type="text" name="link_url" className="form-control" value={formData.link_url} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label>Vị trí</label>
                        <select name="position" className="form-select" value={formData.position} onChange={handleChange}>
                            <option value="homepage">Trang chủ</option>
                            <option value="category">Danh mục</option>
                            <option value="under_slider">Dưới slider chính</option>
                            <option value="promo_main">promo_main</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label>Trạng thái</label>
                        <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label>Thứ tự sắp xếp</label>
                        <input type="number" name="sort_order" className="form-control" value={formData.sort_order} onChange={handleChange} />
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Ngày bắt đầu</label>
                            <DatePicker selected={formData.start_date} onChange={(date) => handleDateChange(date, 'start_date')} className="form-control" dateFormat="yyyy-MM-dd" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Ngày kết thúc</label>
                            <DatePicker selected={formData.end_date} onChange={(date) => handleDateChange(date, 'end_date')} className="form-control" dateFormat="yyyy-MM-dd" />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        {isEditMode ? 'Lưu Thay Đổi' : 'Tạo Mới'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BannerFormPage;
