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

const SubscriberListPage = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchSubscribers(currentPage);
    }, [currentPage]);

    const fetchSubscribers = async (page) => {
        try {
            const response = await api.get(`/api/subscribers?page=${page}`);
            setSubscribers(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            toast.error('Không thể tải danh sách người đăng ký.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa email này?')) {
            try {
                await api.delete(`/api/subscribers/${id}`);
                toast.success('Xóa thành công!');
                fetchSubscribers(currentPage);
            } catch (error) {
                toast.error('Xóa thất bại.');
            }
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5>Danh Sách Đăng Ký Nhận Tin</h5>
            </div>
            <div className="card-body">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Trạng thái</th>
                            <th>Ngày đăng ký</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers.map((sub) => (
                            <tr key={sub.id}>
                                <td>{sub.id}</td>
                                <td>{sub.email}</td>
                                <td>
                                    <span className={`badge bg-${sub.status === 'subscribed' ? 'success' : 'secondary'}`}>{sub.status}</span>
                                </td>
                                <td>{new Date(sub.created_at).toLocaleDateString('vi-VN')}</td>
                                <td>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(sub.id)}>
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
};

export default SubscriberListPage;
