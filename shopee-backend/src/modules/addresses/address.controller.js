// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { UserAddress } = require('../../models');

// Lấy tất cả địa chỉ của người dùng đang đăng nhập
const getMyAddresses = async (req, res) => {
    try {
        const userId = req.user.id;
        const addresses = await UserAddress.findAll({
            where: { user_id: userId },
            order: [
                ['is_default', 'DESC'],
                ['created_at', 'DESC'],
            ],
        });
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

// Thêm một địa chỉ mới
const addAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { recipient_name, phone, address, city, district, ward, is_default } = req.body;

        // Nếu đặt làm mặc định, hãy bỏ mặc định của các địa chỉ cũ
        if (is_default) {
            await UserAddress.update({ is_default: false }, { where: { user_id: userId } });
        }

        const newAddress = await UserAddress.create({
            user_id: userId,
            recipient_name,
            phone,
            address,
            city,
            district,
            ward,
            is_default,
        });
        res.status(201).json(newAddress);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật một địa chỉ
const updateAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { addressId } = req.params;
        const { recipient_name, phone, address, city, district, ward, is_default } = req.body;

        const addr = await UserAddress.findOne({ where: { id: addressId, user_id: userId } });
        if (!addr) return res.status(404).json({ message: 'Không tìm thấy địa chỉ.' });

        if (is_default) {
            await UserAddress.update({ is_default: false }, { where: { user_id: userId } });
        }

        await addr.update({ recipient_name, phone, address, city, district, ward, is_default });
        res.status(200).json(addr);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa một địa chỉ
const deleteAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { addressId } = req.params;
        const result = await UserAddress.destroy({ where: { id: addressId, user_id: userId } });

        if (result === 0) return res.status(404).json({ message: 'Không tìm thấy địa chỉ.' });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

module.exports = { getMyAddresses, addAddress, updateAddress, deleteAddress };
