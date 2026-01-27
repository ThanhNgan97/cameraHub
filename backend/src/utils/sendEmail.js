const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = async ({ email, subject, message, html }) => {
    await transporter.sendMail({
        from: `"CameraHub Support" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject,
        text: message, // Fallback plain text
        html: html || message // Use HTML if provided, otherwise fallback to message (if message contains HTML)
    });
};
