const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const { getResetPasswordEmail } = require('../utils/emailTemplates');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper to handle BigInt serialization
const serializeUser = (user) => {
    return {
        ...user,
        id: user.id.toString(),
        created_at: user.created_at,
        updated_at: user.updated_at
    };
};

const register = async (req, res) => {
    try {
        const { full_name, email, password, phone } = req.body;

        // Validate phone number
        const { isValidPhoneNumber } = require('../utils/validation');
        if (phone && !isValidPhoneNumber(phone)) {
            return res.status(400).json({ message: 'Phone number must be exactly 10 digits' });
        }

        // Check if user exists
        const existingUser = await prisma.users.findFirst({
            where: {
                OR: [
                    { email: email },
                    { phone: phone }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or phone already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await prisma.users.create({
            data: {
                full_name,
                email,
                phone,
                password_hash,
                role: 'user', // Default role
                status: 'active'
            }
        });

        // Generate JWT
        const token = jwt.sign(
            { id: newUser.id.toString(), email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET || 'your_jwt_secret_key',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: serializeUser(newUser)
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', { email, password });

        // Find user
        const user = await prisma.users.findUnique({
            where: { email }
        });

        if (!user) {
            console.log('User not found');
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('User found:', user.email, 'Hash:', user.password_hash);

        // Check password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        console.log('Password match result:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Check active status
        if (user.status !== 'active') {
            return res.status(403).json({ message: 'Account is not active' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id.toString(), email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret_key',
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: serializeUser(user)
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getMe = async (req, res) => {
    try {
        // req.user is set by authMiddleware
        const user = await prisma.users.findUnique({
            where: { id: BigInt(req.user.id) }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user: serializeUser(user) });
    } catch (error) {
        console.error('GetMe error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await prisma.users.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 1. TẠO MÃ 8 SỐ
        const resetToken = Math.floor(10000000 + Math.random() * 90000000).toString();

        // 2. HASH TOKEN ĐỂ LƯU DB
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        const expireTime = new Date(Date.now() + 5 * 60 * 1000); // 5 phút

        await prisma.users.update({
            where: { id: user.id },
            data: {
                reset_password_token: hashedToken,
                reset_password_expires: expireTime
            }
        });

        //  3. GỬI EMAIL (DÙNG resetToken)
        const sendEmail = require('../utils/sendEmail');

        await sendEmail({
            email: user.email,
            subject: 'Mã đặt lại mật khẩu – CameraHub',
            message: `Mã xác nhận của bạn là: ${resetToken}`,
            html: getResetPasswordEmail(resetToken)
        });

        res.json({ message: 'Password reset code sent to email' });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Token and new password are required' });
        }


        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex')

        const user = await prisma.users.findFirst({
            where: {
                reset_password_token: hashedToken,
                reset_password_expires: { gt: new Date() }
            }
        })

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(newPassword, salt);

        // Update user
        await prisma.users.update({
            where: { id: BigInt(user.id) },
            data: {
                password_hash,
                reset_password_token: null,
                reset_password_expires: null
            }
        });


        res.json({ message: 'Password reset successfully' });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({ message: 'Google credential/token is required' });
        }

        let email, name, picture;

        // Try verifying as ID Token first
        try {
            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            email = payload.email;
            name = payload.name;
            picture = payload.picture;
        } catch (idTokenError) {
            // If verification fails, assume it's an Access Token and try UserInfo endpoint
            try {
                const axios = require('axios');
                const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${credential}` }
                });

                email = userInfoResponse.data.email;
                name = userInfoResponse.data.name;
                picture = userInfoResponse.data.picture;

            } catch (accessTokenError) {
                console.error('Token verification failed:', accessTokenError.message);
                return res.status(401).json({ message: 'Invalid Google token' });
            }
        }

        let user = await prisma.users.findUnique({
            where: { email }
        });

        if (!user) {
            user = await prisma.users.create({
                data: {
                    full_name: name,
                    email,
                    avatar: picture,
                    password_hash: 'GOOGLE_LOGIN',
                    role: 'user',
                    status: 'active'
                }
            });
        }

        const token = jwt.sign(
            { id: user.id.toString(), email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: serializeUser(user)
        });

    } catch (err) {
        console.error('Google login error:', err);
        res.status(401).json({ message: 'Google login failed' });
    }
};

const githubLogin = (req, res) => {
    const redirectUrl =
        `https://github.com/login/oauth/authorize` +
        `?client_id=${process.env.GITHUB_CLIENT_ID}` +
        `&scope=user:email`;

    res.redirect(redirectUrl);
};


const githubCallback = async (req, res) => {
    try {
        console.log('GitHub Callback Query:', req.query);
        const { code } = req.query;

        // 1. Lấy access_token
        const tokenRes = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            { headers: { Accept: 'application/json' } }
        );

        console.log('GitHub Token Response:', tokenRes.data);

        const accessToken = tokenRes.data.access_token;
        if (!accessToken) throw new Error('No access token');

        // 2. Lấy user info
        const userRes = await axios.get('https://api.github.com/user', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        const githubUser = userRes.data;

        // 3. Lấy email
        const emailRes = await axios.get('https://api.github.com/user/emails', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        const primaryEmail = emailRes.data.find(
            (e) => e.primary && e.verified
        );

        if (!primaryEmail) {
            return res.redirect(
                `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=no_email`
            );
        }

        const email = primaryEmail.email;

        // 4. Tìm theo provider
        let user = await prisma.users.findFirst({
            where: {
                provider: 'github',
                provider_id: githubUser.id.toString(),
            },
        });

        // 5. Nếu chưa có → tìm theo email
        if (!user) {
            const existingUserByEmail = await prisma.users.findUnique({
                where: { email },
            });

            // 6. Có email → gộp account
            if (existingUserByEmail) {
                user = await prisma.users.update({
                    where: { id: existingUserByEmail.id },
                    data: {
                        provider: 'github',
                        provider_id: githubUser.id.toString(),
                        avatar:
                            existingUserByEmail.avatar ||
                            githubUser.avatar_url,
                    },
                });
            }
            // 7. Chưa có gì → tạo mới
            else {
                user = await prisma.users.create({
                    data: {
                        full_name: githubUser.name || githubUser.login,
                        email,
                        avatar: githubUser.avatar_url,
                        password_hash: 'GITHUB_LOGIN',
                        provider: 'github',
                        provider_id: githubUser.id.toString(),
                        role: 'user',
                        status: 'active',
                    },
                });
            }
        }

        // 8. Tạo JWT

        const token = jwt.sign(
            {
                id: user.id.toString(),
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // DEBUG LOG
        console.log('GitHub user login success:', {
            id: user.id.toString(),
            email: user.email,
            provider: user.provider,
        });

        // Redirect về frontend
        return res.redirect(
            `${process.env.FRONTEND_URL || 'http://localhost:5173'}/oauth-success?token=${token}`
        );


    } catch (err) {
        console.error('GitHub login error:', err);
        res.redirect(
            `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=github`
        );
    }
};


const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id; // From authMiddleware

        console.log('Change Password Attempt:', { userId, currentPassword: '***' });

        if (!currentPassword || !newPassword) {
            console.log('Missing parameters');
            return res.status(400).json({ message: 'Current and new password are required' });
        }

        const user = await prisma.users.findUnique({
            where: { id: BigInt(userId) }
        });

        if (!user) {
            console.log('User not found in DB');
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify current password
        // Check if user has a password set (social login users might not have a valid hash)
        if (user.password_hash === 'GOOGLE_LOGIN' || user.password_hash === 'GITHUB_LOGIN') {
            console.log('User uses social login, cannot change password this way');
            return res.status(400).json({ message: 'Social login accounts cannot change password directly. Please use "Forgot Password" to set a new one.' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
        if (!isMatch) {
            console.log('Incorrect current password');
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(newPassword, salt);

        await prisma.users.update({
            where: { id: BigInt(userId) },
            data: { password_hash }
        });

        console.log('Password updated successfully');
        res.json({ message: 'Password changed successfully' });

    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    register,
    login,
    getMe,
    forgotPassword,
    resetPassword,
    changePassword,
    googleLogin,
    githubLogin,
    githubCallback
};
