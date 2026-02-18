require('dotenv').config();
const app = require('./app');
const prisma = require('./config/prisma');

const PORT = process.env.PORT || 3000;

async function checkDbConnection() {
    try {
        await prisma.$connect();
        console.log('Successfully connected to the database with Prisma.');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
}

checkDbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

// Restart backend server to apply updates
