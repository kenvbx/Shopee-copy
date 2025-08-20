// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { Attribute, AttributeValue } = require('../../models');
const slugify = require('slugify');

// Lấy tất cả thuộc tính, kèm theo các giá trị của chúng
const getAllAttributes = async (req, res) => {
    try {
        const attributes = await Attribute.findAll({
            include: {
                model: AttributeValue,
                as: 'values', // Phải khớp với alias trong models/index.js
            },
            order: [['name', 'ASC']],
        });
        res.status(200).json(attributes);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.', error: error.message });
    }
};

const getAttributeById = async (req, res) => {
    try {
        const attribute = await Attribute.findByPk(req.params.id, {
            include: { model: AttributeValue, as: 'values' },
        });
        if (!attribute) return res.status(404).json({ message: 'Không tìm thấy thuộc tính.' });
        res.status(200).json(attribute);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

// Tạo thuộc tính mới (ví dụ: Màu sắc)
const createAttribute = async (req, res) => {
    try {
        const { name, enable_archives, default_sort_order, swatch_size, show_label } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Tên thuộc tính là bắt buộc.' });
        }
        const slug = slugify(name, { lower: true, strict: true });
        const newAttribute = await Attribute.create({ name, slug, enable_archives, default_sort_order, swatch_size, show_label });
        res.status(201).json(newAttribute);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Tên hoặc slug của thuộc tính đã tồn tại.' });
        }
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật thuộc tính
const updateAttribute = async (req, res) => {
    try {
        const attribute = await Attribute.findByPk(req.params.id);
        if (!attribute) {
            return res.status(404).json({ message: 'Không tìm thấy thuộc tính.' });
        }

        const { name, enable_archives, default_sort_order, swatch_size, show_label } = req.body;
        const slug = slugify(name, { lower: true, strict: true });

        await attribute.update({
            name,
            slug,
            enable_archives,
            default_sort_order,
            swatch_size,
            show_label,
        });
        res.status(200).json(attribute);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Tên hoặc slug đã tồn tại.' });
        }
        res.status(400).json({ message: error.message });
    }
};

// Xóa thuộc tính
const deleteAttribute = async (req, res) => {
    try {
        const attribute = await Attribute.findByPk(req.params.id);
        if (!attribute) {
            return res.status(404).json({ message: 'Không tìm thấy thuộc tính.' });
        }
        // Lệnh destroy sẽ xóa thuộc tính. Các giá trị con sẽ được xóa theo
        // nhờ thiết lập ON DELETE CASCADE trong CSDL (nếu có).
        await attribute.destroy();
        res.status(204).send(); // Thành công, không có nội dung trả về
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.', error: error.message });
    }
};

// === ATTRIBUTE VALUE CONTROLLERS ===

// Tạo một giá trị mới cho thuộc tính (ví dụ: thêm màu "Đỏ" cho "Màu sắc")
const createAttributeValue = async (req, res) => {
    try {
        const { attribute_id } = req.params;
        const { value, slug, description } = req.body;

        const finalSlug = slug || slugify(value, { lower: true, strict: true });

        const newValue = await AttributeValue.create({
            attribute_id,
            value,
            slug: finalSlug,
            description,
        });
        res.status(201).json(newValue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật giá trị thuộc tính
const updateAttributeValue = async (req, res) => {
    try {
        const { value_id } = req.params;
        const { value, slug, description } = req.body;
        const attrValue = await AttributeValue.findByPk(value_id);

        if (!attrValue) {
            return res.status(404).json({ message: 'Không tìm thấy giá trị.' });
        }

        // Tự tạo slug nếu không có hoặc cập nhật theo value mới
        const finalSlug = slug || slugify(value, { lower: true, strict: true });

        await attrValue.update({ value, slug: finalSlug, description });
        res.status(200).json(attrValue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa giá trị thuộc tính
const deleteAttributeValue = async (req, res) => {
    try {
        const { value_id } = req.params;
        const attrValue = await AttributeValue.findByPk(value_id);
        if (!attrValue) return res.status(404).json({ message: 'Không tìm thấy giá trị.' });

        await attrValue.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

module.exports = {
    getAllAttributes,
    getAttributeById,
    createAttribute,
    updateAttribute,
    deleteAttribute,
    createAttributeValue,
    updateAttributeValue,
    deleteAttributeValue,
};
