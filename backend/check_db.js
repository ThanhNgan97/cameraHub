const prisma = require('./src/config/prisma');

async function checkProducts() {
    try {
        const total = await prisma.products.count();
        console.log('Total products:', total);

        const active = await prisma.products.count({ where: { status: 'active' } });
        console.log('Active products:', active);

        const allProducts = await prisma.products.findMany({
            take: 5,
            select: { id: true, name: true, brand: true, category: true, status: true }
        });
        console.log('Sample products:', JSON.stringify(allProducts, null, 2));

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

checkProducts();
