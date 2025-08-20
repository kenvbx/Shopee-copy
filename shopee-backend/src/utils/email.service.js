// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendPasswordResetEmail = async (to, token) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    const mailOptions = {
        from: `Your Shop Name <${process.env.EMAIL_USER}>`,
        to: to,
        subject: 'Yêu cầu đặt lại mật khẩu',
        html: `<p>Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng nhấn vào link sau để tiếp tục:</p>
            <p><a href="${resetUrl}">${resetUrl}</a></p>
            <p>Link này sẽ hết hạn sau 10 phút.</p>`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordResetEmail };
