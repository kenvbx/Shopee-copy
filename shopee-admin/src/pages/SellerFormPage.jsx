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

function SellerFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [users, setUsers] = useState([]);

    const [seller, setSeller] = useState({
        name: '',
        user_id: '',
        phone: '',
        email: '',
        address: '',
        description: '',
        status: 'pending',
    });

    useEffect(() => {
        // Lấy danh sách user để liên kết
        api.get('/api/users?limit=1000') // Lấy số lượng lớn user
            .then((res) => setUsers(res.data.data))
            .catch(() => toast.error('Không tải được danh sách người dùng.'));

        if (isEditMode) {
            api.get(`/api/sellers/${id}`)
                .then((res) => setSeller(res.data))
                .catch(() => toast.error('Không tải được dữ liệu nhà bán hàng.'));
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        setSeller({ ...seller, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await api.put(`/api/sellers/${id}`, seller);
                toast.success('Cập nhật nhà bán hàng thành công!');
            } else {
                await api.post(`/api/sellers`, seller);
                toast.success('Tạo nhà bán hàng thành công!');
            }
            navigate('/sellers');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra.');
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5>{isEditMode ? 'Sửa Nhà Bán Hàng' : 'Thêm Nhà Bán Hàng Mới'}</h5>
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Tên Cửa Hàng</label>
                        <input type="text" name="name" className="form-control" value={seller.name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Tài khoản User liên kết</label>
                        <select name="user_id" className="form-select" value={seller.user_id || ''} onChange={handleChange}>
                            <option value="">-- Chọn User --</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name} ({user.email})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" value={seller.email || ''} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Số điện thoại</label>
                        <input type="text" name="phone" className="form-control" value={seller.phone || ''} onChange={handleChange} />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Địa chỉ</label>
                        <textarea name="address" className="form-control" rows="2" value={seller.address || ''} onChange={handleChange}></textarea>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Mô tả</label>
                        <textarea name="description" className="form-control" rows="4" value={seller.description || ''} onChange={handleChange}></textarea>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Trạng thái</label>
                        <select name="status" className="form-select" value={seller.status} onChange={handleChange}>
                            <option value="pending">Đang chờ</option>
                            <option value="active">Hoạt động</option>
                            <option value="suspended">Bị đình chỉ</option>
                            <option value="closed">Đã đóng</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            {isEditMode ? 'Lưu Thay Đổi' : 'Tạo Nhà Bán Hàng'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SellerFormPage;
