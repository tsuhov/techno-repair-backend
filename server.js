const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const partRoutes = require('./routes/partRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Подключение к базе данных
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Маршруты
app.use('/api/auth', authRoutes);
app.use('/api/parts', partRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
