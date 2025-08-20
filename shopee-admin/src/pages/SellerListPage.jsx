// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';
import Pagination from '../components/Pagination';

function SellerListPage() {
    const [sellers, setSellers] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchSellers(currentPage);
    }, [currentPage]);

    const fetchSellers = async (page) => {
        try {
            const response = await api.get(`/api/sellers?page=${page}&limit=10`);
            setSellers(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            toast.error('Lỗi khi tải danh sách nhà bán hàng.');
        }
    };

    const handleDelete = async (sellerId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa nhà bán hàng này?')) {
            try {
                await api.delete(`/api/sellers/${sellerId}`);
                toast.success('Xóa nhà bán hàng thành công!');
                fetchSellers(currentPage);
            } catch (error) {
                toast.error('Xóa nhà bán hàng thất bại.');
            }
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                    <h5 className="mb-0">Quản Lý Nhà Bán Hàng</h5>
                    <div className="ms-auto">
                        <Link to="/sellers/add" className="btn btn-primary">
                            Thêm Nhà Bán Hàng
                        </Link>
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên Cửa Hàng</th>
                            <th>Tài Khoản User</th>
                            <th>Email</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map((seller) => (
                            <tr key={seller.id}>
                                <td>{seller.id}</td>
                                <td>{seller.name}</td>
                                <td>{seller.User?.name || '(Chưa liên kết)'}</td>
                                <td>{seller.email}</td>
                                <td>
                                    <span className={`badge bg-${seller.status === 'active' ? 'success' : 'warning'}`}>{seller.status}</span>
                                </td>
                                <td>
                                    <Link to={`/sellers/edit/${seller.id}`} className="btn btn-sm btn-warning">
                                        Sửa
                                    </Link>
                                    <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDelete(seller.id)}>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination pagination={pagination} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
}

export default SellerListPage;
