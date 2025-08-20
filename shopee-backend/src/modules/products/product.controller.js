// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const fs = require('fs');
const path = require('path');
const { Product, ProductCategory, Brand, Tag, ProductImage, Variation, Attribute, AttributeValue, VariationImage } = require('../../models');
const slugify = require('slugify');

const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Product.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['created_at', 'DESC']],
            include: [
                { model: ProductCategory, attributes: ['name'] },
                { model: Brand, attributes: ['name'] },
            ],
        });

        res.status(200).json({
            data: rows,
            pagination: {
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.', error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [
                // Lấy kèm cả category và brand
                { model: ProductCategory, through: { attributes: [] } },
                { model: Brand, attributes: ['name'] },
                { model: Tag, through: { attributes: [] } },
                { model: ProductImage, as: 'ProductImages' },
                {
                    model: AttributeValue,
                    as: 'AttributeValues',
                    through: { attributes: [] },
                    include: [{ model: Attribute }],
                },
                { model: Variation, as: 'Variations' },
                { model: Variation, as: 'DefaultVariation' },
                {
                    model: Variation,
                    as: 'Variations',
                    include: [{ model: VariationImage, as: 'GalleryImages' }],
                },
            ],
        });
        if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });

        const productJson = product.toJSON();
        productJson.up_sell_ids = product.up_sell_ids ? product.up_sell_ids.split(',').map(Number) : [];
        productJson.cross_sell_ids = product.cross_sell_ids ? product.cross_sell_ids.split(',').map(Number) : [];

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.', error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { category_ids, tags, attributes, up_sell_ids, cross_sell_ids, purchase_note, menu_order, enable_reviews, ...productData } = req.body;

        // --- Validation ---
        if (!productData.name) {
            return res.status(400).json({ message: 'Vui lòng nhập tên sản phẩm.' });
        }
        if (!category_ids || !Array.isArray(category_ids) || category_ids.length === 0) {
            return res.status(400).json({ message: 'Vui lòng chọn ít nhất một danh mục.' });
        }

        // Gom các lệnh kiểm tra và chuyển đổi giá trị rỗng thành null
        if (productData.low_stock_threshold === '') productData.low_stock_threshold = null;
        if (productData.sale_price === '') productData.sale_price = null;
        if (productData.shipping_class_id === '') productData.shipping_class_id = null;

        // BƯỚC 1: Tạo sản phẩm với các dữ liệu cơ bản
        const newProduct = await Product.create({
            ...productData,
            slug: slugify(productData.name, { lower: true, strict: true }),
            // Chuyển mảng up_sell và cross_sell thành chuỗi
            up_sell_ids: up_sell_ids ? up_sell_ids.join(',') : null,
            cross_sell_ids: cross_sell_ids ? cross_sell_ids.join(',') : null,
        });

        // Gán danh mục
        await newProduct.setProductCategories(category_ids);

        // Gán tags
        if (tags && Array.isArray(tags) && tags.length > 0) {
            const tagInstances = await Promise.all(tags.map((tagName) => Tag.findOrCreate({ where: { name: tagName.trim() } })));
            await newProduct.setTags(tagInstances.map((instance) => instance[0]));
        }

        // Gán thuộc tính và giá trị
        if (attributes && Array.isArray(attributes)) {
            let allValueIds = [];
            for (const attr of attributes) {
                let attributeInstance;

                // Tìm hoặc tạo thuộc tính cha (ví dụ: "Màu sắc")
                if (attr.id && typeof attr.id === 'number') {
                    attributeInstance = await Attribute.findByPk(attr.id);
                } else if (attr.name) {
                    const [instance] = await Attribute.findOrCreate({
                        where: { name: attr.name },
                        defaults: { name: attr.name, slug: slugify(attr.name, { lower: true, strict: true }) },
                    });
                    attributeInstance = instance;
                }

                // Nếu tìm/tạo được thuộc tính cha, mới xử lý các giá trị con
                if (attributeInstance && attr.values && attr.values.length > 0) {
                    const valueInstances = await Promise.all(
                        attr.values.map((valName) =>
                            AttributeValue.findOrCreate({
                                // Luôn cung cấp attribute_id ở đây
                                where: { attribute_id: attributeInstance.id, value: valName },
                                defaults: {
                                    attribute_id: attributeInstance.id,
                                    value: valName,
                                    slug: slugify(valName, { lower: true, strict: true }),
                                },
                            })
                        )
                    );
                    allValueIds.push(...valueInstances.map((inst) => inst[0].id));
                }
            }
            await product.setAttributeValues(allValueIds);
        }

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Lỗi tạo sản phẩm:', error);

        // --- BẮT ĐẦU PHẦN XỬ LÝ LỖI CHI TIẾT ---

        // 1. Lỗi do vi phạm ràng buộc UNIQUE (ví dụ: slug, sku bị trùng)
        if (error.name === 'SequelizeUniqueConstraintError') {
            const field = error.errors[0].path;
            const value = error.errors[0].value;
            return res.status(409).json({ message: `Giá trị '${value}' của trường '${field}' đã tồn tại.` });
        }

        // 2. Lỗi do vi phạm quy tắc VALIDATION trong model (ví dụ: một trường NOT NULL bị thiếu)
        if (error.name === 'SequelizeValidationError') {
            // Lấy tất cả các thông báo lỗi chi tiết và nối chúng lại
            const messages = error.errors.map((e) => e.message).join('. ');
            return res.status(400).json({ message: messages });
        }

        // 3. Lỗi do vi phạm KHÓA NGOẠI (ví dụ: category_id không tồn tại)
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ message: 'Một trong các ID (Danh mục, Thương hiệu, Người bán...) không hợp lệ.' });
        }

        // Lỗi chung khác
        res.status(400).json({ message: error.message || 'Có lỗi không xác định xảy ra.' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });

        // Tách riêng các mảng ID cho các mối quan hệ
        const { variations, default_variation_title, default_variation_description, category_ids, tags, attributes, up_sell_ids, cross_sell_ids, purchase_note, menu_order, enable_reviews, ...productData } = req.body;

        // BƯỚC 1: Cập nhật sản phẩm cha (tạm thời reset default_variation_id)
        productData.default_variation_id = null;

        // Tự động cập nhật slug theo tên mới
        if (productData.name) {
            productData.slug = slugify(productData.name, { lower: true, strict: true });
        }

        // Chuyển đổi mảng up_sell và cross_sell thành chuỗi
        if (up_sell_ids && Array.isArray(up_sell_ids)) {
            productData.up_sell_ids = up_sell_ids.join(',');
        }
        if (cross_sell_ids && Array.isArray(cross_sell_ids)) {
            productData.cross_sell_ids = cross_sell_ids.join(',');
        }

        // Chuyển đổi chuỗi rỗng thành null cho các trường số có thể để trống
        if (productData.low_stock_threshold === '') productData.low_stock_threshold = null;
        if (productData.sale_price === '') productData.sale_price = null;
        if (productData.shipping_class_id === '') productData.shipping_class_id = null;

        await product.update(productData);

        // BƯỚC 2: Đồng bộ hóa các biến thể (Update, Insert, Delete)
        let updatedOrCreatedVariations = [];
        if (Array.isArray(variations)) {
            const incomingVariationIds = variations.filter((v) => v.id).map((v) => v.id);
            const existingVariations = await Variation.findAll({ where: { product_id: product.id } });
            const existingVariationIds = existingVariations.map((v) => v.id);

            // Xóa các biến thể không có trong payload gửi lên
            const variationsToDelete = existingVariationIds.filter((id) => !incomingVariationIds.includes(id));
            if (variationsToDelete.length > 0) {
                await Variation.destroy({ where: { id: variationsToDelete } });
            }

            // Cập nhật hoặc tạo mới các biến thể
            for (const variantData of variations) {
                // Làm sạch dữ liệu số
                ['price', 'sale_price', 'stock', 'low_stock_threshold', 'weight', 'length', 'width', 'height', 'shipping_class_id'].forEach((field) => {
                    if (variantData[field] === '' || variantData[field] === null) variantData[field] = null;
                });

                if (variantData.id) {
                    // Update
                    await Variation.update(variantData, { where: { id: variantData.id, product_id: product.id } });
                    const updatedVariant = await Variation.findByPk(variantData.id);
                    updatedOrCreatedVariations.push(updatedVariant);
                } else {
                    // Create
                    const newVariant = await Variation.create({ ...variantData, product_id: product.id });
                    updatedOrCreatedVariations.push(newVariant);
                }
            }
        }

        // BƯỚC 3: Cập nhật lại default_variation_id cho sản phẩm cha
        let finalDefaultVariationId = null;
        if (default_variation_title && updatedOrCreatedVariations.length > 0) {
            const defaultVariation = updatedOrCreatedVariations.find((v) => v.attribute_title === default_variation_title);
            if (defaultVariation) {
                finalDefaultVariationId = defaultVariation.id;
            }
        }
        await product.update({ default_variation_id: finalDefaultVariationId });

        // Cập nhật danh mục
        if (category_ids && Array.isArray(category_ids)) {
            await product.setProductCategories(category_ids);
        }

        // Cập nhật tags
        if (tags && Array.isArray(tags)) {
            const tagInstances = await Promise.all(tags.map((tagName) => Tag.findOrCreate({ where: { name: tagName.trim() } })));
            await product.setTags(tagInstances.map((instance) => instance[0]));
        }

        // Cập nhật thuộc tính (theo kiểu WooCommerce)
        if (attributes && Array.isArray(attributes)) {
            let allValueIds = [];
            for (const attr of attributes) {
                let attributeInstance;

                // Tìm hoặc tạo thuộc tính cha (ví dụ: "Màu sắc")
                if (attr.id && typeof attr.id === 'number') {
                    attributeInstance = await Attribute.findByPk(attr.id);
                } else if (attr.name) {
                    const [instance] = await Attribute.findOrCreate({
                        where: { name: attr.name },
                        defaults: { name: attr.name, slug: slugify(attr.name, { lower: true, strict: true }) },
                    });
                    attributeInstance = instance;
                }

                // Nếu tìm/tạo được thuộc tính cha, mới xử lý các giá trị con
                if (attributeInstance && attr.values && attr.values.length > 0) {
                    const valueInstances = await Promise.all(
                        attr.values.map((valName) =>
                            AttributeValue.findOrCreate({
                                // Luôn cung cấp attribute_id ở đây
                                where: { attribute_id: attributeInstance.id, value: valName },
                                defaults: {
                                    attribute_id: attributeInstance.id,
                                    value: valName,
                                    slug: slugify(valName, { lower: true, strict: true }),
                                },
                            })
                        )
                    );
                    allValueIds.push(...valueInstances.map((inst) => inst[0].id));
                }
            }
            await product.setAttributeValues(allValueIds);
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Lỗi cập nhật sản phẩm:', error);
        res.status(400).json({ message: 'Lỗi máy chủ.', error: error.message });
    }
};

