const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');

// Helper to handle BigInt serialization
const serializeUser = (user) => {
    if (!user) return null;
    return {
        ...user,
        id: user.id.toString(),
        created_at: user.created_at,
        updated_at: user.updated_at
    };
};

const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, role, status } = req.query;
        const skip = (page - 1) * limit;

        const where = {};

        if (search) {
            where.OR = [
                { full_name: { contains: search } }, // Case insensitive usually requires mode: 'insensitive' if supported or raw query, but default mysql verify
                { email: { contains: search } },
                { phone: { contains: search } }
            ];
        }

        if (role) {
            where.role = role;
        }

        if (status) {
            where.status = status;
        }

        const [users, total] = await Promise.all([
            prisma.users.findMany({
                where,
                skip: parseInt(skip),
                take: parseInt(limit),
                orderBy: { created_at: 'desc' },
                select: {
                    id: true,
                    full_name: true,
                    email: true,
                    phone: true,
                    avatar: true,
                    role: true,
                    status: true,
                    created_at: true,
                    updated_at: true
                }
            }),
            prisma.users.count({ where })
        ]);

        res.json({
            data: users.map(serializeUser),
            meta: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await prisma.users.findUnique({
            where: { id: BigInt(id) },
            include: {
                user_addresses: true,
                shops: true // If user owns shops
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Handle serialization for related BigInt fields if necessary
        const serializedUser = serializeUser(user);
        if (serializedUser.user_addresses) {
            serializedUser.user_addresses = serializedUser.user_addresses.map(addr => ({
                ...addr,
                id: addr.id.toString(),
                user_id: addr.user_id.toString()
            }));
        }
        if (serializedUser.shops) {
            serializedUser.shops = serializedUser.shops.map(shop => ({
                ...shop,
                id: shop.id.toString(),
                owner_id: shop.owner_id.toString()
            }));
        }

        res.json({ data: serializedUser });
    } catch (error) {
        console.error('Get user by id error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, phone, avatar, status, role } = req.body;
        const currentUserRole = req.user.role; // Assumes auth middleware

        // Only admin can update status or role
        if ((status || role) && currentUserRole !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Only admin can update status or role' });
        }

        // Users can update their own profile, Admins can update anyone
        if (currentUserRole !== 'admin' && req.user.id !== id) {
            return res.status(403).json({ message: 'Forbidden: You can only update your own profile' });
        }

        const dataToUpdate = {};
        if (full_name) dataToUpdate.full_name = full_name;
        if (phone) {
            const { isValidPhoneNumber } = require('../utils/validation');
            if (!isValidPhoneNumber(phone)) {
                return res.status(400).json({ message: 'Phone number must be exactly 10 digits' });
            }
            dataToUpdate.phone = phone;
        }
        if (avatar) dataToUpdate.avatar = avatar;
        if (status && currentUserRole === 'admin') dataToUpdate.status = status;
        if (role && currentUserRole === 'admin') dataToUpdate.role = role;

        const updatedUser = await prisma.users.update({
            where: { id: BigInt(id) },
            data: {
                ...dataToUpdate,
                updated_at: new Date()
            }
        });

        res.json({
            message: 'User updated successfully',
            data: serializeUser(updatedUser)
        });

    } catch (error) {
        console.error('Update user error:', error);
        if (error.code === 'P2002') {
            return res.status(400).json({ message: 'Unique constraint violation (email or phone already exists)' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if user exists
        const user = await prisma.users.findUnique({
            where: { id: BigInt(id) }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Soft delete vs Hard delete? Code usually prefers soft delete or status inactive.
        // Assuming Hard Delete for API completeness but with integrity checks via Prisma Schema (onDelete: Cascade etc)
        // Or strictly changing status to banned/inactive.

        await prisma.users.delete({
            where: { id: BigInt(id) }
        });

        res.json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
