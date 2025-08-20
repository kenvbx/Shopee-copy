// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';

function VariationForm({ variant, index, onChange, onRemove, onDataChange, shippingClasses }) {
    const [isOpen, setIsOpen] = React.useState(true);
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const [showSchedule, setShowSchedule] = useState(false);

    // Tự động hiện lịch nếu biến thể đã có ngày khuyến mãi
    useEffect(() => {
        if (variant.sale_start) {
            setShowSchedule(true);
        }
    }, [variant.sale_start]);

    // Hàm handle change nội bộ để truyền index lên component cha
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        onChange(index, name, type === 'checkbox' ? checked : value);
    };

    // Hàm xử lý riêng cho DatePicker
    const handleDateChange = (date, fieldName) => {
        onChange(index, fieldName, date);
    };

    // Hàm hủy lịch
    const handleCancelSchedule = (e) => {
        e.preventDefault();
        setShowSchedule(false);
        onChange(index, 'sale_start', null);
        onChange(index, 'sale_end', null);
    };

    // HÀM MỚI: Xử lý upload ảnh
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Chỉ có thể upload ảnh cho biến thể đã được lưu (có id)
        if (!variant.id) {
            toast.warn('Vui lòng lưu sản phẩm trước khi upload ảnh cho biến thể.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await api.post(`/api/variations/${variant.id}/upload-image`, formData);
            // Cập nhật lại state ở component cha với url ảnh mới
            onChange(index, 'image_url', response.data.image_url);
            toast.success('Upload ảnh cho biến thể thành công!');
        } catch (error) {
            toast.error('Upload ảnh thất bại.');
        }
    };

    const handleGalleryUpload = async (e) => {
        const files = e.target.files;
        if (!files.length) return;
        if (!variant.id) {
            toast.warn('Vui lòng lưu sản phẩm trước khi upload gallery.');
            return;
        }

        const formData = new FormData();
        for (const file of files) {
            formData.append('gallery_images', file);
        }

        try {
            await api.post(`/api/variations/${variant.id}/upload-gallery`, formData);
            toast.success('Upload gallery thành công!');
            onDataChange();
        } catch (error) {
            toast.error('Upload gallery thất bại.');
        }
    };

    return (
        <div className="card mb-3">
            <div className="card-header bg-light d-flex justify-content-between align-items-center" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
                <div className="d-flex">
                    <span style={{ width: '100%' }}>{variant.attribute_title || `Biến thể #${index + 1}`}</span>
                    <input type="text" className="form-control form-control-sm" name="attribute_title" value={variant.attribute_title || ''} onChange={handleChange} />
                </div>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                >
                    Xóa
                </button>
            </div>
            {isOpen && (
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-6">
                            <label>Ảnh đại diện</label>
                            {/* HIỂN THỊ ẢNH HIỆN TẠI */}
                            {variant.image_url && <img src={`${API_URL}/${variant.image_url}`} width="100" className="d-block mb-2" />}
                            {/* Ô UPLOAD MỚI */}
                            <input type="file" className="form-control form-control-sm" onChange={handleImageUpload} accept="image/*" />
                        </div>
                        <div className="col-6">
                            <div className="col-12 mb-3">
                                <label className="form-label">SKU</label>
                                <input type="text" className="form-control form-control-sm" name="sku" value={variant.sku || ''} onChange={handleChange} />
                            </div>
                            <div className="col-12">
                                <label className="form-label">GTIN, UPC, EAN, hoặc ISBN</label>
                                <input type="text" className="form-control form-control-sm" name="barcode" value={variant.barcode || ''} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <hr className="customHr" />

                    <div className="row">
                        <div className="form-check" style={{ width: '20%', marginLeft: '12px', minHeight: 'unset', marginBottom: 0 }}>
                            <input className="form-check-input" type="checkbox" id="gridCheck1" />
                            <label className="form-check-label" htmlFor="gridCheck1">
                                Bật
                            </label>
                        </div>
                        <div style={{ width: '40%', minHeight: 'unset', marginBottom: 0 }} className="form-check">
                            <input className="form-check-input" type="checkbox" name="manage_stock" id={`ms-${index}`} checked={variant.manage_stock} onChange={handleChange} />
                            <label className="form-check-label" htmlFor={`ms-${index}`}>
                                Quản lý tồn kho?
                            </label>
                        </div>
                    </div>

                    <hr className="customHr" />

                    <div className="row g-3 mt-1">
                        <div className="col-12">
                            <label className="form-label">Gallery Ảnh Biến Thể</label>
                            <input type="file" multiple className="form-control form-control-sm" onChange={handleGalleryUpload} accept="image/*" />
                        </div>
                        <div className="col-12 d-flex flex-wrap gap-2">
                            {/* Hiển thị các ảnh gallery đã có */}
                            {variant.GalleryImages?.map((img) => (
                                <div key={img.id} className="position-relative">
                                    <img src={`${API_URL}/${img.url}`} width="100" height="100" style={{ objectFit: 'cover' }} alt="gallery" />
                                    {/* (Nâng cao) Thêm nút xóa cho từng ảnh gallery ở đây */}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="row g-3 mt-3">
                        <div className="col-6">
                            <div className="col-12 mb-3">
                                <label className="form-label">Giá thông thường</label>
                                <input type="number" className="form-control form-control-sm" name="price" value={variant.price || ''} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="col-12 mb-3">
                                <label className="form-label">
                                    Giá khuyến mãi
                                    {!showSchedule && (
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowSchedule(true);
                                            }}
                                            className="ms-1"
                                            style={{ textDecoration: 'underline' }}
                                        >
                                            Lên lịch
                                        </a>
                                    )}
                                    {showSchedule && (
                                        <a href="#" onClick={handleCancelSchedule} className="ms-1" style={{ textDecoration: 'underline' }}>
                                            Hủy lên lịch
                                        </a>
                                    )}
                                </label>
                                <input type="number" className="form-control form-control-sm" name="sale_price" value={variant.sale_price || ''} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    {showSchedule && (
                        <div className="row g-3">
                            <div className="col-6">
                                <label className="form-label">
                                    <strong>Ngày bắt đầu giảm giá</strong>
                                </label>
                                <DatePicker selected={variant.sale_start ? new Date(variant.sale_start) : null} onChange={(date) => handleDateChange(date, 'sale_start')} className="form-control form-control-sm" placeholderText="Từ... YYYY-MM-DD" dateFormat="yyyy-MM-dd" />
                            </div>
                            <div className="col-6">
                                <label className="form-label">
                                    <strong>Ngày kết thúc giảm giá</strong>
                                </label>
                                <DatePicker selected={variant.sale_end ? new Date(variant.sale_end) : null} onChange={(date) => handleDateChange(date, 'sale_end')} minDate={variant.sale_start ? new Date(variant.sale_start) : null} className="form-control form-control-sm" placeholderText="Đến... YYYY-MM-DD" dateFormat="yyyy-MM-dd" />
                            </div>
                        </div>
                    )}

                    {variant.manage_stock ? (
                        <>
                            {/* -- HIỂN THỊ KHI "QUẢN LÝ TỒN KHO" ĐƯỢC CHỌN -- */}
                            <div className="row g-3 mt-1">
                                <div className="col-6">
                                    <label className="form-label">Số lượng tồn kho</label>
                                    <input type="number" className="form-control form-control-sm" name="stock" value={variant.stock || ''} onChange={handleChange} />
                                </div>

                                <div className="col-6">
                                    <label className="form-label">Cho phép đặt hàng trước?</label>
                                    <select className="form-select form-select-sm" name="allow_backorders" value={variant.allow_backorders} onChange={handleChange}>
                                        <option value="no">Không cho phép</option>
                                        <option value="notify">Cho phép, nhưng phải thông báo cho khách hàng</option>
                                        <option value="yes">Cho phép</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row g-3 mt-1">
                                <div className="col-12">
                                    <label className="form-label">Ngưỡng sắp hết hàng</label>
                                    <input type="number" className="form-control form-control-sm" name="low_stock_threshold" value={variant.low_stock_threshold || ''} onChange={handleChange} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="row g-3">
                            {/* -- HIỂN THỊ KHI "QUẢN LÝ TỒN KHO" BỊ BỎ CHỌN -- */}
                            <div className="col-12">
                                <label className="form-label">Trạng thái kho hàng</label>
                                <select className="form-select form-select-sm" name="stock_status" value={variant.stock_status} onChange={handleChange}>
                                    <option value="in_stock">Còn hàng</option>
                                    <option value="out_of_stock">Hết hàng</option>
                                    <option value="on_backorder">Đang chờ hàng</option>
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="row g-3 mt-1">
                        <div className="col-6">
                            <label className="form-label">Cân nặng (kg)</label>
                            <input type="number" className="form-control form-control-sm" name="weight" value={variant.weight || ''} onChange={handleChange} />
                        </div>
                        <div className="col-6">
                            <label className="form-label">Kích cỡ (D×R×C)(cm)</label>
                            <div className="row">
                                <div className="col-4">
                                    <input type="number" className="form-control form-control-sm" name="length" placeholder="Dài" value={variant.length || ''} onChange={handleChange} />
                                </div>
                                <div className="col-4">
                                    <input type="number" className="form-control form-control-sm" name="width" placeholder="Rộng" value={variant.width || ''} onChange={handleChange} />
                                </div>
                                <div className="col-4">
                                    <input type="number" className="form-control form-control-sm" name="height" placeholder="Cao" value={variant.height || ''} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-3 mt-1">
                        <label className="form-label">Lớp vận chuyển</label>
                        <select style={{ marginTop: 0 }} className="form-select form-select-sm" name="shipping_class_id" value={variant.shipping_class_id || ''} onChange={handleChange}>
                            <option value="">-- Không có lớp vận chuyển --</option>
                            {shippingClasses.map((sc) => (
                                <option key={sc.id} value={sc.id}>
                                    {sc.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="row g-3 mt-2">
                        <div className="col-12">
                            <label>Mô tả</label>
                            <textarea class="form-control" id="inputAddress4" rows="3" placeholder="Address" name="attribute_description" value={variant.attribute_description || ''} onChange={handleChange}></textarea>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default VariationForm;
