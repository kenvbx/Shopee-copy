// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { UserVoucher, Voucher } = require('../../models');

// Lấy danh sách voucher của người dùng đang đăng nhập
const getMyVouchers = async (req, res) => {
    try {
        const userId = req.user.id;
        const userVouchers = await UserVoucher.findAll({
            where: { user_id: userId, status: 'unused' }, // Chỉ lấy voucher chưa sử dụng
            include: [{ model: Voucher }], // Lấy kèm thông tin chi tiết của voucher
            order: [['created_at', 'DESC']],
        });
        res.status(200).json(userVouchers);
    } catch (error) {
        console.error('Lỗi khi tải voucher:', error);
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

module.exports = { getMyVouchers };
