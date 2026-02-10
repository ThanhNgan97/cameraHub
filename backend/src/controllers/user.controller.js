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


        await prisma.users.delete({
            where: { id: BigInt(id) }
        });

        res.json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const searchProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, category, brand, minPrice, maxPrice, sort } = req.query;
        const skip = (page - 1) * limit;

        const where = {
            status: 'active' // Only show active products
        };

        // Keyword mapping for better search experience
        const keywordMap = {
            'máy ảnh': ['camera', 'body', 'mirrorless', 'dslr', 'compact'],
            'ống kính': ['lens', 'glass', 'prime', 'zoom'],
            'phụ kiện': ['accessory', 'grip', 'battery', 'card'],
            'máy quay': ['video', 'fx3', 'fx30', 'a7s', 'cinema']
        };

        // SMART SEARCH LOGIC
        const lowerSearch = search.toLowerCase().trim();

        // 1. Define recognized entities
        const knownBrands = ['sony', 'canon', 'nikon', 'fujifilm', 'fuji', 'panasonic', 'olympus', 'pentax', 'leica', 'samsung', 'sigma', 'tamron'];
        const knownCategoriesMapping = {
            'máy ảnh': ['Mirrorless', 'Compact', 'DSLR', 'Máy ảnh'],
            'camera': ['Mirrorless', 'Compact', 'DSLR', 'Máy ảnh'],
            'body': ['Mirrorless', 'Compact', 'DSLR', 'Máy ảnh'],
            'mirrorless': ['Mirrorless'],
            'dslr': ['DSLR'],

            'ống kính': ['Lens', 'Ống kính'],
            'lens': ['Lens', 'Ống kính'],
            'lenses': ['Lens', 'Ống kính'],
            'glass': ['Lens', 'Ống kính'],

            'phụ kiện': ['Accessory', 'Phụ kiện'],
            'accessory': ['Accessory', 'Phụ kiện'],
            'accessories': ['Accessory', 'Phụ kiện'],

            'máy quay': ['Video', 'Máy quay'],
            'video': ['Video', 'Máy quay']
        };

        let extractedBrand = null;
        let extractedCategory = null; // Will be an array
        let remainingTerms = [];

        // 2. Tokenize and classification
        const tokens = lowerSearch.split(/\s+/);

        tokens.forEach(token => {
            // Check for Brand
            if (!extractedBrand && knownBrands.includes(token)) {
                extractedBrand = token; // e.g. 'sony'
                return;
            }
            // Check for Category
            if (!extractedCategory && knownCategoriesMapping[token]) {
                extractedCategory = knownCategoriesMapping[token]; // e.g. ['Mirrorless', 'Compact']
                return;
            }
            remainingTerms.push(token);
        });

        // 3. Construct Where Clause

        // If specific entities found, enforce them
        if (extractedBrand) {
            where.brand = { contains: extractedBrand };
        }
        if (extractedCategory) {
            where.category = { in: extractedCategory };
        }

        // If generic text remains, search in name
        if (remainingTerms.length > 0) {
            const nameSearchString = remainingTerms.join(' ');
            where.name = { contains: nameSearchString };
        } else if (!extractedBrand && !extractedCategory && search) {
            // Fallback to original broad behavior
            let searchTerms = [search];
            Object.keys(knownCategoriesMapping).forEach(key => { // Reuse valid keys as keywords if needed, or just keywordMap logic
                // Simplified fallback: just search name, brand, category with the full string
            });
            where.OR = [
                { name: { contains: search } },
                { brand: { contains: search } },
                { category: { contains: search } }
            ];
            // Append expansion if needed
            const keywordMap = {
                'máy ảnh': ['camera', 'body', 'mirrorless', 'dslr', 'compact'],
                'ống kính': ['lens', 'glass', 'prime', 'zoom'],
                'phụ kiện': ['accessory', 'grip', 'battery', 'card'],
                'máy quay': ['video', 'fx3', 'fx30', 'a7s', 'cinema']
            };
            let expandedTerms = [search];
            Object.keys(keywordMap).forEach(key => {
                if (lowerSearch.includes(key)) {
                    expandedTerms = [...expandedTerms, ...keywordMap[key]];
                }
            });
            // Use expanded terms if present
            if (expandedTerms.length > 1) {
                where.OR = expandedTerms.flatMap(term => [
                    { name: { contains: term } },
                    { brand: { contains: term } },
                    { category: { contains: term } }
                ]);
            }
        }

        // Specific filters
        if (category) {
            where.category = category;
        }
        if (brand) {
            where.brand = brand;
        }

        // Price range
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.gte = parseFloat(minPrice);
            if (maxPrice) where.price.lte = parseFloat(maxPrice);
        }

        // Sorting
        const orderBy = {};
        if (sort === 'price_asc') orderBy.price = 'asc';
        else if (sort === 'price_desc') orderBy.price = 'desc';
        else if (sort === 'newest') orderBy.created_at = 'desc';
        else if (sort === 'rating') orderBy.rating = 'desc';
        else orderBy.created_at = 'desc'; // Default

        const [products, total] = await Promise.all([
            prisma.products.findMany({
                where,
                skip: parseInt(skip),
                take: parseInt(limit),
                orderBy,
                include: {
                    product_images: {
                        where: { is_main: true },
                        take: 1
                    },
                    shops: {
                        select: {
                            id: true,
                            shop_name: true,
                            logo: true,
                            rating: true
                        }
                    }
                }
            }),
            prisma.products.count({ where })
        ]);

        // Helper to serialize product (handle BigInt)
        const serializeProduct = (product) => {
            return {
                ...product,
                id: product.id.toString(),
                shop_id: product.shop_id.toString(),
                category_id: product.category_id ? product.category_id.toString() : null,
                brand_id: product.brand_id ? product.brand_id.toString() : null,
                price: parseFloat(product.price), // Ensure price is number
                discount_price: product.discount_price ? parseFloat(product.discount_price) : null,
                rating: parseFloat(product.rating),
                shops: product.shops ? {
                    ...product.shops,
                    id: product.shops.id.toString(),
                    rating: parseFloat(product.shops.rating)
                } : null,
                product_images: product.product_images.map(img => ({
                    ...img,
                    id: img.id.toString(),
                    product_id: img.product_id.toString()
                }))
            };
        };

        res.json({
            data: products.map(serializeProduct),
            meta: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('Search products error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    searchProducts
};
