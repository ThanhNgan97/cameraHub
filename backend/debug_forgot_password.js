const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const prisma = new PrismaClient();

async function main() {
    const email = "nancy@gmail.com";
    console.log(`Testing forgot password for: ${email}`);

    try {
        const user = await prisma.users.findUnique({ where: { email } });
        if (!user) {
            console.error("User not found (unexpected in this test)");
            return;
        }
        console.log("User found:", user.id);

        const resetToken = crypto.randomBytes(20).toString('hex');
        const expireTime = new Date(Date.now() + 3600000); // 1 hour

        console.log("Attempting update...");
        const updatedUser = await prisma.users.update({
            where: { email },
            data: {
                reset_password_token: resetToken,
                reset_password_expires: expireTime
            }
        });
        console.log("Update successful");
        console.log("Token:", resetToken);

    } catch (error) {
        console.error("ERROR CAUGHT:");
        console.error(error);
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
