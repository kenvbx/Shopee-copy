// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../components/Pagination';
import { toast } from 'react-toastify';

function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const api = axios.create({
        baseURL: 'http://localhost:3001/api',
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = async (page) => {
        try {
            const response = await api.get(`/products?page=${page}&limit=10`);
            setProducts(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Lỗi tải sản phẩm:', error);
        }
    };

    const handleDelete = async (productId) => {
        // Hiển thị hộp thoại xác nhận
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await api.delete(`/products/${productId}`);
                toast.success('Xóa sản phẩm thành công!');
                // Tải lại danh sách sản phẩm của trang hiện tại
                fetchProducts(currentPage);
            } catch (error) {
                toast.error('Xóa sản phẩm thất bại.');
                console.error('Lỗi xóa sản phẩm:', error);
            }
        }
    };

    return (
        <div className="card">
            <div className="card-header py-3">
                <div className="row align-items-center m-0">
                    <div className="col-md-3 col-12 me-auto mb-md-0 mb-3">
                        <select className="form-select">
                            <option>All category</option>
                            <option>Fashion</option>
                            <option>Electronics</option>
                            <option>Furniture</option>
                            <option>Sports</option>
                        </select>
                    </div>
                    <div className="col-md-2 col-6">
                        <input type="date" className="form-control" />
                    </div>
                    <div className="col-md-2 col-6">
                        <select className="form-select">
                            <option>Status</option>
                            <option>Active</option>
                            <option>Disabled</option>
                            <option>Show all</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table align-middle table-striped">
                        <thead>
                            <tr>
                                <th>
                                    <input className="form-check-input" type="checkbox" />
                                </th>
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>SKU</th>
                                <th>Tồn kho</th>
                                <th>Giá / Khuyến mãi</th>
                                <th>Danh mục</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" />
                                        </div>
                                    </td>
                                    <td className="productlist">
                                        <a className="d-flex align-items-center gap-2" href="#">
                                            <div className="product-box">{product.main_image ? <img src={`${API_URL}/${product.main_image}`} alt={product.name} width="50" /> : <img src="http://localhost:5174/assets/images/products/01.png" alt="placeholder" width="50" />}</div>
                                        </a>
                                    </td>
                                    <td>
                                        <Link to={`/products/edit/${product.id}`} aria-label="Sửa">
                                            <p className="mb-0 product-title">{product.name}</p>
                                        </Link>
                                        {product.status === 'inactive' && <span>- Bản nháp</span>}
                                        <div className="row-actions">
                                            <span className="edit">
                                                <Link to={`/products/edit/${product.id}`} aria-label="Sửa">
                                                    Chỉnh sửa
                                                </Link>
                                            </span>
                                            <span> | </span>
                                            <span className="delete">
                                                <a type="button" className="delete-tag aria-button-if-js" aria-label="Xóa" role="button" onClick={() => handleDelete(product.id)}>
                                                    Xóa
                                                </a>
                                            </span>
                                        </div>
                                    </td>
                                    <td>{product.sku}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <span>{Number(product.price).toLocaleString('vi-VN', { maximumFractionDigits: 0 })}</span> / <span style={{ color: 'red', fontWeight: 'bold' }}>{Number(product.sale_price).toLocaleString('vi-VN', { maximumFractionDigits: 0 })}</span>
                                    </td>

                                    <td>{product.ProductCategories?.map((cat) => cat.name).join(', ')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination pagination={pagination} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
}

export default ProductListPage;
