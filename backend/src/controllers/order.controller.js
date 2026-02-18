const prisma = require("../config/prisma");

exports.createOrder = async (req, res) => {
    try {
        const userId = req.user.id; // From authMiddleware
        const { items, shipping, paymentMethod } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items in order" });
        }

        // 1. Handle Address
        // In a real app, we might check if an identical address exists to reuse it,
        // but creating a new one ensures history preservation if the user changes details.
        // Also, `user_addresses` table seems to be used for saved addresses.
        // We will create a new address record.
        const addressData = {
            user_id: userId, // Assuming BigInt handles this or convert if needed
            full_name: shipping.fullName,
            phone: shipping.phone,
            email: shipping.email,
            province: shipping.city,
            district: shipping.district,
            ward: shipping.ward || "", // Handle optional ward
            address_detail: shipping.address,
            note: shipping.note,
            is_default: false
        };

        const newAddress = await prisma.user_addresses.create({
            data: addressData
        });


        // 2. Group items by Shop to determine Shop IDs
        // We need to fetch product details to get shop_id and price (security: don't trust frontend price)
        const productIds = items.map(item => BigInt(item.id));
        const products = await prisma.products.findMany({
            where: { id: { in: productIds } },
            select: { id: true, shop_id: true, price: true, discount_price: true }
        });

        const productMap = new Map(products.map(p => [p.id.toString(), p]));
        const itemsByShop = {};

        for (const item of items) {
            const product = productMap.get(item.id.toString());
            if (!product) continue;

            const shopId = product.shop_id.toString();
            if (!itemsByShop[shopId]) {
                itemsByShop[shopId] = [];
            }

            // Use current price (discounted if available)
            const finalPrice = product.discount_price || product.price;

            itemsByShop[shopId].push({
                product_id: product.id,
                quantity: item.quantity,
                price: finalPrice
            });
        }

        // 3. Create Orders (Transaction)
        const createdOrders = [];
        let grandTotal = 0;

        await prisma.$transaction(async (tx) => {
            for (const shopId in itemsByShop) {
                const shopItems = itemsByShop[shopId];
                // Calculate total for this shop's order
                const totalAmount = shopItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
                grandTotal += totalAmount;

                // Create Order
                const order = await tx.orders.create({
                    data: {
                        user_id: userId,
                        shop_id: BigInt(shopId),
                        address_id: newAddress.id,
                        total_price: totalAmount,
                        payment_status: "pending",
                        payment_method: paymentMethod,
                        status: "pending"
                    }
                });

                // Create Order Items
                // Note: Prisma createMany is not supported inside create for nested writes in older versions or some connectors,
                // but usually `create: [...]` works if relation is defined.
                // However, `order_items` has `orders` relation.
                // Let's iterate to be safe or use createMany if supported.
                // Using createMany on strict mode is better.

                await tx.order_items.createMany({
                    data: shopItems.map(item => ({
                        order_id: order.id,
                        product_id: item.product_id,
                        quantity: item.quantity,
                        price: item.price
                    }))
                });

                createdOrders.push(order);
            }
        });

        // Convert BigInt to string for JSON response
        const ordersForResponse = createdOrders.map(o => ({
            ...o,
            id: o.id.toString(),
            user_id: o.user_id.toString(),
            shop_id: o.shop_id.toString(),
            address_id: o.address_id.toString(),
            total_price: Number(o.total_price)
        }));

        res.status(201).json({
            success: true,
            orders: ordersForResponse,
            grandTotal: grandTotal,
            message: "Order created successfully"
        });

    } catch (error) {
        console.error("Create order error:", error);
        res.status(500).json({ message: "Failed to create order", error: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await prisma.orders.findMany({
            where: { user_id: userId },
            include: {
                order_items: {
                    include: {
                        products: {
                            include: {
                                product_images: true
                            }
                        }
                    }
                },
                shops: true
            },
            orderBy: { created_at: 'desc' }
        });

        const formattedOrders = orders.map(order => ({
            id: order.id.toString(),
            shopName: order.shops ? order.shops.shop_name : "Shop",
            status: order.status,
            statusLabel: order.status,
            total: Number(order.total_price),
            paymentMethod: order.payment_method,
            createdAt: order.created_at,
            products: order.order_items.map(item => {
                const mainImage = item.products.product_images.find(img => img.is_main) || item.products.product_images[0];
                return {
                    name: item.products.name,
                    variant: "Standard",
                    quantity: item.quantity,
                    price: Number(item.price),
                    originalPrice: Number(item.products.price),
                    image: mainImage ? mainImage.image_url : "https://placehold.co/100"
                };
            })
        }));

        res.json({ success: true, orders: formattedOrders });
    } catch (error) {
        console.error("Get user orders error:", error);
        res.status(500).json({ message: "Failed to get orders", error: error.message });
    }
};
