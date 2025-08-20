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

// Component con để hiển thị các ngôi sao
const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(<i key={i} className={`ph-fill ph-star ${i <= rating ? 'text-warning' : 'text-secondary'}`}></i>);
    }
    return <div>{stars}</div>;
};

const MyReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await api.get('/api/reviews/my-reviews');
                setReviews(response.data);
            } catch (error) {
                toast.error('Không thể tải các đánh giá của bạn.');
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    if (loading) {
        return <p>Đang tải đánh giá...</p>;
    }

    return (
        <div className="account-content">
            <div className="account-content__header">
                <a className="">Đánh giá</a>
                <img className="h-full w-full" loading="lazy" alt="" src="../public/images/account-content-img.png" />
            </div>

            <div className="account-content__body">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="card mb-3">
                            <div className="card-body">
                                <div className="d-flex align-items-start">
                                    <img src={review.Product?.main_image ? `${API_URL}/${review.Product.main_image}` : 'https://via.placeholder.com/80'} width="80" height="80" alt={review.Product?.name} className="me-3 rounded" />
                                    <div className="flex-grow-1">
                                        <h6 className="mb-1">
                                            <Link to={`/product/${review.Product?.slug}`}>{review.Product?.name}</Link>
                                        </h6>
                                        <StarRating rating={review.rating} />
                                        <p className="mt-2 mb-1">{review.title}</p>
                                        <p className="text-muted small">{review.content}</p>
                                        <small className="text-muted">Đánh giá vào: {new Date(review.created_at).toLocaleDateString('vi-VN')}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Bạn chưa có đánh giá nào.</p>
                )}
            </div>
        </div>
    );
};

export default MyReviewsPage;
