// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function AttributePage() {
    const [attributes, setAttributes] = useState([]);

    const initialState = { name: '', enable_archives: false, default_sort_order: 'custom', swatch_size: 'default', show_label: false };

    const [formData, setFormData] = useState(initialState);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchAttributes();
    }, []);

    const fetchAttributes = async () => {
        try {
            // Lấy tất cả thuộc tính và các giá trị của chúng
            const response = await api.get('/api/attributes');
            setAttributes(response.data);
        } catch (error) {
            console.log(error);
            toast.error('Lỗi tải thuộc tính.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleEdit = (attribute) => {
        setEditingId(attribute.id);
        setFormData({
            name: attribute.name,
            enable_archives: attribute.enable_archives,
            default_sort_order: attribute.default_sort_order,
            swatch_size: attribute.swatch_size,
            show_label: attribute.show_label,
        });
    };

    // Hủy sửa
    const handleCancelEdit = () => {
        setEditingId(null); // Reset ID
        setFormData(initialState); // Reset form về trạng thái ban đầu
    };

    const handleDelete = async (attributeId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa thuộc tính này? Mọi giá trị con cũng sẽ bị xóa.')) {
            try {
                await api.delete(`/api/attributes/${attributeId}`);
                toast.success('Xóa thuộc tính thành công!');
                fetchAttributes(); // Tải lại danh sách
            } catch (error) {
                console.log(error);
                toast.error('Xóa thuộc tính thất bại.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name) {
            toast.warn('Vui lòng nhập tên thuộc tính.');
            return;
        }

        try {
            if (editingId) {
                await api.put(`/api/attributes/${editingId}`, formData);
                toast.success('Cập nhật thuộc tính thành công!');
            } else {
                await api.post('/api/attributes', formData);
                toast.success('Thêm thuộc tính thành công!');
            }
            handleCancelEdit();
            fetchAttributes();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra.');
        }
    };

    return (
        <>
            <div className="card">
                <div className="card-header py-3">
                    <h6 className="mb-0">Quản lý thuộc tính</h6>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 col-lg-4 d-flex">
                            <div className="card border shadow-none w-100">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit} className="row g-3">
                                        <small>Thuộc tính cho phép bạn xác định dữ liệu sản phẩm bổ sung, chẳng hạn như kích thước hoặc màu sắc. Bạn có thể sử dụng các thuộc tính này trong thanh bên của cửa hàng bằng cách sử dụng các widget "điều hướng phân lớp".</small>
                                        <div className="col-12">
                                            <label className="form-label">Tên</label>
                                            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} />
                                            <small>Tên cho thuộc tính (hiển thị ở giao diện người dùng).</small>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name="enable_archives" id="enableArchives" checked={formData.enable_archives} onChange={handleInputChange} />
                                                <label className="form-check-label" htmlFor="enableArchives">
                                                    Cho phép lưu trữ?
                                                </label>
                                            </div>
                                            <small>Bật tùy chọn này nếu bạn muốn thuộc tính này có các trang lưu trữ sản phẩm trong cửa hàng của bạn.</small>
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label">Thứ tự sắp xếp mặc định</label>
                                            <select className="form-select form-select-sm" name="default_sort_order" value={formData.default_sort_order} onChange={handleInputChange}>
                                                <option value="custom">Tuỳ chỉnh sắp xếp</option>
                                                <option value="name">Tên</option>
                                                <option value="name_numeric">Tên (bằng số)</option>
                                                <option value="id">ID Tên chủng loại</option>
                                            </select>
                                            <small>Xác định thứ tự sắp xếp của các thuật ngữ trên các trang sản phẩm của cửa hàng ở giao diện người dùng. Nếu sử dụng thứ tự tùy chỉnh, bạn có thể kéo và thả các thuật ngữ trong thuộc tính này.</small>
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label">Attributes swatch size</label>
                                            <select className="form-select form-select-sm" name="swatch_size" value={formData.swatch_size} onChange={handleInputChange}>
                                                <option value="default">Default</option>
                                                <option value="large">Large</option>
                                                <option value="extra_large">Extra large</option>
                                            </select>
                                            <small>If you will set color or images swatches for terms of this attribute.</small>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name="show_label" id="showLabel" checked={formData.show_label} onChange={handleInputChange} />
                                                <label className="form-check-label" htmlFor="showLabel">
                                                    Show attribute label on products
                                                </label>
                                            </div>
                                            <small>Enable this if you want to show this attribute label on products in your store.</small>
                                        </div>

                                        <div className="col-12">
                                            <div className="d-flex">
                                                <button className="btn btn-primary" onClick={handleSubmit}>
                                                    {editingId ? 'Lưu Thay Đổi' : 'Thêm Thuộc Tính'}
                                                </button>
                                                {/* Nút Hủy chỉ hiện khi đang sửa */}
                                                {editingId && (
                                                    <button className="btn btn-secondary ms-2" onClick={handleCancelEdit}>
                                                        Hủy
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-8 d-flex">
                            <div className="card border shadow-none w-100">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table align-middle">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Tên</th>
                                                    <th>Đường dẫn tĩnh</th>
                                                    <th>Sắp xếp theo</th>
                                                    <th>Tên chủng loại</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {attributes.map((attr) => (
                                                    <tr key={attr.id}>
                                                        <td>
                                                            {attr.name}
                                                            <div className="row-actions">
                                                                <span className="edit">
                                                                    <a type="button" aria-label="Sửa" onClick={() => handleEdit(attr)}>
                                                                        Chỉnh sửa
                                                                    </a>
                                                                </span>
                                                                <span> | </span>
                                                                <span className="delete">
                                                                    <a type="button" className="delete-tag aria-button-if-js" aria-label="Xóa" role="button" onClick={() => handleDelete(attr.id)}>
                                                                        Xóa
                                                                    </a>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>{attr.slug}</td>
                                                        <td>{attr.default_sort_order}</td>
                                                        <td>
                                                            {attr.values.length > 0 ? (
                                                                <ul className="custom_value">
                                                                    {attr.values.map((val) => (
                                                                        <li key={val.id}>{val.value}</li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <p>Chưa có giá trị nào.</p>
                                                            )}
                                                            <Link to={`/attributes/${attr.id}/values`} className="">
                                                                Cấu hình giá trị
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AttributePage;
