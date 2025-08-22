// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';
import { useQuickView } from '../../context/QuickViewContext';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const QuickViewModal = () => {
    const { isQuickViewOpen, closeQuickView, quickViewProduct, isQuickViewLoading } = useQuickView();

    if (!isQuickViewOpen) {
        return null;
    }

    // Cấu hình cho slider ảnh
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    const calculateRatingWidth = (avg) => {
        if (!avg || avg <= 0) return '0%';
        return `${(avg / 5) * 100}%`;
    };
    console.log(quickViewProduct);
    return (
        <>
            <div className="mfp-bg mfp-product mfp-fade mfp-ready"></div>
            <div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-product mfp-fade mfp-ready" style={{ overflow: 'hidden auto' }}>
                <div className="mfp-container mfp-ajax-holder mfp-s-ready">
                    <div className="mfp-content">
                        {isQuickViewLoading ? (
                            <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Loading...</div>
                        ) : (
                            quickViewProduct && (
                                <div className="product product-single row product-popup">
                                    <div className="col-md-6">
                                        <Slider {...sliderSettings}>
                                            {/* Ảnh chính */}
                                            {quickViewProduct.main_image && (
                                                <figure className="product-image">
                                                    <img src={`${import.meta.env.VITE_API_BASE_URL}/${quickViewProduct.main_image}`} alt={quickViewProduct.name} />
                                                </figure>
                                            )}
                                            {/* Các ảnh trong gallery */}
                                            {quickViewProduct.ProductImages?.map((img) => (
                                                <figure key={img.id} className="product-image">
                                                    <img src={`${import.meta.env.VITE_API_BASE_URL}/${img.url}`} alt={quickViewProduct.name} />
                                                </figure>
                                            ))}
                                        </Slider>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="product-details scrollable pr-0 pr-md-3">
                                            <h1 className="product-name mt-0">{quickViewProduct.name}</h1>
                                            <div className="product-meta">
                                                SKU: <span className="product-sku">{quickViewProduct.sku || 'N/A'}</span>
                                                THƯƠNG HIỆU: <span className="product-brand">{quickViewProduct.Brand?.name || 'N/A'}</span>
                                            </div>
                                            <div class="product-price">
                                                {quickViewProduct.sale_price ? (
                                                    <>
                                                        <ins class="new-price">{new Intl.NumberFormat('vi-VN').format(quickViewProduct.sale_price || quickViewProduct.price)} đ</ins>
                                                        <del class="old-price">{quickViewProduct.sale_price && <del>{new Intl.NumberFormat('vi-VN').format(quickViewProduct.price)} đ</del>}</del>
                                                    </>
                                                ) : (
                                                    <ins class="new-price">{new Intl.NumberFormat('vi-VN').format(quickViewProduct.sale_price || quickViewProduct.price)} đ</ins>
                                                )}
                                            </div>

                                            {quickViewProduct.rating_count > 0 ? (
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{ width: calculateRatingWidth(quickViewProduct.rating_avg) }} />
                                                        <span className="tooltiptext tooltip-top">{quickViewProduct.rating_avg.toFixed(2)}</span>
                                                    </div>
                                                    <Link to={`/products/${quickViewProduct.slug}#product-reviews`} className="link-to-tab rating-reviews">
                                                        ( {quickViewProduct.rating_count} đánh giá )
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className="ratings-container">
                                                    <span className="rating-reviews">Chưa có đánh giá</span>
                                                </div>
                                            )}

                                            <p className="product-short-desc">{quickViewProduct.short_description}</p>

                                            {/* (Phần chọn biến thể, số lượng, và add to cart sẽ cần logic phức tạp hơn và có thể thêm sau) */}

                                            <hr className="product-divider" />
                                            <div className="product-form product-qty">
                                                <div className="product-form-group">
                                                    <div className="input-group mr-2">
                                                        <button className="quantity-minus d-icon-minus" />
                                                        <input className="quantity form-control" type="number" min={1} max={1000000} />
                                                        <button className="quantity-plus d-icon-plus" />
                                                    </div>
                                                    <button className="btn-product btn-cart text-normal ls-normal font-weight-semi-bold" disabled="disabled">
                                                        <i className="d-icon-bag" />
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                            <hr className="product-divider mb-3" />
                                            <div className="product-footer">
                                                <a href="#" className="btn-product btn-wishlist mr-4">
                                                    <i className="d-icon-heart"></i>Add to wishlist
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <button title="Close (Esc)" type="button" className="mfp-close" onClick={closeQuickView}>
                                        <span>×</span>
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            <div className="product product-single row product-popup">
                <div className="col-md-6">
                    <div className="product-gallery">
                        <div className="product-single-carousel owl-carousel owl-theme owl-nav-inner owl-loaded owl-drag">
                            <div className="owl-stage-outer">
                                <div
                                    className="owl-stage"
                                    style={{
                                        transform: 'translate3d(0px, 0px, 0px)',
                                        transition: 'all',
                                        width: 1856,
                                    }}
                                >
                                    <div className="owl-item active" style={{ width: 464 }}>
                                        <figure className="product-image">
                                            <img src="images/product/product-1-1-580x652.jpg" data-zoom-image="images/product/product-1-1-800x900.jpg" alt="Blue Pinafore Denim Dress" width={580} height={580} />
                                            <div
                                                className="zoomContainer"
                                                style={{
                                                    WebkitTransform: 'translateZ(0)',
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 0,
                                                    height: 522,
                                                    width: 464,
                                                }}
                                            >
                                                <div className="zoomWindowContainer" style={{ width: 400 }}>
                                                    <div
                                                        style={{
                                                            zIndex: 999,
                                                            overflow: 'hidden',
                                                            marginLeft: 0,
                                                            marginTop: 0,
                                                            backgroundPosition: '-336px -218.31px',
                                                            width: 464,
                                                            height: 522,
                                                            float: 'left',
                                                            cursor: 'crosshair',
                                                            border: '0px solid rgb(136, 136, 136)',
                                                            backgroundRepeat: 'no-repeat',
                                                            position: 'absolute',
                                                            backgroundImage: 'url("images/product/product-1-1-800x900.jpg")',
                                                            top: 0,
                                                            left: 0,
                                                            display: 'none',
                                                        }}
                                                        className="zoomWindow"
                                                    >
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </figure>
                                    </div>
                                    <div className="owl-item" style={{ width: 464 }}>
                                        <figure className="product-image">
                                            <img src="images/product/product-1-2-580x652.jpg" data-zoom-image="images/product/product-1-2-800x900.jpg" alt="Blue Pinafore Denim Dress" width={580} height={580} />
                                            <div
                                                className="zoomContainer"
                                                style={{
                                                    WebkitTransform: 'translateZ(0)',
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 0,
                                                    height: 522,
                                                    width: 464,
                                                }}
                                            >
                                                <div className="zoomWindowContainer" style={{ width: 400 }}>
                                                    <div
                                                        style={{
                                                            zIndex: 999,
                                                            overflow: 'hidden',
                                                            marginLeft: 0,
                                                            marginTop: 0,
                                                            backgroundPosition: '0px 0px',
                                                            width: 464,
                                                            height: 522,
                                                            float: 'left',
                                                            display: 'none',
                                                            cursor: 'crosshair',
                                                            border: '0px solid rgb(136, 136, 136)',
                                                            backgroundRepeat: 'no-repeat',
                                                            position: 'absolute',
                                                            backgroundImage: 'url("images/product/product-1-2-800x900.jpg")',
                                                        }}
                                                        className="zoomWindow"
                                                    >
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </figure>
                                    </div>
                                    <div className="owl-item" style={{ width: 464 }}>
                                        <figure className="product-image">
                                            <img src="images/product/product-1-3-580x652.jpg" data-zoom-image="images/product/product-1-3-800x900.jpg" alt="Blue Pinafore Denim Dress" width={580} height={580} />
                                            <div
                                                className="zoomContainer"
                                                style={{
                                                    WebkitTransform: 'translateZ(0)',
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 0,
                                                    height: 522,
                                                    width: 464,
                                                }}
                                            >
                                                <div className="zoomWindowContainer" style={{ width: 400 }}>
                                                    <div
                                                        style={{
                                                            zIndex: 999,
                                                            overflow: 'hidden',
                                                            marginLeft: 0,
                                                            marginTop: 0,
                                                            backgroundPosition: '0px 0px',
                                                            width: 464,
                                                            height: 522,
                                                            float: 'left',
                                                            display: 'none',
                                                            cursor: 'crosshair',
                                                            border: '0px solid rgb(136, 136, 136)',
                                                            backgroundRepeat: 'no-repeat',
                                                            position: 'absolute',
                                                            backgroundImage: 'url("images/product/product-1-3-800x900.jpg")',
                                                        }}
                                                        className="zoomWindow"
                                                    >
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </figure>
                                    </div>
                                    <div className="owl-item" style={{ width: 464 }}>
                                        <figure className="product-image">
                                            <img src="images/product/product-1-4-580x652.jpg" data-zoom-image="images/product/product-1-4-800x900.jpg" alt="Blue Pinafore Denim Dress" width={580} height={580} />
                                            <div
                                                className="zoomContainer"
                                                style={{
                                                    WebkitTransform: 'translateZ(0)',
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 0,
                                                    height: 522,
                                                    width: 464,
                                                }}
                                            >
                                                <div className="zoomWindowContainer" style={{ width: 400 }}>
                                                    <div
                                                        style={{
                                                            zIndex: 999,
                                                            overflow: 'hidden',
                                                            marginLeft: 0,
                                                            marginTop: 0,
                                                            backgroundPosition: '0px 0px',
                                                            width: 464,
                                                            height: 522,
                                                            float: 'left',
                                                            display: 'none',
                                                            cursor: 'crosshair',
                                                            border: '0px solid rgb(136, 136, 136)',
                                                            backgroundRepeat: 'no-repeat',
                                                            position: 'absolute',
                                                            backgroundImage: 'url("images/product/product-1-4-800x900.jpg")',
                                                        }}
                                                        className="zoomWindow"
                                                    >
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                            <div className="owl-nav">
                                <button type="button" title="presentation" className="owl-prev disabled">
                                    <i className="d-icon-angle-left" />
                                </button>
                                <button type="button" title="presentation" className="owl-next">
                                    <i className="d-icon-angle-right" />
                                </button>
                            </div>
                            <div className="owl-dots disabled" />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="product-details scrollable pr-0 pr-md-3">
                        <div className="product-price">$113.00</div>

                        <hr className="product-divider" />
                        <div className="product-form product-qty">
                            <div className="product-form-group">
                                <div className="input-group mr-2">
                                    <button className="quantity-minus d-icon-minus" />
                                    <input className="quantity form-control" type="number" min={1} max={1000000} />
                                    <button className="quantity-plus d-icon-plus" />
                                </div>
                                <button className="btn-product btn-cart text-normal ls-normal font-weight-semi-bold" disabled="disabled">
                                    <i className="d-icon-bag" />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                        <hr className="product-divider mb-3" />
                        <div className="product-footer">
                            <div className="social-links mr-4">
                                <a href="#" className="social-link social-facebook fab fa-facebook-f" />
                                <a href="#" className="social-link social-twitter fab fa-twitter" />
                                <a href="#" className="social-link social-pinterest fab fa-pinterest-p" />
                            </div>
                            <a href="#" className="btn-product btn-wishlist mr-4">
                                <i className="d-icon-heart" />
                                Add to wishlist
                            </a>
                            <a href="#" className="btn-product btn-compare">
                                <i className="d-icon-compare" />
                                Add to compare
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuickViewModal;
