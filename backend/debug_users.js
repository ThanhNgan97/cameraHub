const prisma = require('./src/config/prisma');

// Helper to handle BigInt serialization for JSON.stringify
BigInt.prototype.toJSON = function () { return this.toString() }

async function main() {
    const users = await prisma.users.findMany({
        select: {
            id: true,
            email: true,
            full_name: true
        }
    });
    console.log(JSON.stringify(users, null, 2));
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
