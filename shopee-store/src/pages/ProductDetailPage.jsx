// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import ProductGallery from '../components/ProductGallery';
import ProductReviewSection from '../components/products/ProductReviewSection';
import RelatedProducts from '../components/products/RelatedProducts';

function ProductDetailPage() {
    const { slug } = useParams();
    const { addToCart } = useCart();
    const [navigation, setNavigation] = useState({ prev: null, next: null });
    const [reviews, setReviews] = useState([]);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [galleryImages, setGalleryImages] = useState([]);
    const [activeTab, setActiveTab] = useState('description');
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    // Derived values for average rating and width for star bar
    const avgRating = reviews.length ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length : 0;
    const ratingWidth = `${Math.round((avgRating / 5) * 100)}%`;

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setNavigation({ prev: null, next: null });
            try {
                const response = await api.get(`/api/public/product/${slug}`);
                const productData = response.data;
                setProduct(productData);

                const navResponse = await api.get(`/api/public/products/navigation/${response.data.id}`);
                setNavigation(navResponse.data);

                // 1. Lấy ảnh đại diện
                const mainImage = productData.main_image
                    ? [
                          {
                              src: `${API_URL}/${productData.main_image}`,
                              alt: productData.name,
                          },
                      ]
                    : [];

                // 2. Lấy album ảnh
                const albumImages =
                    productData.ProductImages?.map((img) => ({
                        src: `${API_URL}/${img.url}`,
                        alt: productData.name,
                    })) || [];

                // 3. Gộp chúng lại và cập nhật state
                setGalleryImages([...mainImage, ...albumImages]);
            } catch (error) {
                console.error('Không tìm thấy sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };
        if (slug) {
            fetchProduct();
        }
    }, [slug]);

    // Fetch reviews when product is available
    useEffect(() => {
        if (product?.id) {
            api.get(`/api/public/reviews/${product.id}`)
                .then((res) => setReviews(res.data))
                .catch((err) => console.error('Không thể tải reviews:', err));
        }
    }, [product?.id]);

    const incrementQuantity = () => setQuantity(quantity + 1);
    const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
        }
    };

    const handleAddToWishlist = async () => {
        if (!product) return;
        try {
            await api.post('/api/wishlist', { productId: product.id });
            toast.success('Đã thêm vào danh sách yêu thích!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Thêm thất bại. Có thể sản phẩm đã có trong danh sách.');
        }
    };

    const handleTabClick = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };

    // Từ link rating mở tab Reviews
    const openReviewsTab = (e) => {
        e.preventDefault();
        setActiveTab('reviews');
        // Scroll nhẹ tới cụm tab
        const el = document.getElementById('product-tabs-root');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (loading) {
        return <div className="container pt_120 xs_pt_80 pb_120 xs_pb_80">Đang tải sản phẩm...</div>;
    }

    if (!product) {
        return <div className="container pt_120 xs_pt_80 pb_120 xs_pb_80">Không tìm thấy sản phẩm.</div>;
    }

    return (
        <main className="main">
            <div className="page-content mb-10 pb-6">
                <div className="container">
                    <nav className="breadcrumb-nav product-navigation">
                        <ul className="breadcrumb pt-0 pb-0 mb-0">
                            <li>
                                <a href="/">
                                    <i className="d-icon-home" />
                                </a>
                            </li>
                            <li>
                                <Link to="/products" className="active">
                                    Sản phẩm
                                </Link>
                            </li>
                            <li>Detail</li>
                        </ul>

                        <ul className="product-nav mb-0">
                            <li className={`product-nav-prev ${!navigation.prev ? 'disabled' : ''}`}>
                                {navigation.prev ? (
                                    <Link to={`/product/${navigation.prev.slug}`}>
                                        <i className="d-icon-arrow-left" />
                                        Sản phẩm trước
                                        <span className="product-nav-popup">
                                            <img src={`${API_URL}/${navigation.prev.main_image}`} alt={navigation.prev.name} width={110} height={123} />
                                            <span className="product-name">{navigation.prev.name}</span>
                                        </span>
                                    </Link>
                                ) : (
                                    // Hiển thị link không hoạt động nếu không có sản phẩm trước
                                    <span>
                                        <i className="d-icon-arrow-left" /> Sản phẩm trước
                                    </span>
                                )}
                            </li>

                            <li className={`product-nav-next ${!navigation.next ? 'disabled' : ''}`}>
                                {navigation.next ? (
                                    <Link to={`/product/${navigation.next.slug}`}>
                                        Sản phẩm sau
                                        <i className="d-icon-arrow-right" />
                                        <span className="product-nav-popup">
                                            <img src={`${API_URL}/${navigation.next.main_image}`} alt={navigation.next.name} width={110} height={123} />
                                            <span className="product-name">{navigation.next.name}</span>
                                        </span>
                                    </Link>
                                ) : (
                                    <span>
                                        Sản phẩm sau <i className="d-icon-arrow-right" />
                                    </span>
                                )}
                            </li>
                        </ul>
                    </nav>
                    <div className="row gutter-lg">
                        <div className="col-xl-9 col-lg-8">
                            <div className="product product-single row mb-5">
                                <div className="col-md-6">
                                    <ProductGallery images={galleryImages} />
                                </div>
                                <div className="col-md-6">
                                    <div className="product-details pt-3">
                                        <h1 className="product-name">{product.name}</h1>
                                        <div className="product-meta">
                                            SKU:<span className="product-sku mr-3">{product.sku || 'N/A'}</span>
                                            DANH MỤC: <span className="product-brand">{product.ProductCategories?.map((cat) => cat.name).join(', ')}</span>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(product.sale_price)}
                                            </ins>
                                            <del className="old-price">
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(product.price)}
                                            </del>
                                        </div>

                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{ width: ratingWidth }} />
                                                <span className="tooltiptext tooltip-top">{avgRating.toFixed(2)}</span>
                                            </div>
                                            <a href="#product-tab-reviews" onClick={openReviewsTab} className="link-to-tab rating-reviews">
                                                ( {reviews.length} đánh giá )
                                            </a>
                                        </div>

                                        <p className="product-short-desc">{product.short_description}</p>

                                        <hr className="product-divider" />
                                        <div className="product-form product-qty">
                                            <div className="product-form-group">
                                                <div className="input-group mr-2">
                                                    <button className="quantity-minus d-icon-minus" onClick={decrementQuantity} type="button" />
                                                    <input className="quantity form-control" type="number" min={1} max={1000000} value={quantity} readOnly />
                                                    <button className="quantity-plus d-icon-plus" onClick={incrementQuantity} type="button" />
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleAddToCart();
                                                    }}
                                                    className="btn-product btn-cart text-normal ls-normal font-weight-semi-bold"
                                                >
                                                    <i className="d-icon-bag" />
                                                    Thêm vào giỏ hàng
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
                                            <span className="divider" />
                                            <div className="product-action">
                                                <Link type="button" onClick={handleAddToWishlist} className="btn-product btn-wishlist mr-6">
                                                    <i className="d-icon-heart" />
                                                    Thêm vào yêu thích
                                                </Link>
                                                <span className="divider" />
                                                <a href="#" className="btn-product btn-compare">
                                                    <i className="d-icon-compare" />
                                                    So sánh
                                                </a>
                                            </div>
                                        </div>
                                        <hr className="product-divider mb-3" />
                                        <div className="product-meta">
                                            TỪ KHOÁ:{' '}
                                            <span className="product-brand">
                                                {product.Tags?.map((tag) => (
                                                    <span key={tag.id}>
                                                        <a href="#">{tag.name}</a>
                                                    </span>
                                                ))}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tab tab-nav-simple product-tabs" id="product-tabs-root">
                                <ul className="nav nav-tabs justify-content-center" role="tablist">
                                    <li className="nav-item">
                                        <a href="#product-tab-description" role="tab" aria-selected={activeTab === 'description'} className={`nav-link ${activeTab === 'description' ? 'active' : ''}`} onClick={(e) => handleTabClick(e, 'description')}>
                                            Thông tin sản phẩm
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#product-tab-additional" role="tab" aria-selected={activeTab === 'additional'} className={`nav-link ${activeTab === 'additional' ? 'active' : ''}`} onClick={(e) => handleTabClick(e, 'additional')}>
                                            Additional information
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#product-tab-shipping-returns" role="tab" aria-selected={activeTab === 'shipping-returns'} className={`nav-link ${activeTab === 'shipping-returns' ? 'active' : ''}`} onClick={(e) => handleTabClick(e, 'shipping-returns')}>
                                            Shipping &amp; Returns
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#product-tab-reviews" role="tab" aria-selected={activeTab === 'reviews'} className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`} onClick={(e) => handleTabClick(e, 'reviews')}>
                                            Đánh giá ({reviews.length})
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    {/* Description */}
                                    <div id="product-tab-description" role="tabpanel" className={`tab-pane ${activeTab === 'description' ? 'active in' : ''}`}>
                                        {product?.description ? <div className="shop_det_description" dangerouslySetInnerHTML={{ __html: product.description }} /> : <p>Chưa có mô tả cho sản phẩm này.</p>}
                                    </div>

                                    {/* Additional information */}
                                    <div id="product-tab-additional" role="tabpanel" className={`tab-pane ${activeTab === 'additional' ? 'active in' : ''}`}>
                                        {Array.isArray(product?.Attributes) && product.Attributes.length > 0 ? (
                                            <ul className="list-none">
                                                {product.Attributes.map((attr) => (
                                                    <li key={attr.id}>
                                                        <label>{attr.name}:</label>
                                                        <p>{attr.value}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <ul className="list-none">
                                                <li>
                                                    <label>Brands:</label>
                                                    <p>{product?.brand || '—'}</p>
                                                </li>
                                                <li>
                                                    <label>Color:</label>
                                                    <p>{product?.color || '—'}</p>
                                                </li>
                                                <li>
                                                    <label>Size:</label>
                                                    <p>{product?.size || '—'}</p>
                                                </li>
                                            </ul>
                                        )}
                                    </div>

                                    {/* Shipping & Returns */}
                                    <div id="product-tab-shipping-returns" role="tabpanel" className={`tab-pane ${activeTab === 'shipping-returns' ? 'active in' : ''}`}>
                                        <p className="mb-0">
                                            We deliver to over 100 countries around the world. For full details of the delivery options we offer, please view our{' '}
                                            <a className="text-primary" href="#">
                                                Delivery information
                                            </a>
                                            . We hope you’ll love every purchase, but if you ever need to return an item you can do so within a month of receipt. For full details of how to make a return, please view our{' '}
                                            <a className="text-primary" href="#">
                                                Returns information
                                            </a>
                                            .
                                        </p>
                                    </div>
                                    {/* Reviews */}
                                    <div id="product-tab-reviews" role="tabpanel" className={`tab-pane ${activeTab === 'reviews' ? 'active in' : ''}`}>
                                        {product && <ProductReviewSection productId={product.id} />}
                                    </div>
                                </div>
                            </div>
                            {product && <RelatedProducts productId={product.id} />}
                        </div>
                        <aside className="col-xl-3 col-lg-4 sidebar right-sidebar sidebar-fixed sticky-sidebar-wrapper">
                            <div className="sidebar-overlay" />
                            <a className="sidebar-close" href="#">
                                <i className="d-icon-times" />
                            </a>
                            <a href="#" className="sidebar-toggle">
                                <i className="fas fa-chevron-left" />
                            </a>
                            <div className="sidebar-content">
                                <div className="sticky-sidebar">
                                    <div className="widget widget-collapsible widget-vendor-info">
                                        <h3 className="widget-title">Vendor Info</h3>
                                        <ul className="widget-body filter-items">
                                            <li className="store-name">
                                                <span>Store Name:</span>
                                                <span className="details">Vendor</span>
                                            </li>
                                            <li className="seller-name">
                                                <span>Vendor:</span>
                                                <span className="details">John Doe</span>
                                            </li>
                                            <li className="store-address">
                                                <span>Address:</span>
                                                <span className="details">CA</span>
                                            </li>
                                            <li className="clearfix">
                                                <span className="ratings-container">
                                                    <span className="ratings-full" title="Rated 4.65 out of 5">
                                                        <span className="ratings" style={{ width: '90%' }} />
                                                        <span className="tooltiptext tooltip-top" />
                                                    </span>
                                                </span>
                                                <span className="details">4.65 rating from 31 reviews</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="widget widget-collapsible widget-contact-vendor">
                                        <h3 className="widget-title">Contact Vendor</h3>
                                        <div className="widget-body">
                                            <input type="text" className="form-control" id="name" name="name" placeholder="Your Name" required="" />
                                            <input type="text" className="form-control" id="address" name="address" placeholder="you@example.com" required="" />
                                            <textarea id="message" cols={30} rows={6} className="form-control" placeholder="Type your message..." required="" defaultValue={''} />
                                            <a href="#" className="btn btn-dark btn-rounded">
                                                Send Message
                                            </a>
                                        </div>
                                    </div>
                                    <div className="widget widget-products">
                                        <h4 className="widget-title lh-1 border-no text-capitalize ">Vendor's Products</h4>
                                        <div className="widget-body">
                                            <div
                                                className="owl-carousel owl-nav-top"
                                                data-owl-options="{
                                          'items': 1,
                                          'loop': true,
                                          'nav': true,
                                          'dots': false,
                                          'margin': 20											
                                      }"
                                            >
                                                <div className="products-col">
                                                    <div className="product product-list-sm text-center">
                                                        <figure className="product-media">
                                                            <a href="market1-product.html">
                                                                <img src="images/demos/demo-market2/product/14.jpg" alt="product" width={165} height={184} />
                                                            </a>
                                                        </figure>
                                                        <div className="product-details">
                                                            <h3 className="product-name">
                                                                <a href="market1-product.html">Men's Leather Belt</a>
                                                            </h3>
                                                            <div className="product-price">
                                                                <span className="price">$54.00</span>
                                                            </div>
                                                            <div className="ratings-container">
                                                                <div className="ratings-full">
                                                                    <span className="ratings" style={{ width: '80%' }} />
                                                                    <span className="tooltiptext tooltip-top" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product product-list-sm text-center">
                                                        <figure className="product-media">
                                                            <a href="market1-product.html">
                                                                <img src="images/demos/demo-market2/product/15.jpg" alt="product" width={165} height={184} />
                                                            </a>
                                                        </figure>
                                                        <div className="product-details">
                                                            <h3 className="product-name">
                                                                <a href="market1-product.html">Woman’s Comforter</a>
                                                            </h3>
                                                            <div className="product-price">
                                                                <ins className="new-price">$23.12</ins>
                                                                <del className="old-price">$32.45</del>
                                                            </div>
                                                            <div className="ratings-container">
                                                                <div className="ratings-full">
                                                                    <span className="ratings" style={{ width: '60%' }} />
                                                                    <span className="tooltiptext tooltip-top" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product product-list-sm mb-0 text-center">
                                                        <figure className="product-media">
                                                            <a href="market1-product.html">
                                                                <img src="images/demos/demo-market2/product/8.jpg" alt="product" width={165} height={184} />
                                                            </a>
                                                        </figure>
                                                        <div className="product-details">
                                                            <h3 className="product-name">
                                                                <a href="market1-product.html">Girl's Grey Schoolbag</a>
                                                            </h3>
                                                            <div className="product-price">
                                                                <ins className="new-price">$154.21</ins>
                                                                <del className="old-price">$184.63</del>
                                                            </div>
                                                            <div className="ratings-container">
                                                                <div className="ratings-full">
                                                                    <span className="ratings" style={{ width: '100%' }} />
                                                                    <span className="tooltiptext tooltip-top" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* End Products Col */}
                                                <div className="products-col">
                                                    <div className="product product-list-sm text-center">
                                                        <figure className="product-media">
                                                            <a href="market1-product.html">
                                                                <img src="images/demos/demo-market2/product/14.jpg" alt="product" width={165} height={184} />
                                                            </a>
                                                        </figure>
                                                        <div className="product-details">
                                                            <h3 className="product-name">
                                                                <a href="market1-product.html">Men's Leather Belt</a>
                                                            </h3>
                                                            <div className="product-price">
                                                                <span className="price">$54.00</span>
                                                            </div>
                                                            <div className="ratings-container">
                                                                <div className="ratings-full">
                                                                    <span className="ratings" style={{ width: '80%' }} />
                                                                    <span className="tooltiptext tooltip-top" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product product-list-sm text-center">
                                                        <figure className="product-media">
                                                            <a href="market1-product.html">
                                                                <img src="images/demos/demo-market2/product/15.jpg" alt="product" width={165} height={184} />
                                                            </a>
                                                        </figure>
                                                        <div className="product-details">
                                                            <h3 className="product-name">
                                                                <a href="market1-product.html">Woman’s Comforter</a>
                                                            </h3>
                                                            <div className="product-price">
                                                                <ins className="new-price">$23.12</ins>
                                                                <del className="old-price">$32.45</del>
                                                            </div>
                                                            <div className="ratings-container">
                                                                <div className="ratings-full">
                                                                    <span className="ratings" style={{ width: '60%' }} />
                                                                    <span className="tooltiptext tooltip-top" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product product-list-sm mb-0 text-center">
                                                        <figure className="product-media">
                                                            <a href="market1-product.html">
                                                                <img src="images/demos/demo-market2/product/8.jpg" alt="product" width={165} height={184} />
                                                            </a>
                                                        </figure>
                                                        <div className="product-details">
                                                            <h3 className="product-name">
                                                                <a href="market1-product.html">Girl's Grey Schoolbag</a>
                                                            </h3>
                                                            <div className="product-price">
                                                                <ins className="new-price">$154.21</ins>
                                                                <del className="old-price">$184.63</del>
                                                            </div>
                                                            <div className="ratings-container">
                                                                <div className="ratings-full">
                                                                    <span className="ratings" style={{ width: '100%' }} />
                                                                    <span className="tooltiptext tooltip-top" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* End Products Col */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Widget Products */}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductDetailPage;
