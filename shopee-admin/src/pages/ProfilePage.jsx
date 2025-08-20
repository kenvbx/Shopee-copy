// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';

function ProfilePage() {
    const [profile, setProfile] = useState({ name: '', email: '' });
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });

    useEffect(() => {
        api.get('/api/auth/me')
            .then((res) => setProfile(res.data))
            .catch(() => toast.error('Không thể tải thông tin cá nhân.'));
    }, []);

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await api.put('/api/auth/me', { name: profile.name });
            toast.success('Cập nhật tên thành công!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Lỗi cập nhật tên.');
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            toast.error('Mật khẩu mới không khớp!');
            return;
        }
        try {
            await api.put('/api/auth/me', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });
            toast.success('Cập nhật mật khẩu thành công!');
            setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' }); // Reset form
        } catch (error) {
            toast.error(error.response?.data?.message || 'Lỗi cập nhật mật khẩu.');
        }
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h5>Thông tin cá nhân</h5>
                        <form onSubmit={handleUpdateProfile}>
                            <div className="mb-3">
                                <label className="form-label">Tên</label>
                                <input type="text" name="name" className="form-control" value={profile.name} onChange={handleProfileChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" value={profile.email} readOnly disabled />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Lưu thay đổi
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h5>Đổi mật khẩu</h5>
                        <form onSubmit={handleUpdatePassword}>
                            <div className="mb-3">
                                <label className="form-label">Mật khẩu hiện tại</label>
                                <input type="password" name="currentPassword" className="form-control" value={passwordData.currentPassword} onChange={handlePasswordChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mật khẩu mới</label>
                                <input type="password" name="newPassword" className="form-control" value={passwordData.newPassword} onChange={handlePasswordChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Xác nhận mật khẩu mới</label>
                                <input type="password" name="confirmNewPassword" className="form-control" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Đổi mật khẩu
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
