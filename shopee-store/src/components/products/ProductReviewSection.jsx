// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

/** ---------- STAR INPUT (clickable, syncs with hidden select) ---------- */
const StarInput = ({ value, onChange }) => {
    const [hover, setHover] = useState(0);
    const current = hover || value;
    return (
        <div className="rating-form">
            <label htmlFor="rating" className="text-dark">
                Chọn đánh giá của bạn *{' '}
            </label>
            <span className={`rating-stars ${current ? 'selected' : ''}`}>
                {[1, 2, 3, 4, 5].map((n) => (
                    <a
                        key={n}
                        href="#"
                        className={`star-${n} ${current === n ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            onChange(n);
                        }}
                        onMouseEnter={() => setHover(n)}
                        onMouseLeave={() => setHover(0)}
                    >
                        {n}
                    </a>
                ))}
            </span>
            {/* giữ thẻ select để khớp UI gốc */}
            <select id="rating" name="rating" required style={{ display: 'none' }} value={value} onChange={(e) => onChange(+e.target.value)}>
                <option value="">Rate…</option>
                <option value="5">Perfect</option>
                <option value="4">Good</option>
                <option value="3">Average</option>
                <option value="2">Not that bad</option>
                <option value="1">Very poor</option>
            </select>
        </div>
    );
};

/** ---------- MEDIA INPUT (3 slots, image/video, preview & remove) ---------- */
const MediaInputs = ({ files, setFiles }) => {
    const maxCount = 5;
    const maxSize = 2 * 1024 * 1024; // 2MB
    const inputRefs = [useRef(), useRef(), useRef()];

    const handlePick = (idx, e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (f.size > maxSize) {
            toast.error('File vượt quá 2MB.');
            e.target.value = '';
            return;
        }
        const newFiles = [...files];
        newFiles[idx] = f;
        setFiles(newFiles.slice(0, maxCount));
    };

    const removeAt = (idx) => {
        const newFiles = [...files];
        newFiles.splice(idx, 1);
        setFiles(newFiles);
        if (inputRefs[idx]?.current) inputRefs[idx].current.value = '';
    };

    const renderSlot = (idx) => {
        const f = files[idx];
        const isImage = f && f.type.startsWith('image/');
        const isVideo = f && f.type.startsWith('video/');
        const bgStyle = { backgroundImage: 'url(/images/product/placeholder.png)' };

        return (
            <div key={idx} className={`file-input form-control ${isVideo ? 'video-input' : 'image-input'}`} style={bgStyle}>
                {isVideo ? <video className="file-input-wrapper" controls src={URL.createObjectURL(f)} /> : <div className="file-input-wrapper">{isImage && <img alt="preview" src={URL.createObjectURL(f)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}</div>}
                <label className="btn-action btn-upload" title="Upload Media">
                    <input ref={inputRefs[idx]} type="file" accept=".png,.jpg,.jpeg,.mp4,.avi" onChange={(e) => handlePick(idx, e)} />
                </label>
                {f && <label className="btn-action btn-remove" title="Remove Media" onClick={() => removeAt(idx)} />}
            </div>
        );
    };

    return (
        <>
            <div className="review-medias">{Array.from({ length: maxCount }).map((_, i) => renderSlot(i))}</div>
            <p>Tải lên hình ảnh hoặc video. Tối đa: 5, size: 2MB</p>
        </>
    );
};

/** ---------- SUMMARY (avg & distribution bars) ---------- */
const RatingSummary = ({ reviews, onOpenForm }) => {
    const { avg, dist } = useMemo(() => {
        if (!reviews?.length) return { avg: 0, dist: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
        const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        let sum = 0;
        for (const r of reviews) {
            const star = clamp(+r.rating || 0, 1, 5);
            dist[star] += 1;
            sum += star;
        }
        return { avg: sum / reviews.length, dist };
    }, [reviews]);

    const count = reviews?.length || 0;
    const pct = (n) => (count ? Math.round((n / count) * 100) : 0);

    return (
        <div className="col-12 mb-6">
            <div className="avg-rating-container">
                <mark>{avg.toFixed(1)}</mark>
                <div className="avg-rating">
                    <span className="avg-rating-title">Đánh giá trung bình</span>
                    <div className="ratings-container mb-0">
                        <div className="ratings-full">
                            <span className="ratings" style={{ width: `${(avg / 5) * 100}%` }} />
                            <span className="tooltiptext tooltip-top">{avg.toFixed(2)}</span>
                        </div>
                        <span className="rating-reviews">({count} đánh giá)</span>
                    </div>
                </div>
            </div>

            <div className="ratings-list mb-2">
                {[5, 4, 3, 2, 1].map((star) => (
                    <div className="ratings-item" key={star}>
                        <div className="ratings-container mb-0">
                            <div className="ratings-full">
                                <span className="ratings" style={{ width: `${(star / 5) * 100}%` }} />
                                <span className="tooltiptext tooltip-top">{star.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="rating-percent">
                            <span style={{ width: `${pct(dist[star])}%` }} />
                        </div>
                        <div className="progress-value">{pct(dist[star])}%</div>
                    </div>
                ))}
            </div>

            <a
                className="btn btn-dark btn-rounded submit-review-toggle"
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    onOpenForm?.();
                }}
            >
                Gửi đánh giá của bạn
            </a>
        </div>
    );
};

const toAbsolute = (API_URL, url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `${API_URL}/${url.replace(/^\/+/, '')}`;
};

const splitMaybeCSV = (val) =>
    typeof val === 'string'
        ? val
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
        : Array.isArray(val)
        ? val
        : [];

const pickMedia = (review) => {
    // Gom những khả năng tên field khác nhau từ backend
    let raw = review.media || review.images || review.ReviewImages || review.ReviewMedia || review.attachments || [];

    // Nếu backend trả "images" là chuỗi CSV
    raw = splitMaybeCSV(raw);

    const images = [];
    const videos = [];

    raw.forEach((m) => {
        // m có thể là string hoặc object
        const url = typeof m === 'string' ? m : m.url || m.path || m.image_url || m.file_url || m.src || '';

        if (!url) return;

        const type = (m.type || m.mime_type || '').toLowerCase();
        const isVideo = type.startsWith('video') || /\.(mp4|avi|mov|mkv|webm)$/i.test(url);

        if (isVideo) {
            videos.push(url);
        } else {
            images.push(url);
        }
    });

    return { images, videos };
};

/** ---------- SINGLE REVIEW ITEM ---------- */
const ReviewItem = ({ review, API_URL }) => {
    const avatar = review.User?.avatar ? `${API_URL}/${review.User.avatar}` : '/images/blog/comments/1.jpg';
    const name = review.User?.name || 'User';
    const dateStr = new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const { images, videos } = pickMedia(review);

    return (
        <li>
            <div className="comment">
                <figure className="comment-media">
                    <a href={`/user/${review.user_id}`}>
                        <img src={avatar} alt={review.User.name} width="60" height="60" />
                    </a>
                </figure>
                <div className="comment-body">
                    <div className="comment-rating ratings-container">
                        <div className="ratings-full">
                            <span className="ratings" style={{ width: `${(clamp(+review.rating, 1, 5) / 5) * 100}%` }} />
                            <span className="tooltiptext tooltip-top" />
                        </div>
                    </div>
                    <div className="comment-user">
                        <span className="comment-date">
                            by <span className="font-weight-semi-bold text-uppercase text-dark">{name}</span> on
                            <span className="font-weight-semi-bold text-dark"> {dateStr}</span>
                        </span>
                    </div>

                    {review.content && (
                        <div className="comment-content mb-5">
                            <p>{review.content}</p>
                        </div>
                    )}

                    {(images.length > 0 || videos.length > 0) && (
                        <div className="file-input-wrappers">
                            {images.map((src, idx) => {
                                const abs = toAbsolute(API_URL, src);
                                if (!abs) return null;
                                return <img key={`img-${review.id}-${idx}`} className="btn-play btn-img pwsp" src={abs} width="280" height="315" alt="product" />;
                            })}

                            {videos.map((src, idx) => {
                                const abs = toAbsolute(API_URL, src);
                                if (!abs) return null;
                                return (
                                    <a key={`vid-${review.id}-${idx}`} className="btn-play btn-iframe" style={{ backgroundImage: 'url(/images/product/product.jpg)', backgroundSize: 'cover' }} href={abs}>
                                        <i className="d-icon-play-solid" />
                                    </a>
                                );
                            })}
                        </div>
                    )}

                    <div className="feeling mt-5">
                        <button className="btn btn-link btn-icon-left btn-slide-up btn-infinite like mr-2">
                            <i className="fa fa-thumbs-up"></i>
                            Thích (<span className="count">{review.likes || 0}</span>)
                        </button>
                        <button className="btn btn-link btn-icon-left btn-slide-down btn-infinite unlike">
                            <i className="fa fa-thumbs-down"></i>
                            Không thích (<span className="count">{review.unlikes || 0}</span>)
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};

/** ---------- MAIN SECTION ---------- */
const ProductReviewSection = ({ productId }) => {
    const { user, handleShowLogin } = useAuth();
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    // list & ui state
    const [reviews, setReviews] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [filter, setFilter] = useState('all'); // all | images | videos
    const [sortBy, setSortBy] = useState('newest'); // newest | oldest | high_rate | low_rate
    const [page, setPage] = useState(1);
    const pageSize = 5;

    // form state
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const [mediaFiles, setMediaFiles] = useState([]); // up to 3

    // fetch reviews
    useEffect(() => {
        const load = async () => {
            if (!productId) return;
            try {
                // Thêm các tham số vào URL
                const res = await api.get(`/api/reviews/product/${productId}`, {
                    params: {
                        page: page,
                        limit: 5, // pageSize
                        filter: filter,
                        sortBy: sortBy,
                    },
                });
                setReviews(res.data.data || []);
                setPagination(res.data.pagination || null);
            } catch (e) {
                console.error('Load reviews error', e);
                setReviews([]);
            }
        };
        load();
    }, [productId, page, filter, sortBy]);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setPage(1); // Reset về trang 1 mỗi khi đổi filter
    };

    const pageItems = reviews;

    // --- Add state for form open/close
    const [isFormOpen, setIsFormOpen] = useState(false);

    const submitReview = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.info('Vui lòng đăng nhập để gửi đánh giá.');
            handleShowLogin?.();
            return;
        }
        if (!rating) {
            toast.error('Vui lòng chọn số sao.');
            return;
        }

        const data = new FormData();
        data.append('productId', productId);
        data.append('rating', String(rating));
        data.append('content', content);

        // BACKEND của bạn đang expect field 'images' (multer upload.fields([{ name: 'images', maxCount: 5 }, ...]))
        // Nên chỉ append các file ảnh vào 'images'. Nếu có video, bạn có thể mở rộng backend để nhận 'videos'.
        mediaFiles.forEach((f) => {
            if (f.type.startsWith('image/')) data.append('images', f);
            // nếu backend hỗ trợ video: data.append('videos', f);
        });

        try {
            await api.post('/api/reviews', data, { headers: { 'Content-Type': 'multipart/form-data' } });
            toast.success('Gửi đánh giá thành công!');
            setRating(0);
            setPage(1);
            // Trigger useEffect để tải lại
            if (page === 1) {
                const res = await api.get(`/api/reviews/product/${productId}`, { params: { page: 1, limit: 5, filter: filter } });
                setReviews(res.data.data || []);
                setPagination(res.data.pagination || null);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Gửi đánh giá thất bại.');
        }
    };

    return (
        <div className="tab-pane active in" id="product-tab-reviews">
            <div className="row">
                <RatingSummary reviews={reviews} onOpenForm={() => setIsFormOpen(true)} />

                <div className="col-12 comments pt-2 pb-10 border-no">
                    {/* toolbar */}
                    <nav className="toolbox">
                        <div className="toolbox-left">
                            <div className="toolbox-item">
                                <a
                                    href="#"
                                    className={`btn btn-outline btn-rounded ${filter === 'all' ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleFilterChange('all');
                                    }}
                                >
                                    Tất cả đánh giá
                                </a>
                            </div>
                            <div className="toolbox-item">
                                <a
                                    href="#"
                                    className={`btn btn-outline btn-rounded ${filter === 'images' ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleFilterChange('images');
                                    }}
                                >
                                    Có hình ảnh
                                </a>
                            </div>
                            <div className="toolbox-item">
                                <a
                                    href="#"
                                    className={`btn btn-outline btn-rounded ${filter === 'videos' ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleFilterChange('videos');
                                    }}
                                >
                                    Có video
                                </a>
                            </div>
                        </div>
                        <div className="toolbox-right">
                            <div className="toolbox-item toolbox-sort select-box text-dark">
                                <label>Sắp xếp :</label>
                                <select
                                    name="orderby"
                                    className="form-control"
                                    value={sortBy}
                                    onChange={(e) => {
                                        setSortBy(e.target.value);
                                        setPage(1);
                                    }}
                                >
                                    <option value="">Mặc định</option>
                                    <option value="newest">Newest Reviews</option>
                                    <option value="oldest">Oldest Reviews</option>
                                    <option value="high_rate">Highest Rating</option>
                                    <option value="low_rate">Lowest Rating</option>
                                </select>
                            </div>
                        </div>
                    </nav>

                    {/* list */}
                    <ul className="comments-list">
                        {pageItems.map((r) => (
                            <ReviewItem key={r.id} review={r} API_URL={API_URL} />
                        ))}
                        {!pageItems.length && (
                            <li>
                                <p className="text-center my-4">Chưa có đánh giá phù hợp bộ lọc.</p>
                            </li>
                        )}
                    </ul>

                    {/* pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <nav className="toolbox toolbox-pagination justify-content-end">
                            <ul className="pagination">
                                <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                                    <a
                                        className="page-link page-link-prev"
                                        href="#"
                                        aria-label="Previous"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPage((p) => p - 1);
                                        }}
                                    >
                                        <i className="d-icon-arrow-left"></i>Prev
                                    </a>
                                </li>
                                {Array.from({ length: pagination.totalPages }).map((_, i) => (
                                    <li key={i + 1} className={`page-item ${pagination.currentPage === i + 1 ? 'active' : ''}`}>
                                        <a
                                            className="page-link"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setPage(i + 1);
                                            }}
                                        >
                                            {i + 1}
                                        </a>
                                    </li>
                                ))}
                                <li className={`page-item ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                                    <a
                                        className="page-link page-link-next"
                                        href="#"
                                        aria-label="Next"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPage((p) => p + 1);
                                        }}
                                    >
                                        Next<i className="d-icon-arrow-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>

            {/* FORM (overlay-style, bấm nút để cuộn xuống form) */}
            <div className={`review-form-section ${isFormOpen ? 'opened' : ''}`}>
                <div className="review-overlay" onClick={() => setIsFormOpen(false)}></div>
                <div className="review-form-wrapper">
                    <div className="title-wrapper text-left">
                        <h3 className="title title-simple text-left text-normal">Thêm đánh giá</h3>
                        <p>Địa chỉ email của bạn sẽ không được công khai. Các trường bắt buộc được đánh dấu *</p>
                    </div>

                    <StarInput value={rating} onChange={setRating} />

                    <form onSubmit={submitReview}>
                        <textarea id="reply-message" cols="30" rows="6" className="form-control mb-4" placeholder="Nhập đánh giá về sản phẩm (tối thiểu 10 ký tự) *" required value={content} onChange={(e) => setContent(e.target.value)} />
                        <MediaInputs files={mediaFiles} setFiles={setMediaFiles} />

                        <button type="submit" className="btn btn-primary btn-rounded">
                            Gửi đánh giá<i className="d-icon-arrow-right"></i>
                        </button>
                    </form>
                </div>
            </div>
            {/* End Reply */}
        </div>
    );
};

export default ProductReviewSection;
