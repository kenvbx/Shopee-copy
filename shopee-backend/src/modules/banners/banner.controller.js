// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { Banner } = require('../../models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Lấy tất cả banner (cho trang admin)
const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.findAll({ order: [['sort_order', 'ASC']] });
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

// Lấy chi tiết một banner
const getBannerById = async (req, res) => {
    try {
        const banner = await Banner.findByPk(req.params.id);
        if (!banner) return res.status(404).json({ message: 'Không tìm thấy banner.' });
        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

// Tạo banner mới
const createBanner = async (req, res) => {
    try {
        const data = req.body;

        if (!data.start_date || data.start_date === 'null') data.start_date = null;
        if (!data.end_date || data.end_date === 'null') data.end_date = null;

        if (req.file) {
            data.image_url = req.file.path.replace('public/', '').replace(/\\/g, '/');
        }
        const newBanner = await Banner.create(data);
        res.status(201).json(newBanner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật banner
const updateBanner = async (req, res) => {
    try {
        const banner = await Banner.findByPk(req.params.id);
        if (!banner) return res.status(404).json({ message: 'Không tìm thấy banner.' });

        const data = req.body;

        if (!data.start_date || data.start_date === 'null') data.start_date = null;
        if (!data.end_date || data.end_date === 'null') data.end_date = null;

        if (req.file) {
            // Xóa ảnh cũ nếu có
            if (banner.image_url) {
                const oldImagePath = path.join(__dirname, '../../../public', banner.image_url);
                if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
            }
            data.image_url = req.file.path.replace('public/', '').replace(/\\/g, '/');
        }

        await banner.update(data);
        res.status(200).json(banner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa banner
const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findByPk(req.params.id);
        if (!banner) return res.status(404).json({ message: 'Không tìm thấy banner.' });

        // Xóa file ảnh liên quan
        if (banner.image_url) {
            const imagePath = path.join(__dirname, '../../../public', banner.image_url);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await banner.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

module.exports = {
    getAllBanners,
    getBannerById,
    createBanner,
    updateBanner,
    deleteBanner,
};
