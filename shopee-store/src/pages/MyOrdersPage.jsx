// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, NavLink } from 'react-router-dom';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';
import Pagination from '../components/common/Pagination'; // Tái sử dụng component Pagination

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const activeStatus = searchParams.get('status');

    const statusTabs = [
        { key: null, label: 'Tất cả' },
        { key: 'pending', label: 'Chờ xử lý' },
        { key: 'paid', label: 'Đã thanh toán' },
        { key: 'shipped', label: 'Đang giao' },
        { key: 'completed', label: 'Hoàn thành' },
        { key: 'cancelled', label: 'Đã hủy' },
    ];

    useEffect(() => {
        const fetchOrders = async (page) => {
            setLoading(true);
            try {
                let apiUrl = `/api/orders/my-orders?page=${page}`;
                // Thêm status vào API call nếu có
                if (activeStatus) {
                    apiUrl += `&status=${activeStatus}`;
                }
                const response = await api.get(apiUrl);
                setOrders(response.data.data);
                setPagination(response.data.pagination);
            } catch (error) {
                toast.error('Không thể tải lịch sử đơn hàng.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders(currentPage);
    }, [currentPage, activeStatus]);

    if (loading) {
        return <p>Đang tải danh sách đơn hàng...</p>;
    }

    return (
        <div className="account-content">
            <div className="account-content__header">
                <a className="">Thông tin đơn hàng</a>
                <img className="h-full w-full" loading="lazy" alt="" src="../public/images/account-content-img.png" />
            </div>
            <div className="account-content__body">
                <ul className="nav nav-tabs mb-4">
                    {statusTabs.map((tab) => (
                        <li className="nav-item" key={tab.key || 'all'}>
                            <NavLink
                                className="nav-link"
                                to={tab.key ? `/account/orders?status=${tab.key}` : '/account/orders'}
                                // React Router sẽ tự thêm class 'active' cho NavLink
                                // `end` prop đảm bảo "Tất cả" không bị active khi các tab khác active
                                end
                            >
                                {tab.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {loading ? (
                    <p>Đang tải danh sách đơn hàng...</p>
                ) : orders.length > 0 ? (
                    <>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Mã Đơn</th>
                                        <th>Ngày Đặt</th>
                                        <th>Tổng Tiền</th>
                                        <th>Trạng Thái</th>
                                        <th>Hành Động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>
                                                <strong>#{order.id}</strong>
                                            </td>
                                            <td>{new Date(order.created_at).toLocaleDateString('vi-VN')}</td>
                                            <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</td>
                                            <td>
                                                <span className="badge bg-info text-dark text-capitalize">{order.status.replace('_', ' ')}</span>
                                            </td>
                                            <td>
                                                <Link to={`/my-account/orders/${order.id}`} className="btn btn-sm btn-outline-primary">
                                                    Xem chi tiết
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {pagination && <Pagination pagination={pagination} onPageChange={setCurrentPage} />}
                    </>
                ) : (
                    <p>Bạn chưa có đơn hàng nào.</p>
                )}
            </div>
        </div>
    );
};

export default MyOrdersPage;
