// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';

const MyNotifiesPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await api.get('/api/notifications/my-notifications');
            setNotifications(response.data);
        } catch (error) {
            toast.error('Không thể tải thông báo.');
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (notificationId) => {
        try {
            await api.put(`/api/notifications/${notificationId}/read`);
            // Cập nhật lại trạng thái trên giao diện mà không cần gọi lại API
            setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, status: 'read' } : n)));
        } catch (error) {
            toast.error('Đánh dấu đã đọc thất bại.');
        }
    };

    if (loading) {
        return <p>Đang tải thông báo...</p>;
    }

    return (
        <div className="account-content">
            <div className="account-content__header">
                <a className="">Thông báo</a>
                <img className="h-full w-full" loading="lazy" alt="" src="../public/images/account-content-img.png" />
            </div>
            <div className="account-content__body">
                {notifications.length > 0 ? (
                    <ul className="list-group">
                        {notifications.map((noti) => (
                            <li key={noti.id} className={`list-group-item d-flex justify-content-between align-items-start ${noti.status === 'unread' ? 'list-group-item-light' : ''}`}>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{noti.title}</div>
                                    {noti.content}
                                    <div className="text-muted small mt-2">{new Date(noti.sent_at).toLocaleString('vi-VN')}</div>
                                </div>
                                {noti.status === 'unread' && (
                                    <button className="btn btn-sm btn-link" onClick={() => handleMarkAsRead(noti.id)}>
                                        Đánh dấu đã đọc
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Bạn không có thông báo nào.</p>
                )}
            </div>
        </div>
    );
};

export default MyNotifiesPage;
