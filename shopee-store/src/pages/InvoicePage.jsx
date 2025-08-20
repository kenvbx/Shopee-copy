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

const InvoicePage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await api.get(`/api/orders/my-orders/${orderId}`);
                setOrder(response.data);
            } catch (error) {
                toast.error('Không thể tải chi tiết đơn hàng.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [orderId]);

    if (loading) {
        return <div className="container py-5">Đang tải thông tin hóa đơn...</div>;
    }

    if (!order) {
        return (
            <div className="account-content">
                <div className="account-content__header">
                    <a className="">Danh sách hóa đơn</a>
                    <img className="h-full w-full" loading="lazy" alt="" src="../public/images/account-content-img.png" />
                </div>
                <div className="account-content__body">Không tìm thấy thông tin hóa đơn.</div>
            </div>
        );
    }

    return (
        <div className="account-content">
            <div className="account-content__header">
                <a className="">Danh sách hóa đơn</a>
                <img className="h-full w-full" loading="lazy" alt="" src="../public/images/account-content-img.png" />
            </div>
            <div className="account-content__body">
                <div className="row mb-4">
                    <div className="col-md-6">
                        <h5>Thông tin giao hàng:</h5>
                        <p className="mb-1">
                            <strong>Người nhận:</strong> {order.receiver_name}
                        </p>
                        <p className="mb-1">
                            <strong>Điện thoại:</strong> {order.receiver_phone}
                        </p>
                        <p className="mb-1">
                            <strong>Địa chỉ:</strong> {order.receiver_address}
                        </p>
                    </div>
                </div>

                <h5>Chi tiết sản phẩm:</h5>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.OrderItems.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <Link to={`/product/${item.Product.slug}`}>{item.product_name}</Link>
                                </td>
                                <td>{new Intl.NumberFormat('vi-VN').format(item.price)} đ</td>
                                <td>{item.quantity}</td>
                                <td>{new Intl.NumberFormat('vi-VN').format(item.price * item.quantity)} đ</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3" className="text-end">
                                <strong>Tổng cộng:</strong>
                            </td>
                            <td>
                                <strong>{new Intl.NumberFormat('vi-VN').format(order.total)} đ</strong>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default InvoicePage;
