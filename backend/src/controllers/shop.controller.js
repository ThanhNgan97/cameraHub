const prisma = require('../config/prisma');

// Helper for BigInt serialization
const serializeShop = (shop) => {
    if (!shop) return null;
    const serialized = {
        ...shop,
        id: shop.id.toString(),
        owner_id: shop.owner_id.toString(),
        created_at: shop.created_at,
        updated_at: shop.updated_at
    };

    // Serialize relations if they exist
    if (serialized.products) {
        serialized.products = serialized.products.map(p => ({
            ...p,
            id: p.id.toString(),
            shop_id: p.shop_id.toString(),
            category_id: p.category_id ? p.category_id.toString() : null,
            brand_id: p.brand_id ? p.brand_id.toString() : null
        }));
    }

    if (serialized.shop_statistics) {
        serialized.shop_statistics = {
            ...serialized.shop_statistics,
            shop_id: serialized.shop_statistics.shop_id.toString()
        };
    }

    return serialized;
};

const createShop = async (req, res) => {
    try {
        const { shop_name, description, address, logo } = req.body;
        const owner_id = req.user.id; // From auth middleware


        const newShop = await prisma.shops.create({
            data: {
                owner_id: BigInt(owner_id),
                shop_name,
                description,
                address,
                logo,
                status: 'pending' // Default status
            }
        });


        res.status(201).json({
            message: 'Shop created successfully',
            data: serializeShop(newShop)
        });

    } catch (error) {
        console.error('Create shop error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllShops = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, status, sort } = req.query;
        const skip = (page - 1) * limit;

        const where = {};

        if (search) {
            where.shop_name = { contains: search }; // Implicit case handling
        }

        if (status) {
            where.status = status;
        } else {

        }

        const orderBy = {};
        if (sort === 'rating') {
            orderBy.rating = 'desc';
        } else if (sort === 'newest') {
            orderBy.created_at = 'desc';
        } else {
            orderBy.created_at = 'desc';
        }

        const [shops, total] = await Promise.all([
            prisma.shops.findMany({
                where,
                skip: parseInt(skip),
                take: parseInt(limit),
                orderBy,
                include: {
                    shop_statistics: true
                }
            }),
            prisma.shops.count({ where })
        ]);

        res.json({
            data: shops.map(serializeShop),
            meta: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('Get all shops error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getShopById = async (req, res) => {
    try {
        const { id } = req.params;

        const shop = await prisma.shops.findUnique({
            where: { id: BigInt(id) },
            include: {
                shop_statistics: true,
                shop_reviews: {
                    take: 5,
                    orderBy: { created_at: 'desc' }
                }

            }
        });

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        // Serialize shop reviews as well
        const serialized = serializeShop(shop);
        if (shop.shop_reviews) {
            serialized.shop_reviews = shop.shop_reviews.map(r => ({
                ...r,
                id: r.id.toString(),
                shop_id: r.shop_id.toString(),
                user_id: r.user_id.toString()
            }));
        }

        res.json({ data: serialized });

    } catch (error) {
        console.error('Get shop by id error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateShop = async (req, res) => {
    try {
        const { id } = req.params;
        const { shop_name, description, logo, address, status } = req.body;
        const userId = req.user.id;
        const userRole = req.user.role;

        const shop = await prisma.shops.findUnique({
            where: { id: BigInt(id) }
        });

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        // Permission check
        const isOwner = shop.owner_id.toString() === userId.toString();
        const isAdmin = userRole === 'admin';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: 'Forbidden: You do not own this shop' });
        }

        const dataToUpdate = {};
        if (shop_name) dataToUpdate.shop_name = shop_name;
        if (description) dataToUpdate.description = description;
        if (logo) dataToUpdate.logo = logo;
        if (address) dataToUpdate.address = address;

        // Only admin can update status (e.g. approve/ban)
        if (status) {
            if (!isAdmin) {
                return res.status(403).json({ message: 'Forbidden: Only admin can change shop status' });
            }
            dataToUpdate.status = status;
        }

        const updatedShop = await prisma.shops.update({
            where: { id: BigInt(id) },
            data: {
                ...dataToUpdate,
                updated_at: new Date()
            }
        });

        res.json({
            message: 'Shop updated successfully',
            data: serializeShop(updatedShop)
        });

    } catch (error) {
        console.error('Update shop error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteShop = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;

        const shop = await prisma.shops.findUnique({
            where: { id: BigInt(id) }
        });

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        const isOwner = shop.owner_id.toString() === userId.toString();
        const isAdmin = userRole === 'admin';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this shop' });
        }

        await prisma.shops.delete({
            where: { id: BigInt(id) }
        });

        res.json({ message: 'Shop deleted successfully' });

    } catch (error) {
        console.error('Delete shop error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createShop,
    getAllShops,
    getShopById,
    updateShop,
    deleteShop
};
