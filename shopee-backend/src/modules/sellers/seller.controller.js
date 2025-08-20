// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { Seller, User } = require('../../models');
const { Op } = require('sequelize');
const slugify = require('slugify');

// Lấy danh sách (phân trang, tìm kiếm)
const getAllSellers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Seller.findAndCountAll({
            limit,
            offset,
            order: [['created_at', 'DESC']],
            include: [{ model: User, attributes: ['name', 'email'] }],
        });

        res.status(200).json({
            data: rows,
            pagination: { totalItems: count, totalPages: Math.ceil(count / limit), currentPage: page },
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.', error: error.message });
    }
};

// Lấy chi tiết một nhà bán hàng
const getSellerById = async (req, res) => {
    try {
        const seller = await Seller.findByPk(req.params.id);
        if (!seller) return res.status(404).json({ message: 'Không tìm thấy nhà bán hàng.' });
        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

// Tạo nhà bán hàng mới
const createSeller = async (req, res) => {
    try {
        const { name, ...sellerData } = req.body;
        const slug = slugify(name, { lower: true, strict: true });
        const newSeller = await Seller.create({ name, slug, ...sellerData });
        res.status(201).json(newSeller);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật nhà bán hàng
const updateSeller = async (req, res) => {
    try {
        const seller = await Seller.findByPk(req.params.id);
        if (!seller) return res.status(404).json({ message: 'Không tìm thấy nhà bán hàng.' });

        const { name, ...sellerData } = req.body;
        const slug = slugify(name, { lower: true, strict: true });

        await seller.update({ name, slug, ...sellerData });
        res.status(200).json(seller);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa nhà bán hàng
const deleteSeller = async (req, res) => {
    try {
        const seller = await Seller.findByPk(req.params.id);
        if (!seller) return res.status(404).json({ message: 'Không tìm thấy nhà bán hàng.' });
        await seller.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

module.exports = { getAllSellers, getSellerById, createSeller, updateSeller, deleteSeller };