const uploadProductImage = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
        if (!req.file) return res.status(400).json({ message: 'Vui lòng chọn một file ảnh.' });

        // Xóa ảnh cũ nếu có
        if (product.main_image) {
            const oldImagePath = path.join(__dirname, '../../../public', product.main_image);
            if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }

        // Cập nhật đường dẫn ảnh mới
        const imagePath = req.file.path.replace('public/', '').replace(/\\/g, '/');
        product.main_image = imagePath;
        await product.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi upload file.', error: error.message });
    }
};

const uploadProductAlbum = async (req, res) => {
    try {
        const productId = req.params.id;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'Vui lòng chọn ít nhất một file.' });
        }

        // Kiểm tra xem sản phẩm đã có ảnh đại diện chưa
        const existingMainImage = await ProductImage.findOne({
            where: { product_id: productId, is_main: true },
        });

        const imageRecords = files.map((file, index) => {
            // Nếu chưa có ảnh đại diện, gán ảnh đầu tiên làm ảnh đại diện
            const isMain = !existingMainImage && index === 0;
            return {
                product_id: productId,
                url: file.path.replace('public/', '').replace(/\\/g, '/'),
                is_main: isMain,
            };
        });

        await ProductImage.bulkCreate(imageRecords);
        res.status(201).json({ message: 'Upload album thành công.' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi upload file.', error: error.message });
    }
};

