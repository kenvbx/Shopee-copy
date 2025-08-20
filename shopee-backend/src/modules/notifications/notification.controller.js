// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { Notification } = require('../../models');

// Lấy tất cả thông báo của người dùng
const getMyNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await Notification.findAll({
            where: { user_id: userId },
            order: [['sent_at', 'DESC']],
        });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

// Đánh dấu một thông báo là đã đọc
const markAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        const { notificationId } = req.params;
        const [updated] = await Notification.update({ status: 'read', read_at: new Date() }, { where: { id: notificationId, user_id: userId } });
        if (updated) {
            res.status(200).json({ message: 'Đã đánh dấu là đã đọc.' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy thông báo.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

module.exports = { getMyNotifications, markAsRead };
