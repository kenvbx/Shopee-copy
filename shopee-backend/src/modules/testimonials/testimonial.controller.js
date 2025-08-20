// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { Testimonial } = require('../../models');

const getActiveTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll({
            where: { status: 'active' },
            order: [['created_at', 'DESC']],
        });
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};

module.exports = { getActiveTestimonials };
