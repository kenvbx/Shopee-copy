// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';

const buildCategoryHierarchy = (categories, parentId = null, level = 0) => {
    const result = [];
    // Lọc ra các danh mục con của parentId hiện tại
    const children = categories.filter((cat) => cat.parent_id === parentId);

    for (const child of children) {
        // Thêm danh mục hiện tại vào kết quả với cấp độ (level) của nó
        result.push({ ...child, level });
        // Đệ quy để tìm các con của danh mục này
        const grandChildren = buildCategoryHierarchy(categories, child.id, level + 1);
        // Nối kết quả của các cháu vào
        result.push(...grandChildren);
    }
    return result;
};

function ProductCategoryPage() {
    const [allCategoriesForSelect, setAllCategoriesForSelect] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [displayCategories, setDisplayCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // State ban đầu cho form, bao gồm tất cả các trường
    const initialState = {
        id: null,
        name: '',
        slug: '',
        parent_id: '', // Để trống cho danh mục cha
        description: '',
        sort_order: 0,
        image: '',
        icon: '',
        status: 'active',
        is_featured: false,
    };
    const [formData, setFormData] = useState(initialState);

    const api = axios.create({
        baseURL: 'http://localhost:3001/api',
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });

    useEffect(() => {
        // Sử dụng setTimeout để tạo hiệu ứng "debouncing"
        const delayDebounceFn = setTimeout(() => {
            // Khi người dùng ngừng gõ 500ms, hàm này sẽ được gọi
            fetchPaginatedCategories(1, searchTerm); // Luôn reset về trang 1 khi tìm kiếm
            if (currentPage !== 1) setCurrentPage(1);
        }, 500); // Đợi 500ms

        // Hàm dọn dẹp: Hủy timeout nếu người dùng gõ tiếp
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]); // Chỉ phụ thuộc vào searchTerm

    useEffect(() => {
        fetchPaginatedCategories(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    useEffect(() => {
        const fetchAllForSelect = async () => {
            const response = await api.get('/product-categories?limit=1000'); // Lấy số lượng lớn
            const hierarchicalList = buildCategoryHierarchy(response.data.data);
            setAllCategoriesForSelect(hierarchicalList);
        };
        fetchAllForSelect();
    }, []);

    useEffect(() => {
        const hierarchicalList = buildCategoryHierarchy(categories);
        setDisplayCategories(hierarchicalList);
    }, [categories]);

    const fetchPaginatedCategories = async (page, search = '') => {
        try {
            const response = await api.get(
                `/product-categories?page=${page}&limit=10&search=${search}`
            );
            const isSearching = search.trim() !== '';
            const finalData = isSearching
                ? response.data.data
                : buildCategoryHierarchy(response.data.data);
            setDisplayCategories(finalData);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Lỗi tải danh mục:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Xử lý riêng cho checkbox
        const finalValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: finalValue });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // Tạo URL tạm thời để xem trước
            const filePreviewUrl = URL.createObjectURL(file);
            setPreviewUrl(filePreviewUrl);
        }
    };

    // Xử lý việc submit form (tạo mới hoặc cập nhật)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let savedCategory;
            // BƯỚC 1: Tạo/Cập nhật dữ liệu text
            if (isEditing) {
                const response = await api.put(`/product-categories/${formData.id}`, formData);
                savedCategory = response.data;
            } else {
                const response = await api.post('/product-categories', formData);
                savedCategory = response.data;
            }

            // BƯỚC 2: Nếu có file ảnh, upload ảnh sau khi đã có ID
            if (imageFile) {
                const uploadData = new FormData();
                uploadData.append('image', imageFile);
                await api.post(`/product-categories/${savedCategory.id}/upload-image`, uploadData);
            }

            resetForm();
            fetchPaginatedCategories(currentPage);
        } catch (error) {
            console.error('Lỗi khi lưu danh mục:', error);
            alert('Đã có lỗi xảy ra.');
        }
    };

    const handleEdit = (category) => {
        setIsEditing(true);
        // Đảm bảo tất cả các trường được điền vào form khi sửa
        setFormData({
            id: category.id,
            name: category.name || '',
            slug: category.slug || '',
            parent_id: category.parent_id || '',
            description: category.description || '',
            sort_order: category.sort_order || 0,
            image: category.image || '',
            icon: category.icon || '',
            status: category.status || 'active',
            is_featured: category.is_featured || false,
        });
    };

    // Xóa danh mục
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
            await api.delete(`/product-categories/${id}`);
            fetchPaginatedCategories();
        }
    };

    // Reset form về trạng thái ban đầu
    const resetForm = () => {
        setIsEditing(false);
        setFormData(initialState);
        setImageFile(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl); // Giải phóng bộ nhớ của URL xem trước
            setPreviewUrl(null);
        }
    };

    return (
        <div className="card">
            <div className="card-header py-3">
                <h6 className="mb-0">Danh Mục Sản Phẩm</h6>
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
                                            placeholder="Tên danh mục"
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
                                            placeholder="Slug (để trống sẽ tự tạo)"
                                            value={formData.slug}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Danh mục cha</label>
                                        <select
                                            className="form-select"
                                            name="parent_id"
                                            value={formData.parent_id || ''}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">-- Là danh mục cha --</option>
                                            {allCategoriesForSelect.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {'— '.repeat(cat.level)}
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Thứ tự sắp xếp</label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="sort_order"
                                            placeholder="Thứ tự sắp xếp"
                                            value={formData.sort_order}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Hình đại diện</label>
                                        <input
                                            className="form-control"
                                            type="file"
                                            name="image"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                        />

                                        {/* Khu vực xem trước */}
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="Xem trước" width="300" />
                                        ) : isEditing && formData.image ? (
                                            <img
                                                src={`http://localhost:3001/${formData.image}`}
                                                alt="Ảnh hiện tại"
                                                width="300"
                                            />
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Icon</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="icon"
                                            placeholder="Class icon hoặc URL"
                                            value={formData.icon}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Mô tả</label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            rows={3}
                                            cols={3}
                                            placeholder="Mô tả"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Trạng thái</label>
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
                                        <input
                                            className="form-check-input"
                                            id="isFeatured"
                                            type="checkbox"
                                            name="is_featured"
                                            checked={formData.is_featured}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label ml-1" for="isFeatured">
                                            Nổi bật?
                                        </label>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex">
                                            <button className="btn btn-primary" type="submit">
                                                {isEditing ? 'Cập Nhật' : 'Thêm Mới'}
                                            </button>
                                            {isEditing && (
                                                <button type="button" onClick={resetForm}>
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
                            <div className="card-header row">
                                <div className="col-12 col-lg-8"></div>
                                <div className="col-12 col-lg-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tìm theo tên..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
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
                                                <th>Tên</th>
                                                <th>Đường dẫn</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayCategories.map((cat) => (
                                                <tr key={cat.id}>
                                                    <td>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                        />
                                                    </td>
                                                    <td
                                                        style={{
                                                            paddingLeft: `${cat.level * 25}px`,
                                                        }}
                                                    >
                                                        {cat.level > 0 && '— '}
                                                        {cat.name}
                                                    </td>
                                                    <td>{cat.slug}</td>
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
                                                                onClick={() => handleEdit(cat)}
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
                                                                href=""
                                                                onClick={() => handleDelete(cat.id)}
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

export default ProductCategoryPage;
