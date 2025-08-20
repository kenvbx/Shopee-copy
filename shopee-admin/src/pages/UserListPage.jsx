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

function UserListPage() {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    // ... logic cho search (tương tự trang Category)

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const fetchUsers = async (page) => {
        try {
            const response = await api.get(`/api/users?page=${page}&limit=10`);
            setUsers(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            toast.error('Lỗi khi tải danh sách người dùng.');
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
            await api.delete(`/api/users/${userId}`);
            toast.success('Xóa người dùng thành công!');
            fetchUsers(currentPage);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <h5 className="mb-0">Quản Lý Người Dùng</h5>
                    <form className="ms-auto position-relative">
                        <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                            <i className="bi bi-search" />
                        </div>
                        <input className="form-control ps-5" type="text" placeholder="search" />
                    </form>
                </div>
                <div className="table-responsive mt-3">
                    <table className="table align-middle">
                        <thead className="table-secondary">
                            <tr>
                                <th>
                                    <input className="form-check-input" type="checkbox" />
                                </th>
                                <th>Tên người dùng</th>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>Vai trò</th>
                                <th>Tình trạng</th>
                                <th>Đăng nhập gần nhất</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <input className="form-check-input" type="checkbox" />
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center gap-3 cursor-pointer">
                                            <img src="assets/images/avatars/avatar-1.png" className="rounded-circle" width={44} height={44} alt={user.name} />
                                            <div className="">
                                                <p className="mb-0">{user.username}</p>
                                                <div className="row-actions">
                                                    <span className="edit">
                                                        <Link Link to={`/users/edit/${user.id}`} aria-label="Sửa">
                                                            Chỉnh sửa
                                                        </Link>
                                                    </span>
                                                    <span> | </span>
                                                    <span className="delete">
                                                        <a type="button" className="delete-tag aria-button-if-js" aria-label="Xóa" role="button" onClick={() => handleDelete(user.id)}>
                                                            Xóa
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.status}</td>
                                    <td>{user.last_login ? new Date(user.last_login).toLocaleString('vi-VN') : 'Chưa đăng nhập'}</td>
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

export default UserListPage;
