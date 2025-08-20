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

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const response = await api.get('/api/wishlist');
            setWishlist(response.data);
        } catch (error) {
            toast.error('Không thể tải danh sách yêu thích.');
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (productId) => {
        try {
            await api.delete(`/api/wishlist/${productId}`);
            toast.info('Đã xóa khỏi danh sách yêu thích.');
            // Cập nhật lại UI ngay lập tức
            setWishlist((prev) => prev.filter((item) => item.product_id !== productId));
        } catch (error) {
            toast.error('Xóa thất bại.');
        }
    };

    if (loading) return <p>Đang tải...</p>;

    return (
        <div className="account-content">
            <div className="account-content__header">
                <a className="">Sản phẩm yêu thích</a>
                <img className="h-full w-full" loading="lazy" alt="" src="../public/images/account-content-img.png" />
            </div>
            <div className="account-content__body">
                {wishlist.length > 0 ? (
                    <table className="table">
                        <tbody>
                            {wishlist.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <img src={`${API_URL}/${item.Product.main_image}`} width="80" alt={item.Product.name} />
                                    </td>
                                    <td>
                                        <Link to={`/product/${item.Product.slug}`}>{item.Product.name}</Link>
                                    </td>
                                    <td>{new Intl.NumberFormat('vi-VN').format(item.Product.price)} đ</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemove(item.product_id)}>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Bạn chưa có sản phẩm yêu thích nào.</p>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
