// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { Subscriber } = require('../../models');
const { Op } = require('sequelize');

const subscribeToNewsletter = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Vui lòng nhập địa chỉ email.' });
        }

        // findOrCreate sẽ tạo mới nếu chưa có, hoặc trả về bản ghi đã có
        const [subscriber, created] = await Subscriber.findOrCreate({
            where: { email: email },
            defaults: { email: email, status: 'subscribed' },
        });

        if (!created && subscriber.status === 'subscribed') {
            return res.status(200).json({ message: 'Email này đã được đăng ký trước đó.' });
        }

        // Nếu email đã tồn tại nhưng ở trạng thái "unsubscribed", đăng ký lại
        if (!created && subscriber.status === 'unsubscribed') {
            subscriber.status = 'subscribed';
            await subscriber.save();
        }

        res.status(201).json({ message: 'Cảm ơn bạn đã đăng ký nhận tin!' });
    } catch (error) {
        res.status(400).json({ message: 'Địa chỉ email không hợp lệ.' });
    }
};

// Lấy danh sách người đăng ký (có phân trang và tìm kiếm)
const getAllSubscribers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const searchTerm = req.query.search || '';

        let whereCondition = {};
        if (searchTerm) {
            whereCondition.email = { [Op.like]: `%${searchTerm}%` };
        }

        const { count, rows } = await Subscriber.findAndCountAll({
            where: whereCondition,
            limit,
            offset,
            order: [['created_at', 'DESC']],
        });

        res.status(200).json({
            data: rows,
            pagination: { totalItems: count, totalPages: Math.ceil(count / limit), currentPage: page },
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

// Cập nhật trạng thái
const updateSubscriber = async (req, res) => {
    try {
        const subscriber = await Subscriber.findByPk(req.params.id);
        if (!subscriber) return res.status(404).json({ message: 'Không tìm thấy email đăng ký.' });

        await subscriber.update({ status: req.body.status });
        res.status(200).json(subscriber);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa một người đăng ký
const deleteSubscriber = async (req, res) => {
    try {
        const subscriber = await Subscriber.findByPk(req.params.id);
        if (!subscriber) return res.status(404).json({ message: 'Không tìm thấy email đăng ký.' });

        await subscriber.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

module.exports = { subscribeToNewsletter, getAllSubscribers, updateSubscriber, deleteSubscriber };