const updateProductAttributes = async (req, res) => {
    try {
        // BƯỚC 1: Tìm sản phẩm cần cập nhật
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
        }

        const { attributes } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!Array.isArray(attributes)) {
            return res.status(400).json({ message: 'Dữ liệu thuộc tính không hợp lệ.' });
        }

        let allValueIds = []; // Mảng để chứa ID của tất cả các giá trị thuộc tính cuối cùng

        // BƯỚC 2: Lặp qua từng thuộc tính mà người dùng gửi lên
        for (const attr of attributes) {
            let attributeInstance;

            // Tìm hoặc tạo thuộc tính cha (ví dụ: "Màu sắc")
            if (attr.id && typeof attr.id === 'number') {
                // Thuộc tính có sẵn
                attributeInstance = await Attribute.findByPk(attr.id);
            } else if (attr.name) {
                // Thuộc tính tùy chỉnh mới
                const [instance] = await Attribute.findOrCreate({
                    where: { name: attr.name },
                    defaults: { name: attr.name, slug: slugify(attr.name, { lower: true, strict: true }) },
                });
                attributeInstance = instance;
            }

            // BƯỚC 3: Xử lý các giá trị của thuộc tính cha đó
            if (attributeInstance && attr.values && attr.values.length > 0) {
                // Tìm hoặc tạo các giá trị (ví dụ: "Đỏ", "Xanh")
                const valueInstances = await Promise.all(
                    attr.values.map((valName) =>
                        AttributeValue.findOrCreate({
                            where: { attribute_id: attributeInstance.id, value: valName },
                            defaults: {
                                attribute_id: attributeInstance.id,
                                value: valName,
                                slug: slugify(valName, { lower: true, strict: true }),
                            },
                        })
                    )
                );
                // Gom ID của các giá trị này vào mảng tổng
                allValueIds.push(...valueInstances.map((inst) => inst[0].id));
            }
        }

        // BƯỚC 4: Đồng bộ hóa tất cả các giá trị thuộc tính với sản phẩm
        // Sequelize sẽ tự động thêm/xóa các mối quan hệ trong bảng `product_attribute_value_map`
        await product.setAttributeValues(allValueIds);

        res.status(200).json({ message: 'Cập nhật thuộc tính thành công.' });
    } catch (error) {
        console.error('Lỗi cập nhật thuộc tính:', error);
        res.status(400).json({ message: 'Lỗi khi cập nhật thuộc tính.', error: error.message });
    }
};

