// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MyOrders from '../components/account/MyOrders';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddressForm = ({ address, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
        address || {
            recipient_name: '',
            phone: '',
            address: '',
            city: '',
            district: '',
            ward: '',
            is_default: false,
        }
    );

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <input name="recipient_name" value={formData.recipient_name} onChange={handleChange} className="form-control" placeholder="Họ và tên" required />
                </div>
                <div className="col-md-6 mb-3">
                    <input name="phone" value={formData.phone} onChange={handleChange} className="form-control" placeholder="Số điện thoại" required />
                </div>
                <div className="col-12 mb-3">
                    <input name="address" value={formData.address} onChange={handleChange} className="form-control" placeholder="Địa chỉ cụ thể" required />
                </div>
                <div className="col-md-4 mb-3">
                    <input name="city" value={formData.city} onChange={handleChange} className="form-control" placeholder="Tỉnh/Thành phố" required />
                </div>
                <div className="col-md-4 mb-3">
                    <input name="district" value={formData.district} onChange={handleChange} className="form-control" placeholder="Quận/Huyện" required />
                </div>
                <div className="col-md-4 mb-3">
                    <input name="ward" value={formData.ward} onChange={handleChange} className="form-control" placeholder="Phường/Xã" required />
                </div>
                <div className="col-12 mb-3">
                    <div className="form-check">
                        <input type="checkbox" name="is_default" checked={formData.is_default} onChange={handleChange} className="form-check-input" id="is_default" />
                        <label className="form-check-label" htmlFor="is_default">
                            Đặt làm địa chỉ mặc định
                        </label>
                    </div>
                </div>
            </div>
            <Button variant="secondary" onClick={onCancel}>
                Hủy
            </Button>
            <Button variant="primary" type="submit" className="ms-2">
                Lưu Địa Chỉ
            </Button>
        </form>
    );
};

