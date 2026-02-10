const prisma = require('./src/config/prisma');

async function seed() {
    console.log('Seeding products...');

    // Check if shop exists, if not create one
    let shop = await prisma.shops.findFirst();
    if (!shop) {
        // We need a user to own the shop
        let user = await prisma.users.findFirst({ where: { role: 'shop' } });
        if (!user) {
            user = await prisma.users.create({
                data: {
                    full_name: 'Test Shop Owner',
                    email: 'shop@example.com',
                    password_hash: 'hash',
                    role: 'shop',
                    status: 'active'
                }
            });
        }

        shop = await prisma.shops.create({
            data: {
                owner_id: user.id,
                shop_name: 'CameraHub Official',
                description: 'Official test shop',
                status: 'approved',
                rating: 5.0
            }
        });
    }

    const products = [
        {
            name: 'Canon EOS R6 Mark II Body (Máy ảnh)',
            brand: 'Canon',
            category: 'Mirrorless',
            price: 59990000,
            status: 'active'
        },
        {
            name: 'Sony Alpha A7 IV Body (Máy ảnh)',
            brand: 'Sony',
            category: 'Mirrorless',
            price: 59990000,
            status: 'active'
        },
        {
            name: 'Fujifilm X-T5 Mirrorless Camera (Máy ảnh)',
            brand: 'Fujifilm',
            category: 'Mirrorless',
            price: 40990000,
            status: 'active'
        },
        {
            name: 'Sony FE 24-70mm f/2.8 GM II Lens (Ống kính)',
            brand: 'Sony',
            category: 'Lens',
            price: 45990000,
            status: 'active'
        },
        {
            name: 'Canon RF 50mm f/1.8 STM Lens (Ống kính)',
            brand: 'Canon',
            category: 'Lens',
            price: 4500000,
            status: 'active'
        },
        {
            name: 'Nikon Z8 Body (Máy ảnh)',
            brand: 'Nikon',
            category: 'Mirrorless',
            price: 94990000,
            status: 'active'
        }
    ];

    for (const p of products) {
        await prisma.products.create({
            data: {
                shop_id: shop.id,
                name: p.name,
                brand: p.brand,
                category: p.category,
                price: p.price,
                status: p.status,
                stock: 10,
                rating: 5.0,
                reviews_count: 0
            }
        });
    }

    console.log(`Seeded ${products.length} products.`);
}

seed()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
