// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';

function AttributeValuesPage() {
    const { attributeId } = useParams();
    const [attribute, setAttribute] = useState(null);
    const [values, setValues] = useState([]);

    const initialState = { value: '', slug: '', description: '' };
    const [formData, setFormData] = useState(initialState);
    const [editingValueId, setEditingValueId] = useState(null);

    useEffect(() => {
        fetchAttributeDetails();
    }, [attributeId]);

    const fetchAttributeDetails = async () => {
        try {
            const response = await api.get(`/api/attributes/${attributeId}`);
            setAttribute(response.data);
            setValues(response.data.values || []);
        } catch (error) {
            toast.error('Lỗi khi tải dữ liệu thuộc tính.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = (value) => {
        setEditingValueId(value.id);
        setFormData({
            value: value.value,
            slug: value.slug || '',
            description: value.description || '',
        });
    };

    const handleCancelEdit = () => {
        setEditingValueId(null);
        setFormData(initialState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.value || !formData.value.trim()) {
            toast.warn('Tên giá trị không được để trống.');
            return;
        }

        try {
            if (editingValueId) {
                await api.put(`/api/attributes/values/${editingValueId}`, formData);
                toast.success('Cập nhật giá trị thành công!');
            } else {
                await api.post(`/api/attributes/${attributeId}/values`, formData);
                toast.success('Thêm giá trị thành công!');
            }
            handleCancelEdit();
            fetchAttributeDetails();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra.');
        }
    };

    const handleDeleteValue = async (valueId) => {
        if (window.confirm('Bạn có chắc muốn xóa giá trị này?')) {
            try {
                await api.delete(`/api/attributes/values/${valueId}`);
                fetchAttributeDetails();
                toast.success('Xóa giá trị thành công!');
            } catch (error) {
                toast.error('Xóa giá trị thất bại.');
            }
        }
    };

    if (!attribute) return <p>Đang tải...</p>;

    return (
        <>
            <div className="card">
                <div className="card-header py-3">
                    <h6 className="mb-0">Cấu hình giá trị cho: {attribute.name}</h6>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 col-lg-4 d-flex">
                            <div className="card border shadow-none w-100">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit} className="row g-3">
                                        <div className="col-12">
                                            <label className="form-label">Tên</label>
                                            <input type="text" className="form-control" name="value" value={formData.value} onChange={handleInputChange} />
                                            <small>Tên là cách nó xuất hiện trên trang web của bạn.</small>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Đường dẫn</label>
                                            <input type="text" className="form-control" name="slug" value={formData.slug} onChange={handleInputChange} placeholder="Để trống sẽ tự tạo" />
                                            <small>“slug” là đường dẫn thân thiện của tên. Nó thường chỉ bao gồm kí tự viết thường, số và dấu gạch ngang, không dùng tiếng Việt.</small>
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label">Mô tả</label>
                                            <textarea className="form-control" rows={3} cols={3} name="description" value={formData.description} onChange={handleInputChange} />
                                            <small>Thông thường mô tả này không được sử dụng trong các giao diện, tuy nhiên có vài giao diện có thể hiển thị mô tả này.</small>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button type="submit" className="btn btn-primary">
                                                    {editingValueId ? 'Lưu Thay Đổi' : 'Thêm'}
                                                </button>
                                                {editingValueId && (
                                                    <button type="button" className="btn btn-secondary ms-2" onClick={handleCancelEdit}>
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
                                                    <th>Mô tả</th>
                                                    <th>Đường dẫn</th>
                                                    <th>Count</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {values.map((val) => (
                                                    <tr key={val.id}>
                                                        <td>
                                                            {val.value}
                                                            <div className="row-actions">
                                                                <span className="edit">
                                                                    <a type="button" aria-label="Sửa" onClick={() => handleEdit(val)}>
                                                                        Chỉnh sửa
                                                                    </a>
                                                                </span>
                                                                <span> | </span>
                                                                <span className="delete">
                                                                    <a type="button" className="delete-tag aria-button-if-js" aria-label="Xóa" role="button" onClick={() => handleDeleteValue(val.id)}>
                                                                        Xóa
                                                                    </a>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>{val.description}</td>
                                                        <td>{val.slug}</td>
                                                        <td>0</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <nav className="float-end mt-0" aria-label="Page navigation">
                                        <ul className="pagination">
                                            <li className="page-item disabled">
                                                <a className="page-link" href="#">
                                                    Previous
                                                </a>
                                            </li>
                                            <li className="page-item active">
                                                <a className="page-link" href="#">
                                                    1
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">
                                                    2
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">
                                                    3
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">
                                                    Next
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AttributeValuesPage;
