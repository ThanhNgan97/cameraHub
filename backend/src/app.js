const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/shops', require('./routes/shop.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

// Basic health check route
app.get('/', (req, res) => {
    res.send('CameraHub Backend API is running');
});

module.exports = app;