const uploadVariationImage = async (req, res) => {
    try {
        const { variationId } = req.params;
        const variation = await Variation.findByPk(variationId);

        if (!variation) {
            return res.status(404).json({ message: 'Không tìm thấy biến thể.' });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'Vui lòng chọn một file ảnh.' });
        }

        // Xóa ảnh cũ nếu có
        if (variation.image_url) {
            const oldImagePath = path.join(__dirname, '../../../public', variation.image_url);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        // Cập nhật đường dẫn ảnh mới
        const imagePath = req.file.path.replace('public/', '').replace(/\\/g, '/');
        variation.image_url = imagePath;
        await variation.save();

        res.status(200).json(variation);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi upload file.', error: error.message });
    }
};

const uploadVariationGallery = async (req, res) => {
    try {
        const { variationId } = req.params;
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'Vui lòng chọn ít nhất một file ảnh.' });
        }

        const imageRecords = files.map((file) => ({
            variation_id: variationId,
            url: file.path.replace('public/', '').replace(/\\/g, '/'),
        }));

        const newImages = await VariationImage.bulkCreate(imageRecords);
        res.status(201).json(newImages);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi upload file.', error: error.message });
    }
};

const deleteProductImage = async (req, res) => {
    try {
        const { imageId } = req.params;
        const image = await ProductImage.findByPk(imageId);

        if (!image) {
            return res.status(404).json({ message: 'Không tìm thấy hình ảnh.' });
        }

        // 1. Xóa file vật lý trên server
        if (image.url) {
            const imagePath = path.join(__dirname, '../../../public', image.url);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        // 2. Xóa record trong cơ sở dữ liệu
        await image.destroy();

        res.status(200).json({ message: 'Xóa hình ảnh thành công.' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
        }
        await product.destroy(); // Sequelize sẽ tự động thực hiện soft delete
        res.status(204).send(); // 204 No Content - Thành công, không có nội dung trả về
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.', error: error.message });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    uploadProductImage,
    uploadProductAlbum,
    deleteProductImage,
    getProductById,
    updateProductAttributes,
    uploadVariationImage,
    uploadVariationGallery,
    updateProduct,
    deleteProduct,
};
