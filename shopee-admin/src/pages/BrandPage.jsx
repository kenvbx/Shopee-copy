// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';

// Hàm xây dựng cây phân cấp (tái sử dụng)
const buildHierarchy = (items, parentId = null, level = 0) => {
    const result = [];
    const children = items.filter((item) => item.parent_id === parentId);
    for (const child of children) {
        result.push({ ...child, level });
        const grandChildren = buildHierarchy(items, child.id, level + 1);
        result.push(...grandChildren);
    }
    return result;
};

function BrandPage() {
    const [brands, setBrands] = useState([]);
    const [displayBrands, setDisplayBrands] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const initialState = {
        id: null,
        name: '',
        slug: '',
        parent_id: '',
        description: '',
        logo_url: '',
        status: 'active',
    };
    const [formData, setFormData] = useState(initialState);

    const [logoFile, setLogoFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const api = axios.create({
        baseURL: 'http://localhost:3001/api',
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });

    useEffect(() => {
        fetchBrands(currentPage);
    }, [currentPage]);

    useEffect(() => {
        setDisplayBrands(buildHierarchy(brands));
    }, [brands]);

    const fetchBrands = async (page) => {
        try {
            const response = await api.get(`/brands?page=${page}&limit=10`);
            setBrands(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Lỗi tải thương hiệu:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let savedBrand;
            if (isEditing) {
                const response = await api.put(`/brands/${formData.id}`, formData);
                savedBrand = response.data;
            } else {
                const response = await api.post('/brands', formData);
                savedBrand = response.data;
            }

            if (logoFile) {
                const uploadData = new FormData();
                uploadData.append('logo', logoFile);
                await api.post(`/brands/${savedBrand.id}/upload-logo`, uploadData);
            }

            resetForm();
            fetchBrands(currentPage);
        } catch (error) {
            console.error('Lỗi khi lưu thương hiệu:', error);
            alert('Đã có lỗi xảy ra.');
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setFormData(initialState);
        setLogoFile(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
    };

    const handleEdit = (brand) => {
        setIsEditing(true);
        setFormData({
            id: brand.id,
            name: brand.name || '',
            slug: brand.slug || '',
            parent_id: brand.parent_id || '',
            description: brand.description || '',
            logo_url: brand.logo_url || '',
            status: brand.status || 'active',
        });
        setPreviewUrl(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
            await api.delete(`/brands/${id}`);
            fetchBrands();
        }
    };

    return (
        <div className="card">
            <div className="card-header py-3">
                <h6 className="mb-0">Quản Lý Thương Hiệu</h6>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-12 col-lg-4 d-flex">
                        <div className="card border shadow-none w-100">
                            <div className="card-body">
                                <form onSubmit={handleSubmit} className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label">Tên</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            placeholder="Tên thương hiệu"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Đường dẫn</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="slug"
                                            placeholder="Đường dẫn"
                                            value={formData.slug}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Thương hiệu cha</label>
                                        <select
                                            className="form-select"
                                            name="parent_id"
                                            value={formData.parent_id || ''}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">-- Thương hiệu cha --</option>
                                            {displayBrands
                                                .filter((b) => b.id !== formData.id)
                                                .map((b) => (
                                                    <option key={b.id} value={b.id}>
                                                        {'— '.repeat(b.level)}
                                                        {b.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Mô tả</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            rows={3}
                                            cols={3}
                                            placeholder="Mô tả"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Logo</label>
                                        <input
                                            className="form-control"
                                            type="file"
                                            name="logo"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                        />
                                        <p></p>
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="Xem trước" width="300" />
                                        ) : isEditing && formData.logo_url ? (
                                            <img
                                                src={`${API_URL}/${formData.logo_url}`}
                                                alt="Logo hiện tại"
                                                width="100"
                                            />
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Tình trạng</label>
                                        <select
                                            className="form-select"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                        >
                                            <option value="active">Hoạt động</option>
                                            <option value="inactive">Không hoạt động</option>
                                        </select>
                                    </div>

                                    <div className="col-12">
                                        <div className="d-flex">
                                            <button className="btn btn-primary" type="submit">
                                                {isEditing ? 'Cập Nhật' : 'Thêm Mới'}
                                            </button>
                                            {isEditing && (
                                                <button
                                                    className="btn btn-primary"
                                                    type="button"
                                                    onClick={resetForm}
                                                >
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
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                    />
                                                </th>
                                                <th>ID</th>
                                                <th>Logo</th>
                                                <th>Tên</th>
                                                <th>Đường dẫn</th>
                                                <th>Trạng thái</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {brands.map((brand) => (
                                                <tr key={brand.id}>
                                                    <td>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                        />
                                                    </td>
                                                    <td>{brand.id}</td>
                                                    <td>
                                                        {brand.logo_url && (
                                                            <img
                                                                src={`${API_URL}/${brand.logo_url}`}
                                                                alt={brand.name}
                                                                width="50"
                                                            />
                                                        )}
                                                    </td>
                                                    <td
                                                        style={{
                                                            paddingLeft: `${brand.level * 25}px`,
                                                        }}
                                                    >
                                                        {brand.level > 0 && '— '}
                                                        {brand.name}
                                                    </td>
                                                    <td>{brand.slug}</td>
                                                    <td>{brand.status}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-3 fs-6">
                                                            <a
                                                                href="javascript:;"
                                                                className="text-primary"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="bottom"
                                                                title=""
                                                                data-bs-original-title="View detail"
                                                                aria-label="Views"
                                                            >
                                                                <i className="bi bi-eye-fill" />
                                                            </a>
                                                            <a
                                                                type="button"
                                                                onClick={() => handleEdit(brand)}
                                                                className="text-warning"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="bottom"
                                                                title=""
                                                                data-bs-original-title="Edit info"
                                                                aria-label="Edit"
                                                            >
                                                                <i className="bi bi-pencil-fill" />
                                                            </a>
                                                            <a
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDelete(brand.id)
                                                                }
                                                                className="text-danger"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="bottom"
                                                                title=""
                                                                data-bs-original-title="Delete"
                                                                aria-label="Delete"
                                                            >
                                                                <i className="bi bi-trash-fill" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination
                                    pagination={pagination}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BrandPage;
