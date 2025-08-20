// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { ShippingClass } = require('../../models');
const slugify = require('slugify');

// Lấy tất cả lớp vận chuyển
const getAllShippingClasses = async (req, res) => {
    try {
        const shippingClasses = await ShippingClass.findAll({ order: [['name', 'ASC']] });
        res.status(200).json(shippingClasses);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

// Tạo lớp vận chuyển mới
const createShippingClass = async (req, res) => {
    try {
        const { name, description } = req.body;
        const slug = slugify(name, { lower: true, strict: true });

        const newShippingClass = await ShippingClass.create({ name, slug, description });
        res.status(201).json(newShippingClass);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Tên hoặc slug đã tồn tại.' });
        }
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật lớp vận chuyển
const updateShippingClass = async (req, res) => {
    try {
        const shippingClass = await ShippingClass.findByPk(req.params.id);
        if (!shippingClass) {
            return res.status(404).json({ message: 'Không tìm thấy lớp vận chuyển.' });
        }

        const { name, description } = req.body;
        const slug = slugify(name, { lower: true, strict: true });

        await shippingClass.update({ name, slug, description });
        res.status(200).json(shippingClass);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Tên hoặc slug đã tồn tại.' });
        }
        res.status(400).json({ message: error.message });
    }
};

// Xóa lớp vận chuyển
const deleteShippingClass = async (req, res) => {
    try {
        const shippingClass = await ShippingClass.findByPk(req.params.id);
        if (!shippingClass) {
            return res.status(404).json({ message: 'Không tìm thấy lớp vận chuyển.' });
        }
        await shippingClass.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

module.exports = {
    getAllShippingClasses,
    createShippingClass,
    updateShippingClass,
    deleteShippingClass,
};
