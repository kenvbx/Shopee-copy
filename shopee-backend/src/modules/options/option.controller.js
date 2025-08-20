// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { Option } = require('../../models');

// Lấy tất cả các tùy chọn
const getOptions = async (req, res) => {
    const options = await Option.findAll();
    // Chuyển đổi mảng thành một object duy nhất cho dễ sử dụng
    const optionsMap = options.reduce((acc, option) => {
        acc[option.option_name] = option.option_value;
        return acc;
    }, {});
    res.status(200).json(optionsMap);
};

// Cập nhật các tùy chọn (dùng cho admin)
const updateOptions = async (req, res) => {
    try {
        const optionsToUpdate = req.body;
        for (const key in optionsToUpdate) {
            await Option.upsert({
                option_name: key,
                option_value: optionsToUpdate[key],
            });
        }
        res.status(200).json({ message: 'Cập nhật tùy chọn thành công.' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

const uploadOptionImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Vui lòng chọn một file ảnh.' });
        }

        // Trả về đường dẫn của file vừa upload để frontend có thể sử dụng
        const imageUrl = req.file.path.replace('public/', '').replace(/\\/g, '/');

        res.status(200).json({ url: imageUrl });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi upload file.', error: error.message });
    }
};

module.exports = { getOptions, updateOptions, uploadOptionImage };
