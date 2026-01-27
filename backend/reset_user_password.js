const prisma = require('./src/config/prisma');
const bcrypt = require('bcryptjs');

async function resetPassword() {
    const email = 'nguyenthanhngan09072002@gmail.com';
    const newPassword = '123456';

    try {
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(newPassword, salt);

        const user = await prisma.users.update({
            where: { email: email },
            data: { password_hash: password_hash }
        });

        console.log(`Password for ${email} has been reset to: ${newPassword}`);
    } catch (error) {
        console.error('Error resetting password:', error);
    } finally {
        await prisma.$disconnect();
    }
}

resetPassword();
