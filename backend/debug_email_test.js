require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
    console.log('--- Email Debugger ---');
    console.log(`User: ${process.env.EMAIL_USERNAME || process.env.EMAIL_USER || 'UNDEFINED'}`);
    console.log(`Pass: ${process.env.EMAIL_PASSWORD ? '******' : 'UNDEFINED'}`);

    // Check which variables are actually set
    const user = process.env.EMAIL_USERNAME || process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASSWORD || process.env.EMAIL_PASS;

    if (!user || !pass) {
        console.error('ERROR: Missing EMAIL_USERNAME or EMAIL_PASSWORD (or EMAIL_USER/EMAIL_PASS) in .env');
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: user,
            pass: pass
        }
    });

    try {
        console.log('Attempting to send test email...');
        const info = await transporter.sendMail({
            from: user, // Use the authenticated user as sender
            to: user,   // Send to self for testing
            subject: 'Test Email from CameraHub Debugger',
            text: 'If you receive this, your email configuration is working correctly!'
        });
        console.log('✅ SUCCESS: Email sent!');
        console.log('Message ID:', info.messageId);
    } catch (error) {
        console.error('❌ ERROR: Failed to send email.');
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);
        if (error.response) {
            console.error('SMTP Response:', error.response);
        }
    }
}

testEmail();
