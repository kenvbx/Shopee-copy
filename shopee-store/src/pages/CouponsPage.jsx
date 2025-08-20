// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';

const CouponsPage = () => {
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await api.get('/api/vouchers/my-vouchers');
                setVouchers(response.data);
            } catch (error) {
                toast.error('Không thể tải danh sách voucher.');
            } finally {
                setLoading(false);
            }
        };
        fetchVouchers();
    }, []);

    if (loading) {
        return <p>Đang tải voucher của bạn...</p>;
    }

    return (
        <div className="account-content">
            <div className="account-content__header">
                <a className="">Ví Voucher Của Tôi</a>
                <img className="h-full w-full" loading="lazy" alt="" src="../public/images/account-content-img.png" />
            </div>
            <div className="account-content__body">
                {vouchers.length > 0 ? (
                    <div className="row g-3">
                        {vouchers.map((userVoucher) => (
                            <div className="col-md-6" key={userVoucher.id}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h6 className="card-title">{userVoucher.Voucher.title}</h6>
                                        <p className="card-text">{userVoucher.Voucher.description}</p>
                                        <p className="card-text">
                                            <small className="text-muted">
                                                Mã: <strong>{userVoucher.Voucher.code}</strong>
                                            </small>
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted">Hết hạn: {new Date(userVoucher.Voucher.end_date).toLocaleDateString('vi-VN')}</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Bạn không có voucher nào khả dụng.</p>
                )}
            </div>
        </div>
    );
};

export default CouponsPage;
