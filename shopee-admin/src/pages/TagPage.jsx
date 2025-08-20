// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';
import Pagination from '../components/Pagination';

function TagPage() {
    const [tags, setTags] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '', description: '', status: 'active' });

    useEffect(() => {
        fetchTags(currentPage);
    }, [currentPage]);

    const fetchTags = async (page) => {
        try {
            const response = await api.get(`/api/tags?page=${page}&limit=10`);
            setTags(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            toast.error('Lỗi khi tải danh sách thẻ.');
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setIsEditing(false);
        setFormData({ id: null, name: '', description: '', status: 'active' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/api/tags/${formData.id}`, formData);
                toast.success('Cập nhật thẻ thành công!');
            } else {
                await api.post('/api/tags', formData);
                toast.success('Thêm thẻ mới thành công!');
            }
            resetForm();
            fetchTags(1); // Quay về trang đầu tiên
        } catch (error) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra.');
        }
    };

    const handleEdit = (tag) => {
        setIsEditing(true);
        setFormData(tag);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa thẻ này?')) {
            await api.delete(`/api/tags/${id}`);
            toast.success('Xóa thẻ thành công!');
            fetchTags(currentPage);
        }
    };

    return (
        <div className="card">
            <div className="card-header py-3">
                <h6 className="mb-0">{isEditing ? 'Sửa Thẻ' : 'Thêm Thẻ Mới'}</h6>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-12 col-lg-4 d-flex">
                        <div className="card border shadow-none w-100">
                            <div className="card-body">
                                <form onSubmit={handleSubmit} className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label">Tên</label>
                                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Đường dẫn</label>
                                        <input type="text" className="form-control" name="slug" value={formData.slug} onChange={handleInputChange} />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Mô tả</label>
                                        <textarea className="form-control" name="description" rows="3" value={formData.description} onChange={handleInputChange}></textarea>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Tình trạng</label>
                                        <select className="form-select" name="status" value={formData.status} onChange={handleInputChange}>
                                            <option value="active">Hoạt động</option>
                                            <option value="inactive">Không hoạt động</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex">
                                            <button type="submit" className="btn btn-primary">
                                                {isEditing ? 'Cập Nhật' : 'Thêm Mới'}
                                            </button>
                                            {isEditing && (
                                                <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
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
                                                <th>
                                                    <input className="form-check-input" type="checkbox" />
                                                </th>
                                                <th>Tên</th>
                                                <th>Mô tả</th>
                                                <th>Đường dẫn</th>
                                                <th>Lượt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tags.map((tag) => (
                                                <tr key={tag.id}>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" />
                                                    </td>
                                                    <td>
                                                        {tag.name}
                                                        <div className="row-actions">
                                                            <span className="edit">
                                                                <a type="button" onClick={() => handleEdit(tag)} aria-label="Sửa">
                                                                    Chỉnh sửa
                                                                </a>
                                                            </span>
                                                            <span> | </span>
                                                            <span className="delete">
                                                                <a type="button" className="delete-tag aria-button-if-js" aria-label="Xóa" role="button" onClick={() => handleDelete(tag.id)}>
                                                                    Xóa
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>{tag.description}</td>
                                                    <td>{tag.slug}</td>
                                                    <td>{tag.product_count || 0}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination pagination={pagination} onPageChange={setCurrentPage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TagPage;
