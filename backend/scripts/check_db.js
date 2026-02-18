const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Checking user_addresses table...');
        const addresses = await prisma.user_addresses.findMany();
        console.log(`Found ${addresses.length} addresses.`);

        let nullActiveCount = 0;
        let falseActiveCount = 0;
        let trueActiveCount = 0;

        addresses.forEach(addr => {
            if (addr.is_active === null) nullActiveCount++;
            else if (addr.is_active === false) falseActiveCount++;
            else trueActiveCount++;
        });

        console.log(`Stats:`);
        console.log(`- is_active = NULL: ${nullActiveCount}`);
        console.log(`- is_active = false: ${falseActiveCount}`);
        console.log(`- is_active = true: ${trueActiveCount}`);

        if (nullActiveCount > 0) {
            console.log('Fixing NULL is_active values...');
            await prisma.user_addresses.updateMany({
                where: { is_active: null },
                data: { is_active: true }
            });
            console.log('Updated NULL values to true.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