const ProfilePage = () => {
    const { user, updateUser, fetchUser, logout } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '',
        birthday: null,
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    // Tải dữ liệu cá nhân khi trang được mở
    useEffect(() => {
        api.get('/api/auth/me')
            .then((res) => {
                setFormData({
                    name: res.data.name || '',
                    email: res.data.email || '',
                    phone: res.data.phone || '',
                    gender: res.data.gender || '',
                    birthday: res.data.birthday ? new Date(res.data.birthday) : null,
                    avatar: res.data.avatar || '',
                });
            })
            .catch(() => toast.error('Không thể tải thông tin cá nhân.'));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    // Hàm lưu thông tin cá nhân
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: formData.name,
                phone: formData.phone,
                gender: formData.gender,
                birthday: formData.birthday,
            };

            await api.put('/api/auth/me', payload);
            toast.success('Cập nhật thông tin thành công!');
        } catch (error) {
            toast.error('Cập nhật thất bại.');
        }
    };

    // Hàm đổi mật khẩu
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            return toast.error('Mật khẩu mới không khớp!');
        }
        try {
            await api.put('/api/auth/me', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });
            toast.success('Đổi mật khẩu thành công!');
            setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đổi mật khẩu thất bại.');
        }
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('avatar', file);

        try {
            // 1. Gửi yêu cầu và LƯU kết quả vào biến `response`
            const response = await api.post('/api/auth/me/avatar', uploadData);

            // 2. Cập nhật lại Context với dữ liệu user mới từ API
            updateUser(response.data.user);

            // 3. Hiển thị thông báo thành công
            toast.success(response.data.message);
        } catch (error) {
            toast.error('Upload avatar thất bại.');
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const res = await api.get('/api/addresses');
            setAddresses(res.data);
        } catch (error) {
            toast.error('Không thể tải sổ địa chỉ.');
        }
    };

    const handleSave = async (formData) => {
        try {
            if (editingAddress) {
                await api.put(`/api/addresses/${editingAddress.id}`, formData);
                toast.success('Cập nhật địa chỉ thành công!');
            } else {
                await api.post('/api/addresses', formData);
                toast.success('Thêm địa chỉ mới thành công!');
            }
            setShowModal(false);
            setEditingAddress(null);
            fetchAddresses();
        } catch (error) {
            toast.error('Lưu địa chỉ thất bại.');
        }
    };

    const handleDelete = async (addressId) => {
        if (window.confirm('Bạn có chắc muốn xóa địa chỉ này?')) {
            await api.delete(`/api/addresses/${addressId}`);
            toast.success('Xóa địa chỉ thành công!');
            fetchAddresses();
        }
    };

    return (
        <div className="account-content">
            <div className="account-content__header">
                <a className="">Thông tin tài khoản</a>
                <img className="h-full w-full" loading="lazy" alt="" src="../public/images/account-content-img.png" />
            </div>

            <div className="account-content__body">
                <h4 className="mb-3">Thông tin tài khoản</h4>

                <div className="account-content__avatar">
                    <img src={user.avatar ? `${API_URL}/${user.avatar}` : '/images/user.jpeg'} alt={user.name} className="img-fluid rounded-circle mb-3 me-3" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                    <input type="file" id="avatarUpload" className="d-none" onChange={handleAvatarUpload} accept="image/*" />
                    <label htmlFor="avatarUpload" className="btn btn-outline-primary">
                        Chọn ảnh
                    </label>
                </div>

                <h4 className="mb-3">Tài khoản</h4>

                <form onSubmit={handleProfileSubmit} className="form">
                    <div className="form-group">
                        <label className="form-label">Họ và tên</label>
                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Họ và tên" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Địa chỉ Email</label>
                        <input type="email" className="form-control" value={formData.email} placeholder="Địa chỉ email" readOnly disabled />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Số điện thoại</label>
                        <input type="text" className="form-control" value={formData.phone} onChange={handleChange} placeholder="Số điện thoại" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Giới tính</label>
                        <select name="gender" className="form-control" value={formData.gender} onChange={handleChange}>
                            <option value="">Chọn giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Sinh nhật</label>
                        <DatePicker selected={formData.birthday} onChange={(date) => setFormData({ ...formData, birthday: date })} className="form-control" placeholderText="Ngày sinh" dateFormat="yyyy-MM-dd" />
                    </div>
                    <button class="btn btn-main" type="submit">
                        Lưu thay đổi
                    </button>
                </form>

                <h4 className="mt-3 mb-3">Đổi mật khẩu</h4>
                <form onSubmit={handlePasswordSubmit}>
                    <div className="form-group">
                        <label className="form-label">Mật khẩu hiện tại (để trống nếu không thay đổi)</label>
                        <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} className="form-control" placeholder="Mật khẩu hiện tại" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Mật khẩu mới (để trống nếu không thay đổi)</label>
                        <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="form-control" placeholder="Mật khẩu mới" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Xác nhận mật khẩu mới</label>
                        <input type="password" name="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} className="form-control" placeholder="Xác nhận mật khẩu mới" />
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-main">
                            Đổi mật khẩu
                        </button>
                    </div>
                </form>
                <hr />

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4>Địa chỉ giao hàng</h4>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setEditingAddress(null);
                            setShowModal(true);
                        }}
                    >
                        Thêm Địa Chỉ Mới
                    </Button>
                </div>

                {addresses.map((addr) => (
                    <div key={addr.id} className="border p-3 rounded mb-3">
                        <div className="d-flex justify-content-between">
                            <div>
                                <strong>{addr.recipient_name}</strong> {addr.is_default && <span className="badge bg-success ms-2">Mặc định</span>}
                                <p className="mb-1">Địa chỉ: {`${addr.address}, ${addr.ward}, ${addr.district}, ${addr.city}`}</p>
                                <p className="mb-0">Điện thoại: {addr.phone}</p>
                            </div>
                            <div>
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        setEditingAddress(addr);
                                        setShowModal(true);
                                    }}
                                >
                                    Sửa
                                </Button>
                                <Button variant="link" className="text-danger" onClick={() => handleDelete(addr.id)}>
                                    Xóa
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}

                <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{editingAddress ? 'Sửa Địa Chỉ' : 'Thêm Địa Chỉ Mới'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddressForm address={editingAddress} onSave={handleSave} onCancel={() => setShowModal(false)} />
                    </Modal.Body>
                </Modal>
                <hr />
            </div>
        </div>
    );
};

export default ProfilePage;
