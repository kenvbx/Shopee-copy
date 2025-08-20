// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';

function BannerListPage() {
    const [banners, setBanners] = useState([]);
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        const response = await api.get('/api/banners');
        setBanners(response.data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa banner này?')) {
            await api.delete(`/api/banners/${id}`);
            toast.success('Xóa banner thành công!');
            fetchBanners();
        }
    };

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5>Quản Lý Banner</h5>
                <Link to="/banners/add" className="btn btn-primary">
                    Thêm Mới
                </Link>
            </div>
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Ảnh</th>
                            <th>Tiêu đề</th>
                            <th>Vị trí</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {banners.map((banner) => (
                            <tr key={banner.id}>
                                <td>
                                    <img src={`${API_URL}/${banner.image_url}`} height="50" alt={banner.title} />
                                </td>
                                <td>{banner.title}</td>
                                <td>{banner.position}</td>
                                <td>{banner.status}</td>
                                <td>
                                    <Link to={`/banners/edit/${banner.id}`} className="btn btn-sm btn-warning">
                                        Sửa
                                    </Link>
                                    <button onClick={() => handleDelete(banner.id)} className="btn btn-sm btn-danger ms-2">
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default BannerListPage;
