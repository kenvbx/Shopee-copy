// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';

function UserFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        role: 'user',
        status: 'active',
    });

    useEffect(() => {
        if (isEditMode) {
            api.get(`/api/users/${id}`)
                .then((res) => setUser(res.data))
                .catch((err) => toast.error('Không tải được dữ liệu người dùng.'));
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await api.put(`/api/users/${id}`, user);
                toast.success('Cập nhật người dùng thành công!');
            } else {
                await api.post(`/api/users`, user);
                toast.success('Tạo người dùng thành công!');
            }
            navigate('/users');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra.');
        }
    };

    return (
        <div className="row">
            <div className="col-xl-9 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="border p-4 rounded">
                            <div className="card-title d-flex align-items-center">
                                <h5 className="mb-0">{isEditMode ? 'Sửa Người Dùng' : 'Thêm Người Dùng Mới'}</h5>
                            </div>
                            <hr />
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label">Tên người dùng</label>
                                <div className="col-sm-9">
                                    <input type="text" name="username" className="form-control" value={user.username || ''} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label">Địa chỉ email</label>
                                <div className="col-sm-9">
                                    <input type="email" name="email" className="form-control" value={user.email} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label">Họ tên</label>
                                <div className="col-sm-9">
                                    <input type="text" name="name" className="form-control" value={user.name} onChange={handleChange} />
                                </div>
                            </div>

                            {!isEditMode && (
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label">Mật khẩu</label>
                                    <div className="col-sm-9">
                                        <input type="password" name="password" className="form-control" onChange={handleChange} required />
                                    </div>
                                </div>
                            )}

                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label">Vai trò</label>
                                <div className="col-sm-9">
                                    <select name="role" className="form-select" value={user.role} onChange={handleChange}>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label">Trạng thái</label>
                                <div className="col-sm-9">
                                    <select name="status" className="form-select" value={user.status} onChange={handleChange}>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="banned">Banned</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <label className="col-sm-3 col-form-label" />
                                <div className="col-sm-9">
                                    <button type="submit" className="btn btn-primary">
                                        {isEditMode ? 'Lưu Thay Đổi' : 'Tạo Người Dùng'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserFormPage;
