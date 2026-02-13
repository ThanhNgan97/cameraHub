const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all addresses for the logged-in user
const getAddresses = async (req, res) => {
    try {
        const userId = req.user.id;
        const addresses = await prisma.user_addresses.findMany({
            where: { user_id: BigInt(userId) },
            orderBy: { is_default: 'desc' } // Default address first
        });

        // Convert BigInt to string for JSON serialization
        const serializedAddresses = addresses.map(addr => ({
            ...addr,
            id: addr.id.toString(),
            user_id: addr.user_id.toString()
        }));

        res.json({ success: true, addresses: serializedAddresses });
    } catch (error) {
        console.error('Get addresses error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Add a new address
const addAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { full_name, phone, email, province, district, ward, address_detail, is_default } = req.body;

        // If setting as default, unset other defaults
        if (is_default) {
            await prisma.user_addresses.updateMany({
                where: { user_id: BigInt(userId) },
                data: { is_default: false }
            });
        }

        const newAddress = await prisma.user_addresses.create({
            data: {
                user_id: BigInt(userId),
                full_name,
                phone,
                email, // Add email
                province,
                district,
                ward,
                address_detail,
                is_default: is_default || false
            }
        });

        res.json({
            success: true,
            message: 'Address added successfully',
            address: {
                ...newAddress,
                id: newAddress.id.toString(),
                user_id: newAddress.user_id.toString()
            }
        });
    } catch (error) {
        console.error('Add address error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Update an address
const updateAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.id;
        const { full_name, phone, email, province, district, ward, address_detail, is_default } = req.body;

        // Check if address belongs to user
        const existingAddress = await prisma.user_addresses.findFirst({
            where: {
                id: BigInt(addressId),
                user_id: BigInt(userId)
            }
        });

        if (!existingAddress) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }

        // If setting as default, unset other defaults
        if (is_default) {
            await prisma.user_addresses.updateMany({
                where: { user_id: BigInt(userId) },
                data: { is_default: false }
            });
        }

        const updatedAddress = await prisma.user_addresses.update({
            where: { id: BigInt(addressId) },
            data: {
                full_name,
                phone,
                email, // Add email
                province,
                district,
                ward,
                address_detail,
                is_default
            }
        });

        res.json({
            success: true,
            message: 'Address updated successfully',
            address: {
                ...updatedAddress,
                id: updatedAddress.id.toString(),
                user_id: updatedAddress.user_id.toString()
            }
        });
    } catch (error) {
        console.error('Update address error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Delete an address
const deleteAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.id;

        const result = await prisma.user_addresses.deleteMany({
            where: {
                id: BigInt(addressId),
                user_id: BigInt(userId)
            }
        });

        if (result.count === 0) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }

        res.json({ success: true, message: 'Address deleted successfully' });
    } catch (error) {
        console.error('Delete address error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Set address as default
const setDefaultAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.id;

        // Unset all defaults
        await prisma.user_addresses.updateMany({
            where: { user_id: BigInt(userId) },
            data: { is_default: false }
        });

        // Set specific address as default
        const updated = await prisma.user_addresses.updateMany({
            where: {
                id: BigInt(addressId),
                user_id: BigInt(userId)
            },
            data: { is_default: true }
        });

        if (updated.count === 0) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }

        res.json({ success: true, message: 'Default address set successfully' });
    } catch (error) {
        console.error('Set default address error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
};
