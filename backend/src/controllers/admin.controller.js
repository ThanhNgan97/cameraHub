const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');

// Helper for BigInt serialization
const serializeAdmin = (obj) => {
    if (!obj) return null;
    const serialized = {
        ...obj,
        id: obj.id ? obj.id.toString() : undefined,
        created_at: obj.created_at,
        updated_at: obj.updated_at
    };

    // Handle specific relations
    if (obj.target_id) serialized.target_id = obj.target_id.toString();
    if (obj.admin_id) serialized.admin_id = obj.admin_id.toString();
    if (obj.reporter_id) serialized.reporter_id = obj.reporter_id.toString();

    return serialized;
};

// --- Statistics ---

const getDashboardStats = async (req, res) => {
    try {
        const [totalUsers, totalShops, totalProducts, totalOrders, totalRevenue] = await Promise.all([
            prisma.users.count(),
            prisma.shops.count(),
            prisma.products.count(),
            prisma.orders.count(),
            prisma.orders.aggregate({
                _sum: { total_price: true },
                where: { status: 'completed' } // Only count completed orders
            })
        ]);

        res.json({
            data: {
                totalUsers,
                totalShops,
                totalProducts,
                totalOrders,
                totalRevenue: totalRevenue._sum.total_price || 0
            }
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// --- Admin Management (Super Admin only) ---

const getAllAdmins = async (req, res) => {
    try {
        const admins = await prisma.admins.findMany({
            select: {
                id: true,
                full_name: true,
                email: true,
                role: true,
                is_active: true,
                created_at: true
            }
        });

        res.json({ data: admins.map(serializeAdmin) });
    } catch (error) {
        console.error('Get admins error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createAdmin = async (req, res) => {
    try {
        const { full_name, email, password, role } = req.body;

        // Check duplicates
        const existing = await prisma.admins.findUnique({ where: { email } });
        if (existing) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const newAdmin = await prisma.admins.create({
            data: {
                full_name,
                email,
                password_hash,
                role: role || 'admin',
                is_active: true
            }
        });

        res.status(201).json({
            message: 'Admin created successfully',
            data: serializeAdmin(newAdmin)
        });

    } catch (error) {
        console.error('Create admin error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// --- Shop Approvals ---

const getPendingShops = async (req, res) => {
    try {
        const shops = await prisma.shops.findMany({
            where: { status: 'pending' },
            include: { users: true } // Include owner info
        });

        const serialized = shops.map(shop => {
            const s = serializeAdmin(shop);
            if (s.users) {
                s.owner = serializeAdmin(shop.users);
                delete s.users;
            }
            s.owner_id = shop.owner_id.toString();
            return s;
        });

        res.json({ data: serialized });
    } catch (error) {
        console.error('Get pending shops error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const approveShop = async (req, res) => {
    try {
        const { id } = req.params; // Shop ID
        const { action, note } = req.body; // action: 'approve' | 'reject'
        const adminId = BigInt(req.user.id); // Assuming admin is logged in via auth middleware mapping to admins table?

        if (!['approve', 'reject'].includes(action)) {
            return res.status(400).json({ message: "Action must be 'approve' or 'reject'" });
        }

        const status = action === 'approve' ? 'approved' : 'rejected';

        // Update Shop
        const shop = await prisma.shops.update({
            where: { id: BigInt(id) },
            data: { status: status }
        });


        let adminRecordId = null;
        if (req.user && req.user.email) {
            const adminRecord = await prisma.admins.findUnique({ where: { email: req.user.email } });
            if (adminRecord) adminRecordId = adminRecord.id;
        }

        await prisma.shop_approvals.create({
            data: {
                shop_id: BigInt(id),
                admin_id: adminRecordId, // Can be null if not found in admins table
                status: status,
                note: note,
                reviewed_at: new Date()
            }
        });

        res.json({ message: `Shop ${status} successfully` });

    } catch (error) {
        console.error('Approve shop error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// --- Product Approvals ---

const getPendingProducts = async (req, res) => {
    try {
        const products = await prisma.products.findMany({
            where: { status: 'pending' },
            include: { shops: true }
        });

        res.json({
            data: products.map(p => {
                const s = serializeAdmin(p);
                s.shop_id = p.shop_id.toString();
                if (s.shops) {
                    s.shop_name = p.shops.shop_name;
                    delete s.shops;
                }
                return s;
            })
        });
    } catch (error) {
        console.error('Get pending products error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const approveProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { action, note } = req.body;

        if (!['approve', 'reject'].includes(action)) {
            return res.status(400).json({ message: "Action must be 'approve' or 'reject'" });
        }

        const status = action === 'approve' ? 'active' : 'inactive'; // Product status enum: active, inactive, pending
        const approvalStatus = action === 'approve' ? 'approved' : 'rejected';

        await prisma.products.update({
            where: { id: BigInt(id) },
            data: { status: status }
        });

        let adminRecordId = null;
        if (req.user && req.user.email) {
            const adminRecord = await prisma.admins.findUnique({ where: { email: req.user.email } });
            if (adminRecord) adminRecordId = adminRecord.id;
        }

        await prisma.product_approvals.create({
            data: {
                product_id: BigInt(id),
                admin_id: adminRecordId,
                status: approvalStatus,
                note: note,
                reviewed_at: new Date()
            }
        });

        res.json({ message: `Product ${action}ed successfully` });

    } catch (error) {
        console.error('Approve product error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// --- Reports ---

const getAllReports = async (req, res) => {
    try {
        const { status } = req.query; // pending, resolved
        const where = {};
        if (status) where.status = status;

        const reports = await prisma.reports.findMany({
            where,
            orderBy: { created_at: 'desc' },
            include: { users: { select: { full_name: true, email: true } } }
        });

        const serialized = reports.map(r => {
            const s = serializeAdmin(r);
            if (s.users) {
                s.reporter_name = s.users.full_name;
                s.reporter_email = s.users.email;
                delete s.users;
            }
            return s;
        });

        res.json({ data: serialized });
    } catch (error) {
        console.error('Get reports error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const resolveReport = async (req, res) => {
    try {
        const { id } = req.params;
        const { resolution } = req.body; // just a note or reasoning?

        // There is no 'resolution' field in schema, just status. 
        // Maybe update report status to 'resolved'.

        await prisma.reports.update({
            where: { id: BigInt(id) },
            data: { status: 'resolved' }
        });

        // If you need to log the resolution detail, potentially log to admin_logs or a new field.
        // For now, just updating status.

        res.json({ message: 'Report resolved' });
    } catch (error) {
        console.error('Resolve report error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    getDashboardStats,
    getAllAdmins,
    createAdmin,
    getPendingShops,
    approveShop,
    getPendingProducts,
    approveProduct,
    getAllReports,
    resolveReport
};
