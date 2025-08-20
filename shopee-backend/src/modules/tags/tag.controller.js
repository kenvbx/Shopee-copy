// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { Tag, Product } = require('../../models');
const sequelize = require('sequelize');
const slugify = require('slugify');

// Lấy tất cả tags (có phân trang)
const getAllTags = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Tag.findAndCountAll({
            attributes: {
                // Đếm số lượng Product liên quan và đặt tên là 'product_count'
                include: [[sequelize.fn('COUNT', sequelize.col('Products.id')), 'product_count']],
            },
            include: [
                {
                    model: Product,
                    attributes: [], // Không cần lấy thông tin của Product, chỉ dùng để đếm
                    through: { attributes: [] }, // Bỏ qua các trường của bảng trung gian
                },
            ],
            group: ['Tag.id'], // Gom nhóm theo ID của Tag để đếm cho đúng
            limit,
            offset,
            order: [['name', 'ASC']],
            subQuery: false, // Quan trọng cho việc phân trang khi có group
        });

        // Chuyển đổi kết quả vì `count` sẽ là một mảng các object
        const totalItems = count.length;

        res.status(200).json({
            data: rows,
            pagination: {
                totalItems: totalItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page,
            },
        });
    } catch (error) {
        console.error('Lỗi khi tải tags:', error);
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

// Tạo tag mới
const createTag = async (req, res) => {
    try {
        const { name, description, status } = req.body;
        const slug = slugify(name, { lower: true, strict: true });
        const newTag = await Tag.create({ name, slug, description, status });
        res.status(201).json(newTag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật tag
const updateTag = async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) return res.status(404).json({ message: 'Không tìm thấy thẻ.' });

        const { name, description, status } = req.body;
        const slug = slugify(name, { lower: true, strict: true });

        await tag.update({ name, slug, description, status });
        res.status(200).json(tag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa tag
const deleteTag = async (req, res) => {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Không tìm thấy thẻ.' });
    await tag.destroy();
    res.status(204).send();
};

module.exports = { getAllTags, createTag, updateTag, deleteTag };
