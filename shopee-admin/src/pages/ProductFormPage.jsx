// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CreatableSelect from 'react-select/creatable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import VariationForm from '../components/VariationForm';

/**
 * Hàm helper để xây dựng cấu trúc cây cho danh mục
 * @param {Array} categories - Mảng danh mục phẳng từ API
 * @param {number|null} parentId - ID của danh mục cha
 * @param {number} level - Cấp độ sâu của danh mục
 * @returns {Array} - Mảng danh mục đã được sắp xếp và có thêm thuộc tính `level`
 */
const buildCategoryHierarchy = (categories, parentId = null, level = 0) => {
    const result = [];
    const children = categories.filter((cat) => cat.parent_id === parentId);
    for (const child of children) {
        result.push({ ...child, level });
        const grandChildren = buildCategoryHierarchy(categories, child.id, level + 1);
        result.push(...grandChildren);
    }
    return result;
};

function ProductFormPage() {
    // =================================================================
    // SECTION: KHAI BÁO STATE
    // =================================================================
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    // State chính cho dữ liệu sản phẩm
    const [product, setProduct] = useState({
        name: '',
        product_type: 'simple',
        description: '',
        short_description: '',
        price: 0,
        sale_price: '',
        sale_start: null,
        sale_end: null,
        sku: '',
        barcode: '',
        manage_stock: true,
        stock_status: 'in_stock',
        allow_backorders: 'no',
        low_stock_threshold: '',
        stock: 0,
        category_ids: [],
        brand_id: '',
        seller_id: '',
        tags: [],
        shipping_class_id: '',
        up_sell_ids: [],
        cross_sell_ids: [],
        purchase_note: '',
        menu_order: 0,
        enable_reviews: true,
        status: 'active',
        default_variation_title: '',
    });

    // States cho các dữ liệu phụ (dùng cho các ô select, upload, ...)
    const [categories, setCategories] = useState([]);
    const [displayCategories, setDisplayCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [shippingClasses, setShippingClasses] = useState([]);
    const [productList, setProductList] = useState([]);
    const [allAttributes, setAllAttributes] = useState([]);

    // States cho các tính năng UI động
    const [mainImageFile, setMainImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [albumFiles, setAlbumFiles] = useState([]);
    const [albumPreviews, setAlbumPreviews] = useState([]);
    const [showSaleSchedule, setShowSaleSchedule] = useState(false);
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', parent_id: '' });
    const [productAttributes, setProductAttributes] = useState([]);
    const [variations, setVariations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // =================================================================
    // SECTION: TẢI DỮ LIỆU (DATA FETCHING)
    // =================================================================
    const fetchProductDetails = useCallback(async () => {
        if (isEditMode) {
            try {
                const response = await api.get(`/api/products/${id}`);
                const productData = response.data;
                const defaultVarTitle = productData.DefaultVariation?.attribute_title || '';
                // Xử lý dữ liệu phức tạp từ API
                const categoryIds = productData.ProductCategories?.map((cat) => cat.id) || [];
                const tagNames = productData.Tags?.map((tag) => tag.name) || [];
                const upSellIds = productData.up_sell_ids ? productData.up_sell_ids.split(',').map(Number) : [];
                const crossSellIds = productData.cross_sell_ids ? productData.cross_sell_ids.split(',').map(Number) : [];

                const attributesFromServer = {};
                if (productData.AttributeValues) {
                    productData.AttributeValues.forEach((value) => {
                        const parentAttr = value.Attribute;
                        if (!parentAttr) return;
                        if (!attributesFromServer[parentAttr.id]) {
                            attributesFromServer[parentAttr.id] = { id: parentAttr.id, name: parentAttr.name, values: [], isVisible: true, isCustom: false };
                        }
                        attributesFromServer[parentAttr.id].values.push(value.value);
                    });
                }
                setProductAttributes(Object.values(attributesFromServer));

                if (productData.sale_start) setShowSaleSchedule(true);
                setVariations(productData.Variations || []);

                setProduct({
                    ...productData,
                    category_ids: categoryIds,
                    tags: tagNames,
                    default_variation_title: defaultVarTitle,
                    up_sell_ids: upSellIds,
                    cross_sell_ids: crossSellIds,
                    sale_start: productData.sale_start ? new Date(productData.sale_start) : null,
                    sale_end: productData.sale_end ? new Date(productData.sale_end) : null,
                });
            } catch (error) {
                toast.error('Không thể tải dữ liệu sản phẩm!');
            }
        }
    }, [id, isEditMode]);

    useEffect(() => {
        const fetchDataForForm = async () => {
            setIsLoading(true);
            try {
                // Tải song song dữ liệu cho các ô select
                const [catRes, brandRes, sellerRes, shippingRes, attrRes, productListRes] = await Promise.all([api.get('/api/product-categories?nopagination=true'), api.get('/api/brands?nopagination=true'), api.get('/api/sellers'), api.get('/api/shipping-classes'), api.get('/api/attributes'), api.get('/api/products?nopagination=true')]);

                setCategories(catRes.data);
                setBrands(brandRes.data);
                setSellers(sellerRes.data);
                setShippingClasses(shippingRes.data);
                setAllAttributes(attrRes.data);
                setProductList(productListRes.data.data.map((p) => ({ value: p.id, label: p.name })));

                // Sau khi tải xong dữ liệu select, gọi hàm để tải chi tiết sản phẩm nếu cần
                fetchProductDetails();
            } catch (error) {
                toast.error('Lỗi khi tải dữ liệu cho trang.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDataForForm();
    }, [fetchProductDetails]);

    /**
     * GHI CHÚ: useEffect này vẫn cần thiết để xây dựng cây danh mục
     * mỗi khi danh sách danh mục gốc thay đổi.
     */
    useEffect(() => {
        if (categories.length > 0) {
            const hierarchicalList = buildCategoryHierarchy(categories);
            setDisplayCategories(hierarchicalList);
        }
    }, [categories]);

    // =================================================================
    // SECTION: CÁC HÀM XỬ LÝ SỰ KIỆN (EVENT HANDLERS)
    // =================================================================

    // --- Handlers chung ---
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const finalValue = type === 'checkbox' ? checked : value;
        setProduct((prev) => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cleanAttributes = productAttributes.map(({ id, name, values, isVisible }) => {
            // Nếu là thuộc tính tùy chỉnh (id là chuỗi), chỉ gửi name
            if (typeof id === 'string' && id.startsWith('custom_')) {
                return { name, values, isVisible };
            }
            // Nếu là thuộc tính có sẵn, chỉ gửi id
            return { id, values, isVisible };
        });

        const payload = {
            ...product,
            attributes: cleanAttributes,
            variations: variations,
        };

        try {
            let savedProduct;
            // Quyết định gọi API nào dựa trên isEditMode
            if (isEditMode) {
                const response = await api.put(`/api/products/${id}`, payload);
                savedProduct = response.data;
                toast.success('Cập nhật sản phẩm thành công!');
                fetchProductDetails();
            } else {
                const response = await api.post('/api/products', payload);
                savedProduct = response.data;
                toast.success('Tạo sản phẩm thành công!');
            }

            if (mainImageFile) {
                const uploadData = new FormData();
                uploadData.append('main_image', mainImageFile);
                await api.post(`/api/products/${savedProduct.id}/upload-image`, uploadData);
            }

            if (albumFiles.length > 0) {
                const uploadData = new FormData();
                albumFiles.forEach((file) => {
                    uploadData.append('album_images', file);
                });
                await api.post(`/api/products/${savedProduct.id}/upload-album`, uploadData);
            }

            // if (product.product_type === 'variable') {
            //     await api.put(`/api/products/${savedProduct.id}/variations`, variations);
            // }
            fetchProductDetails();
            // navigate('/products');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra.';
            toast.error(`Lỗi: ${errorMessage}`);
        }
    };

    // --- Handlers cho Editor & Date ---
    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setProduct((prev) => ({ ...prev, description: data }));
    };

    const handleDateChange = (date, fieldName) => {
        setProduct((prev) => ({ ...prev, [fieldName]: date }));
    };

    const handleCancelSchedule = (e) => {
        e.preventDefault();
        setShowSaleSchedule(false);
        setProduct((prev) => ({ ...prev, sale_start: null, sale_end: null }));
    };

    // --- Handlers cho Hình ảnh ---
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMainImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleAlbumFilesChange = (e) => {
        const files = Array.from(e.target.files);
        setAlbumFiles(files);

        // Tạo URL xem trước
        const previews = files.map((file) => URL.createObjectURL(file));
        setAlbumPreviews(previews);
    };

    const handleDeleteExistingImage = async (imageId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa hình ảnh này?')) {
            try {
                await api.delete(`/api/products/album-image/${imageId}`);
                toast.success('Xóa ảnh thành công!');

                // Cập nhật lại state để UI thay đổi ngay lập tức
                setProduct((prev) => ({
                    ...prev,
                    ProductImages: prev.ProductImages.filter((img) => img.id !== imageId),
                }));
            } catch (error) {
                toast.error('Xóa ảnh thất bại.');
                console.error('Lỗi xóa ảnh:', error);
            }
        }
    };

    // --- Handlers cho Danh mục, Tags, Sản phẩm liên kết ---
    const handleCategoryChange = (categoryId) => {
        const currentCategoryIds = product.category_ids;
        if (currentCategoryIds.includes(categoryId)) {
            // Nếu đã chọn thì bỏ chọn
            setProduct((prev) => ({
                ...prev,
                category_ids: currentCategoryIds.filter((id) => id !== categoryId),
            }));
        } else {
            // Nếu chưa chọn thì thêm vào
            setProduct((prev) => ({ ...prev, category_ids: [...currentCategoryIds, categoryId] }));
        }
    };

    const handleTagsChange = (selectedOptions) => {
        // Chuyển đổi từ format của react-select {value, label} về mảng các chuỗi
        const tagValues = selectedOptions ? selectedOptions.map((option) => option.value) : [];
        setProduct((prev) => ({ ...prev, tags: tagValues }));
    };

    const handleProductSelectChange = (selectedOptions, fieldName) => {
        const ids = selectedOptions ? selectedOptions.map((option) => option.value) : [];
        setProduct((prev) => ({ ...prev, [fieldName]: ids }));
    };

    const handleAddNewCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.name) {
            toast.warn('Vui lòng nhập tên danh mục.');
            return;
        }
        try {
            const response = await api.post('/api/product-categories', newCategory);
            toast.success('Thêm danh mục mới thành công!');

            // Tự động chọn danh mục vừa tạo
            handleCategoryChange(response.data.id);

            // Reset và ẩn form thêm nhanh
            setNewCategory({ name: '', parent_id: '' });
            setShowAddCategoryForm(false);

            // Tải lại toàn bộ danh sách để cập nhật
            fetchAllData();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Lỗi khi thêm danh mục.';
            toast.error(errorMessage);
        }
    };

    const handleNewCategoryChange = (e) => {
        setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
    };

    // --- Handlers cho Thuộc tính & Biến thể ---
    const handleAddAttribute = (selectedOption) => {
        if (selectedOption && !productAttributes.find((attr) => attr.id === selectedOption.value)) {
            const attribute = allAttributes.find((attr) => attr.id === selectedOption.value);
            setProductAttributes((prev) => [
                ...prev,
                {
                    id: attribute.id,
                    name: attribute.name,
                    values: [], // Các giá trị sẽ được nhập vào textarea
                    isVisible: true,
                },
            ]);
        }
    };

    const handleAddCustomAttribute = () => {
        setProductAttributes((prev) => [
            ...prev,
            {
                id: `custom_${Date.now()}`, // ID tạm thời để React nhận diện
                name: '', // Tên sẽ do người dùng nhập
                values: [],
                isCustom: true, // Đánh dấu đây là thuộc tính tùy chỉnh
                isVisible: true,
            },
        ]);
    };

    const handleRemoveAttribute = (attributeId) => {
        setProductAttributes((prev) => prev.filter((attr) => attr.id !== attributeId));
    };

    const handleAttributeConfigChange = (attributeId, field, data) => {
        setProductAttributes((prev) =>
            prev.map((attr) => {
                if (attr.id !== attributeId) return attr;

                // Nếu thay đổi đến từ ô select giá trị
                if (field === 'values') {
                    // `data` là một mảng các object {value, label} từ react-select
                    const newValues = data ? data.map((option) => option.value) : [];
                    return { ...attr, values: newValues };
                }

                // Nếu thay đổi đến từ checkbox
                return { ...attr, [field]: data };
            })
        );
    };

    const handleGenerateVariations = async () => {
        if (!id) {
            toast.warn('Vui lòng lưu sản phẩm trước khi tạo biến thể.');
            return;
        }

        try {
            // --- BƯỚC 1: LƯU CẤU HÌNH THUỘC TÍNH HIỆN TẠI ---
            const cleanAttributes = productAttributes.map(({ id, name, values, isVisible }) => {
                if (typeof id === 'string' && id.startsWith('custom_')) {
                    return { name, values, isVisible };
                }
                return { id, values, isVisible };
            });

            // Gửi cấu hình thuộc tính mới nhất lên server
            await api.put(`/api/products/${id}/attributes`, { attributes: cleanAttributes });
            toast.info('Đã lưu cấu hình thuộc tính.');

            // --- BƯỚC 2: TẠO BIẾN THỂ ---
            await api.post(`/api/products/${id}/generate-variations`);
            toast.success('Đã tạo các biến thể thành công!');

            // --- BƯỚC 3: TẢI LẠI DỮ LIỆU ---
            fetchProductDetails(); // Dùng hàm đã có để làm mới toàn bộ form
        } catch (error) {
            console.error('Lỗi khi tạo biến thể:', error);
            toast.error('Lỗi khi tạo biến thể.');
        }
    };

    // HÀM Thêm một dòng biến thể trống
    const handleAddVariation = () => {
        setVariations((prev) => [
            ...prev,
            {
                // Dùng Date.now() làm key tạm thời cho React
                temp_id: Date.now(),
                attribute_title: '',
                attribute_description: '',
                sku: '',
                barcode: '',
                price: '',
                sale_price: '',
                sale_start: null,
                sale_end: null,
                stock: '',
                image_url: '',
                manage_stock: true,
                stock_status: 'in_stock',
                allow_backorders: 'no',
                weight: '',
                length: '',
                width: '',
                height: '',
                shipping_class_id: '',
            },
        ]);
    };

    // HÀM Xóa một dòng biến thể
    const handleRemoveVariation = (idToRemove) => {
        setVariations((prev) =>
            prev.filter((variant) => {
                // Nếu biến thể có ID thật, so sánh với ID thật
                if (variant.id) {
                    return variant.id !== idToRemove;
                }
                // Nếu không, so sánh với ID tạm thời
                return variant.temp_id !== idToRemove;
            })
        );
    };

    const handleVariationChange = (index, field, value) => {
        const updatedVariations = [...variations];
        updatedVariations[index][field] = value;
        setVariations(updatedVariations);
    };

    // =================================================================
    // SECTION: RENDER GIAO DIỆN (JSX)
    // =================================================================
    if (isLoading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    return (
        <div className="row">
            <div className="col-lg-12 mx-auto">
                <div className="card">
                    <div className="card-header py-3 bg-transparent">
                        <div className="d-sm-flex align-items-center">
                            <h5 className="mb-2 mb-sm-0">{isEditMode ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h5>
                            <div className="ms-auto">
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                    {isEditMode ? 'Lưu Thay Đổi' : 'Xuất Bản Ngay'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-12 col-lg-9">
                                <div className="card shadow-none bg-light border">
                                    <div className="card-body">
                                        <form className="row g-3" onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                <label className="form-label">Tên sản phẩm</label>
                                                <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label">Mô tả ngắn</label>
                                                <textarea className="form-control" name="short_description" rows={4} value={product.short_description} onChange={handleChange} />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label">Mô tả sản phẩm</label>
                                                <CKEditor editor={ClassicEditor} data={product.description} onChange={handleDescriptionChange} rows={8} />
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="card shadow-none bg-light border radius-10 w-100">
                                    <div className="card-header bg-transparent">
                                        <div className="row g-3 align-items-center">
                                            <div className="col-3">
                                                <h5 className="mb-0">Dữ liệu sản phẩm</h5>
                                            </div>
                                            <div classname="col-1" style={{ width: '3%' }}>
                                                <span>-</span>
                                            </div>
                                            <div className="col-5">
                                                <select className="form-select form-select-sm" id="product-type" name="product_type" value={product.product_type} onChange={handleChange}>
                                                    <optgroup label="Loại sản phẩm">
                                                        <option value="simple">Sản phẩm đơn giản</option>
                                                        <option value="grouped">Sản phẩm theo nhóm</option>
                                                        <option value="external">Sản phẩm bên ngoài/liên kết</option>
                                                        <option value="variable">Sản phẩm có biến thể</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body card-body-custom">
                                        <div className="row">
                                            <div className="col-4">
                                                <ul className="nav nav-pills mb-3" role="tablist">
                                                    {(product.product_type === 'simple' || product.product_type === 'external') && (
                                                        // Cài đặt chung
                                                        <li className="nav-item" role="presentation">
                                                            <a className="nav-link active" data-bs-toggle="pill" href="#general_product_data" role="tab" aria-selected="true">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="tab-icon">
                                                                        <i className="bx bx-home font-18 me-1" />
                                                                    </div>
                                                                    <div className="tab-title">Cài đặt chung</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    )}

                                                    {(product.product_type === 'simple' || product.product_type === 'grouped' || product.product_type === 'external' || product.product_type === 'variable') && (
                                                        // Kiểm kê kho hàng
                                                        <li className="nav-item" role="presentation">
                                                            <a className="nav-link" data-bs-toggle="pill" href="#inventory_product_data" role="tab" aria-selected="false">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="tab-icon">
                                                                        <i className="bx bx-user-pin font-18 me-1" />
                                                                    </div>
                                                                    <div className="tab-title">Kiểm kê kho hàng</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    )}

                                                    {(product.product_type === 'simple' || product.product_type === 'variable') && (
                                                        // Vận chuyển
                                                        <li className="nav-item" role="presentation">
                                                            <a className="nav-link" data-bs-toggle="pill" href="#shipping_product_data" role="tab" aria-selected="false">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="tab-icon">
                                                                        <i className="lni lni-car font-18 me-1" />
                                                                    </div>
                                                                    <div className="tab-title">Vận chuyển</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    )}

                                                    {(product.product_type === 'simple' || product.product_type === 'grouped' || product.product_type === 'external' || product.product_type === 'variable') && (
                                                        // Sản phẩm được liên kết
                                                        <li className="nav-item" role="presentation">
                                                            <a className="nav-link" data-bs-toggle="pill" href="#linked_product_data" role="tab" aria-selected="false">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="tab-icon">
                                                                        <i className="bx bx-microphone font-18 me-1" />
                                                                    </div>
                                                                    <div className="tab-title">Sản phẩm được liên kết</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    )}

                                                    {(product.product_type === 'simple' || product.product_type === 'grouped' || product.product_type === 'external' || product.product_type === 'variable') && (
                                                        // Thuộc tính
                                                        <li className="nav-item" role="presentation">
                                                            <a className="nav-link" data-bs-toggle="pill" href="#product_attributes" role="tab" aria-selected="false">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="tab-icon">
                                                                        <i className="bx bx-microphone font-18 me-1" />
                                                                    </div>
                                                                    <div className="tab-title">Thuộc tính</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    )}

                                                    {product.product_type === 'variable' && (
                                                        <li className="nav-item" role="presentation">
                                                            <a className="nav-link" data-bs-toggle="pill" href="#variable_product_options" role="tab" aria-selected="false">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="tab-icon">
                                                                        <i className="bx bx-microphone font-18 me-1" />
                                                                    </div>
                                                                    <div className="tab-title">Các biến thể</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    )}

                                                    {(product.product_type === 'simple' || product.product_type === 'grouped' || product.product_type === 'external' || product.product_type === 'variable') && (
                                                        // Nâng cao
                                                        <li className="nav-item" role="presentation">
                                                            <a className="nav-link" data-bs-toggle="pill" href="#advanced_product_data" role="tab" aria-selected="false">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="tab-icon">
                                                                        <i className="bx bx-microphone font-18 me-1" />
                                                                    </div>
                                                                    <div className="tab-title">Nâng cao</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                            <div className="col-8">
                                                <div className="tab-content mt-2 me-2" id="pills-tabContent">
                                                    {(product.product_type === 'simple' || product.product_type === 'external') && (
                                                        // Cài đặt chung
                                                        <div className="tab-pane fade show active" id="general_product_data" role="tabpanel">
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label">Giá thông thường</label>
                                                                <div className="col-sm-8">
                                                                    <input type="number" className="form-control form-control-sm" name="price" value={product.price} onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                            <div className="row mt-3">
                                                                <label className="col-sm-4 col-form-label">Giá khuyến mãi</label>
                                                                <div className="col-sm-8">
                                                                    <input type="number" className="form-control form-control-sm" name="sale_price" value={product.sale_price} onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                            {/* 5. Logic hiển thị nút Lên lịch / Hủy */}
                                                            {!showSaleSchedule ? (
                                                                <div className="row">
                                                                    <label className="col-sm-4 col-form-label"></label>
                                                                    <div className="col-sm-8">
                                                                        <a
                                                                            href="#"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                setShowSaleSchedule(true);
                                                                            }}
                                                                            className="d-block mt-2"
                                                                        >
                                                                            Lên lịch
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <div className="row mt-3">
                                                                        <label className="col-sm-4 col-form-label">Ngày áp dụng giá khuyến mãi</label>
                                                                        <div className="col-sm-8">
                                                                            <DatePicker selected={product.sale_start} onChange={(date) => handleDateChange(date, 'sale_start')} selectsStart startDate={product.sale_start} endDate={product.sale_end} className="form-control form-control-sm" placeholderText="Từ... YYYY-MM-DD" dateFormat="yyyy-MM-dd" />
                                                                            <DatePicker selected={product.sale_end} onChange={(date) => handleDateChange(date, 'sale_end')} selectsEnd startDate={product.sale_start} endDate={product.sale_end} minDate={product.sale_start} className="form-control form-control-sm mt-3" placeholderText="Đến... YYYY-MM-DD" dateFormat="yyyy-MM-dd" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <label className="col-sm-4 col-form-label"></label>
                                                                        <div className="col-sm-8">
                                                                            <a href="#" onClick={handleCancelSchedule} className="d-block mt-2">
                                                                                Hủy
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    )}

                                                    {(product.product_type === 'simple' || product.product_type === 'grouped' || product.product_type === 'external' || product.product_type === 'variable') && (
                                                        // Kiểm kê kho hàng
                                                        <div className="tab-pane fade" id="inventory_product_data" role="tabpanel">
                                                            <div className="row mb-3">
                                                                <label className="col-sm-4 col-form-label">SKU</label>
                                                                <div className="col-sm-8">
                                                                    <input type="text" className="form-control form-control-sm" name="sku" value={product.sku} onChange={handleChange} />
                                                                </div>
                                                            </div>

                                                            <div className="row mb-3">
                                                                <label className="col-sm-4 col-form-label">GTIN, UPC, EAN, hoặc ISBN</label>
                                                                <div className="col-sm-8">
                                                                    <input type="text" className="form-control form-control-sm" name="barcode" value={product.barcode} onChange={handleChange} />
                                                                </div>
                                                            </div>

                                                            <div className="row mb-3">
                                                                <label className="col-sm-4 col-form-label">Quản lý tồn kho</label>
                                                                <div className="col-sm-8">
                                                                    <div className="form-check mt-1">
                                                                        <input className="form-check-input" type="checkbox" name="manage_stock" id="manageStockCheck" checked={product.manage_stock} onChange={handleChange} />
                                                                        <label className="form-check-label" htmlFor="manageStockCheck">
                                                                            Theo dõi số lượng tồn kho?
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {product.manage_stock ? (
                                                                <>
                                                                    {/* HIỂN THỊ KHI QUẢN LÝ TỒN KHO */}
                                                                    <div className="row mb-3">
                                                                        <label className="col-sm-4 col-form-label">Số lượng</label>
                                                                        <div className="col-sm-8">
                                                                            <input type="number" className="form-control form-control-sm" name="stock" value={product.stock} onChange={handleChange} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-3">
                                                                        <label className="col-sm-4 col-form-label">Cho phép đặt hàng trước</label>
                                                                        <div className="col-sm-8">
                                                                            <div className="mt-2">
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio" name="allow_backorders" id="backordersNo" value="no" checked={product.allow_backorders === 'no'} onChange={handleChange} />
                                                                                    <label className="form-check-label" htmlFor="backordersNo">
                                                                                        Không cho phép
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio" name="allow_backorders" id="backordersNotify" value="notify" checked={product.allow_backorders === 'notify'} onChange={handleChange} />
                                                                                    <label className="form-check-label" htmlFor="backordersNotify">
                                                                                        Cho phép, nhưng phải thông báo cho khách hàng
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio" name="allow_backorders" id="backordersYes" value="yes" checked={product.allow_backorders === 'yes'} onChange={handleChange} />
                                                                                    <label className="form-check-label" htmlFor="backordersYes">
                                                                                        Cho phép
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-3">
                                                                        <label className="col-sm-4 col-form-label">Ngưỡng sắp hết hàng</label>
                                                                        <div className="col-sm-8">
                                                                            <input type="number" className="form-control form-control-sm" name="low_stock_threshold" value={product.low_stock_threshold || ''} onChange={handleChange} />
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-4 col-form-label">Trạng thái kho hàng</label>
                                                                    <div className="col-sm-8">
                                                                        <div className="mt-2">
                                                                            <div className="form-check">
                                                                                <input className="form-check-input" type="radio" name="stock_status" id="statusInStock" value="in_stock" checked={product.stock_status === 'in_stock'} onChange={handleChange} />
                                                                                <label className="form-check-label" htmlFor="statusInStock">
                                                                                    Còn hàng
                                                                                </label>
                                                                            </div>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input" type="radio" name="stock_status" id="statusOutOfStock" value="out_of_stock" checked={product.stock_status === 'out_of_stock'} onChange={handleChange} />
                                                                                <label className="form-check-label" htmlFor="statusOutOfStock">
                                                                                    Hết hàng
                                                                                </label>
                                                                            </div>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input" type="radio" name="stock_status" id="statusOnBackorder" value="on_backorder" checked={product.stock_status === 'on_backorder'} onChange={handleChange} />
                                                                                <label className="form-check-label" htmlFor="statusOnBackorder">
                                                                                    Đang chờ hàng
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <hr />
                                                            <div className="row mb-3">
                                                                <label className="col-sm-4 col-form-label">Bán riêng lẻ</label>
                                                                <div className="col-sm-8">
                                                                    <div className="form-check mt-1">
                                                                        <input className="form-check-input" type="checkbox" name="sold_individually" id="sold_individually" checked={product.sold_individually} onChange={handleChange} />
                                                                        <label className="form-check-label" htmlFor="sold_individually">
                                                                            Giới hạn mua 1 sản phẩm mỗi đơn hàng
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {(product.product_type === 'simple' || product.product_type === 'variable') && (
                                                        // Vận chuyển
                                                        <div className="tab-pane fade" id="shipping_product_data" role="tabpanel">
                                                            <div className="row mb-3">
                                                                <label className="col-sm-4 col-form-label">Cân nặng</label>
                                                                <div className="col-sm-8">
                                                                    <input type="number" className="form-control form-control-sm" name="weight" value={product.weight} onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-3">
                                                                <label className="col-sm-4 col-form-label">Kích thước</label>
                                                                <div className="col-sm-8">
                                                                    <div className="row">
                                                                        <div className="col-sm-4">
                                                                            <input type="number" className="form-control form-control-sm" name="length" value={product.length} onChange={handleChange} />
                                                                        </div>
                                                                        <div className="col-sm-4">
                                                                            <input type="number" className="form-control form-control-sm" name="width" value={product.width} onChange={handleChange} />
                                                                        </div>
                                                                        <div className="col-sm-4">
                                                                            <input type="number" className="form-control form-control-sm" name="height" value={product.height} onChange={handleChange} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className="row mb-3">
                                                                <label className="col-sm-4 col-form-label">Lớp vận chuyển</label>
                                                                <div className="col-sm-8">
                                                                    <select className="form-select form-select-sm" name="shipping_class_id" value={product.shipping_class_id} onChange={handleChange}>
                                                                        <option value="">-- Không có lớp vận chuyển --</option>
                                                                        {shippingClasses.map((sc) => (
                                                                            <option key={sc.id} value={sc.id}>
                                                                                {sc.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {(product.product_type === 'simple' || product.product_type === 'grouped' || product.product_type === 'external' || product.product_type === 'variable') && (
                                                        // Sản phẩm được liên kết
                                                        <div className="tab-pane fade" id="linked_product_data" role="tabpanel">
                                                            <div className="row mb-3">
                                                                <label className="col-sm-4 col-form-label">Bán thêm</label>
                                                                <div className="col-sm-8">
                                                                    <Select isMulti options={productList.filter((p) => p.value !== product.id)} value={productList.filter((p) => product.up_sell_ids.includes(p.value))} onChange={(options) => handleProductSelectChange(options, 'up_sell_ids')} placeholder="Tìm và chọn sản phẩm..." />
                                                                </div>
                                                            </div>

                                                            <div className="row mb-3">
                                                                <label className="col-sm-4 col-form-label">Bán chéo</label>
                                                                <div className="col-sm-8">
                                                                    <Select isMulti options={productList.filter((p) => p.value !== product.id)} value={productList.filter((p) => product.cross_sell_ids.includes(p.value))} onChange={(options) => handleProductSelectChange(options, 'cross_sell_ids')} placeholder="Tìm và chọn sản phẩm..." />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {(product.product_type === 'simple' || product.product_type === 'grouped' || product.product_type === 'external' || product.product_type === 'variable') && (
                                                        // Thuộc tính
                                                        <div className="tab-pane fade" id="product_attributes" role="tabpanel">
                                                            <div className="card-body">
                                                                <div className="d-flex gap-2 mb-3">
                                                                    <button type="button" className="btn btn-secondary" onClick={handleAddCustomAttribute}>
                                                                        Thêm mới
                                                                    </button>
                                                                    <div className="flex-grow-1">
                                                                        <Select options={allAttributes.map((attr) => ({ value: attr.id, label: attr.name }))} onChange={handleAddAttribute} placeholder="Thêm thuộc tính hiện có" />
                                                                    </div>
                                                                </div>

                                                                {/* Render các khối thuộc tính đã được thêm */}
                                                                {productAttributes.map((attr, index) => {
                                                                    // Tìm thuộc tính tương ứng trong danh sách allAttributes để lấy các giá trị có sẵn
                                                                    const attributeWithOptions = allAttributes.find((a) => a.id === attr.id);
                                                                    const availableOptions =
                                                                        attributeWithOptions?.values.map((val) => ({
                                                                            value: val.value,
                                                                            label: val.value,
                                                                        })) || [];

                                                                    return (
                                                                        <div key={attr.id} className="card mb-2">
                                                                            <div className="card-header d-flex justify-content-between">
                                                                                {/* Nếu là thuộc tính tùy chỉnh, hiển thị ô input */}
                                                                                {attr.isCustom ? <input type="text" className="form-control" placeholder="Tên thuộc tính (ví dụ: Chất liệu)" value={attr.name} onChange={(e) => handleAttributeConfigChange(attr.id, 'name', e.target.value)} /> : <span>{attr.name}</span>}
                                                                                <button type="button" className="btn-close" onClick={() => handleRemoveAttribute(attr.id)}></button>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <div className="form-group">
                                                                                    <label>Giá trị (s):</label>

                                                                                    {/* --- THAY THẾ TEXTAREA BẰNG CREATABLESELECT --- */}
                                                                                    <CreatableSelect
                                                                                        isMulti
                                                                                        options={availableOptions}
                                                                                        // Chuyển đổi mảng chuỗi `attr.values` sang định dạng của react-select
                                                                                        value={attr.values.map((v) => ({ value: v, label: v }))}
                                                                                        onChange={(selectedOptions) => handleAttributeConfigChange(attr.id, 'values', selectedOptions)}
                                                                                        placeholder="Chọn hoặc tạo giá trị mới..."
                                                                                    />
                                                                                </div>
                                                                                <div className="form-check mt-2">{/* ... checkbox 'Có thể nhìn thấy...' ... */}</div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {product.product_type === 'variable' && (
                                                        // Tạo biến thể
                                                        <div className="tab-pane fade show active" id="variable_product_options" role="tabpanel">
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label">Giá trị form mặc định:</label>
                                                                <div className="col-sm-8">
                                                                    <select
                                                                        className="form-select form-select-sm"
                                                                        name="default_variation_title"
                                                                        value={product.default_variation_title || ''} // Đảm bảo luôn có giá trị fallback
                                                                        onChange={handleChange}
                                                                    >
                                                                        <option value="">Không có mặc định</option>
                                                                        {variations.map((variant, index) => (
                                                                            <option key={variant.id || variant.temp_id} value={variant.attribute_title}>
                                                                                {/* Sửa lại logic hiển thị ở đây */}
                                                                                {variant.attribute_title || `Biến thể #${index + 1} (chưa có mô tả)`}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <hr className="customHr" />
                                                            <div className="d-flex">
                                                                <button type="button" className="btn btn-primary" onClick={handleAddVariation}>
                                                                    Thêm biến thể
                                                                </button>
                                                            </div>
                                                            <hr className="customHr" />
                                                            {variations.map((variant, index) => (
                                                                <VariationForm key={variant.temp_id || variant.id} index={index} variant={variant} onChange={handleVariationChange} onRemove={() => handleRemoveVariation(variant.temp_id || variant.id)} shippingClasses={shippingClasses} onDataChange={fetchProductDetails} />
                                                            ))}
                                                        </div>
                                                    )}
                                                    {(product.product_type === 'simple' || product.product_type === 'grouped' || product.product_type === 'external' || product.product_type === 'variable') && (
                                                        // Nâng cao
                                                        <div className="tab-pane fade" id="advanced_product_data" role="tabpanel">
                                                            <div className="row mb-3">
                                                                <label className="col-sm-4 col-form-label">Ghi chú mua hàng</label>
                                                                <div className="col-sm-8">
                                                                    <textarea className="form-control" name="purchase_note" rows={3} placeholder="Ghi chú cho khách hàng sau khi mua hàng" value={product.purchase_note || ''} onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className="row mb-3">
                                                                <label className="col-sm-4 col-form-label">Menu đơn hàng</label>
                                                                <div className="col-sm-8">
                                                                    <input type="number" className="form-control form-control-sm" name="menu_order" value={product.menu_order} onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className="row mb-3">
                                                                <label className="col-sm-4 col-form-label">Bật đánh giá</label>
                                                                <div className="col-sm-8">
                                                                    <input className="form-check-input" type="checkbox" name="enable_reviews" id="enableReviewsCheck" checked={product.enable_reviews} onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-3">
                                <div className="card shadow-none bg-light border">
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <label className="form-label">Ảnh đại diện</label>
                                                <input className="form-control" type="file" onChange={handleFileChange} accept="image/*" />
                                            </div>

                                            {/* Phần xem trước ảnh cần cập nhật một chút */}
                                            {previewUrl ? (
                                                <img src={previewUrl} alt="Xem trước" style={{}} />
                                            ) : isEditMode && product.main_image ? ( // <-- Hiển thị ảnh cũ khi sửa
                                                <img src={`${API_URL}/${product.main_image}`} alt="Ảnh hiện tại" style={{}} />
                                            ) : null}

                                            <div className="card shadow-none bg-light border">
                                                <div className="card-body">
                                                    <div className="col-12">
                                                        <label className="form-label">Album hình ảnh</label>
                                                        <input className="form-control" type="file" multiple onChange={handleAlbumFilesChange} accept="image/*" />
                                                    </div>
                                                    {/* Khu vực hiển thị ảnh đã có và ảnh xem trước */}
                                                    <div className="mt-3">
                                                        {/* 1. Hiển thị ảnh đã có của sản phẩm (khi edit) */}
                                                        {isEditMode &&
                                                            product.ProductImages?.map((img) => (
                                                                <div
                                                                    key={img.id}
                                                                    style={{
                                                                        display: 'inline-block',
                                                                        position: 'relative',
                                                                        marginRight: '10px',
                                                                    }}
                                                                >
                                                                    <img src={`${API_URL}/${img.url}`} width="100" className="me-2 mb-2" alt="Album" />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleDeleteExistingImage(img.id)}
                                                                        style={{
                                                                            position: 'absolute',
                                                                            top: '2px',
                                                                            right: '2px',
                                                                            background: 'rgba(0, 0, 0, 0.5)',
                                                                            color: 'white',
                                                                            border: 'none',
                                                                            borderRadius: '50%',
                                                                            width: '20px',
                                                                            height: '20px',
                                                                            cursor: 'pointer',
                                                                            lineHeight: '20px',
                                                                            textAlign: 'center',
                                                                            padding: 0,
                                                                        }}
                                                                    >
                                                                        &times;
                                                                    </button>
                                                                </div>
                                                            ))}

                                                        {/* 2. Hiển thị ảnh mới chọn để xem trước */}
                                                        {albumPreviews.map((preview, index) => (
                                                            <img key={index} src={preview} width="100" className="me-2 mb-2 border border-primary" alt="Xem trước" />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label">Người bán (Seller)</label>
                                                <select className="form-select" name="seller_id" value={product.seller_id} onChange={handleChange} required>
                                                    <option value="">-- Chọn người bán --</option>
                                                    {sellers.map((seller) => (
                                                        <option key={seller.id} value={seller.id}>
                                                            {seller.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label">Danh mục</label>
                                                <div
                                                    style={{
                                                        maxHeight: '200px',
                                                        overflowY: 'auto',
                                                        border: '1px solid #ced4da',
                                                        padding: '10px',
                                                    }}
                                                >
                                                    {displayCategories.map((cat) => (
                                                        <div
                                                            className="form-check"
                                                            key={cat.id}
                                                            style={{
                                                                paddingLeft: `calc(1.25em + ${cat.level * 25}px)`,
                                                            }}
                                                        >
                                                            <input className="form-check-input" type="checkbox" id={`cat-${cat.id}`} checked={product.category_ids.includes(cat.id)} onChange={() => handleCategoryChange(cat.id)} />
                                                            <label className="form-check-label" htmlFor={`cat-${cat.id}`}>
                                                                {cat.name}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                                {/* 1. Link để mở/đóng form thêm nhanh */}
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setShowAddCategoryForm(!showAddCategoryForm);
                                                    }}
                                                    className="mt-2 d-block"
                                                >
                                                    + Thêm danh mục mới
                                                </a>

                                                {/* 2. Form thêm nhanh (chỉ hiển thị khi showAddCategoryForm là true) */}
                                                {showAddCategoryForm && (
                                                    <div className="mt-3 border p-3 bg-white">
                                                        <input type="text" className="form-control mb-2" placeholder="Tên danh mục mới" name="name" value={newCategory.name} onChange={handleNewCategoryChange} />
                                                        <select className="form-select mb-2" name="parent_id" value={newCategory.parent_id} onChange={handleNewCategoryChange}>
                                                            <option value="">— Danh mục cha —</option>
                                                            {displayCategories.map((cat) => (
                                                                <option key={`parent-${cat.id}`} value={cat.id}>
                                                                    {'— '.repeat(cat.level)}
                                                                    {cat.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <button type="button" className="btn btn-primary btn-sm" onClick={handleAddNewCategory}>
                                                            Thêm danh mục mới
                                                        </button>
                                                    </div>
                                                )}
                                                {/* --- KẾT THÚC PHẦN GIAO DIỆN MỚI --- */}
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label">Thương hiệu</label>
                                                <select className="form-select" name="brand_id" value={product.brand_id} onChange={handleChange}>
                                                    <option value="">-- Chọn thương hiệu --</option>
                                                    {brands.map((brand) => (
                                                        <option key={brand.id} value={brand.id}>
                                                            {brand.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label">Tags</label>
                                                <CreatableSelect
                                                    isMulti
                                                    // Thêm (product.tags || []) để phòng trường hợp tags là undefined
                                                    value={(product.tags || []).map((tag) => ({
                                                        value: tag,
                                                        label: tag,
                                                    }))}
                                                    onChange={handleTagsChange}
                                                    placeholder="Nhập tags..."
                                                />
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label">Trạng thái</label>
                                                <select className="form-select" name="status" value={product.status} onChange={handleChange}>
                                                    <option value="active">Published (Hoạt động)</option>
                                                    <option value="inactive">Draft (Bản nháp)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductFormPage;
