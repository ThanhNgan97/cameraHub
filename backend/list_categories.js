
const prisma = require('./src/config/prisma');

async function main() {
    const categories = await prisma.products.findMany({
        select: { category: true },
        distinct: ['category']
    });
    console.log('Distinct Categories:', categories.map(c => c.category));
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
