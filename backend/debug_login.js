const prisma = require('./src/config/prisma');

async function checkUser() {
    const email = 'nganb2203569@student.ctu.edu.vn';
    try {
        const user = await prisma.users.findUnique({
            where: { email: email }
        });

        if (user) {
            console.log('User found:', user.email);
            console.log('Role:', user.role);
            console.log('Status:', user.status);
            console.log('Password Hash exists:', !!user.password_hash);
        } else {
            console.log('User NOT found with email:', email);
        }
    } catch (error) {
        console.error('Error querying database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkUser();
