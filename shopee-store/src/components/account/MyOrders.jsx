// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import Pagination from '../common/Pagination';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchOrders = async (page) => {
            try {
                const response = await api.get(`/api/orders/my-orders?page=${page}`);
                setOrders(response.data.data);
                setPagination(response.data.pagination);
            } catch (error) {
                toast.error('Không thể tải lịch sử đơn hàng.');
            }
        };
        fetchOrders(currentPage);
    }, [currentPage]);

    return (
        <div className="my-orders">
            <h5 className="mb-4">Đơn Hàng Của Tôi</h5>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Mã Đơn</th>
                            <th>Ngày Đặt</th>
                            <th>Địa Chỉ</th>
                            <th>Tổng Tiền</th>
                            <th>Trạng Thái</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>{new Date(order.created_at).toLocaleDateString('vi-VN')}</td>
                                <td>{order.receiver_address}</td>
                                <td>{new Intl.NumberFormat('vi-VN').format(order.total)} đ</td>
                                <td>
                                    <span className="badge bg-info text-dark">{order.status}</span>
                                </td>
                                <td>
                                    <Link to={`/my-account/orders/${order.id}`} className="btn btn-sm btn-primary">
                                        Xem
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {pagination && <Pagination pagination={pagination} onPageChange={setCurrentPage} />}
        </div>
    );
};

export default MyOrders;
