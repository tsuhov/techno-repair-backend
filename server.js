const repairRoutes =
  require('./routes/repairRoutes');
const path = require('path');
const productRoutes =
  require('./routes/productRoutes');
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
app.use(express.json());
app.use(

  '/uploads',

  express.static(

    'uploads'

  )

);

app.use(express.urlencoded({

  extended: true

}));
const PORT = process.env.PORT || 5000;

// Подключение к базе данных
connectDB();

// Middleware
app.use(cors({
  origin: [
    'https://сттех.рф',
    'https://xn--e1axdaq.xn--p1ai'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(

  '/api/repair',

  repairRoutes

);
// Middleware
app.use(cors({
  origin: [
    'https://сттех.рф',
    'https://xn--e1axdaq.xn--p1ai'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Маршруты
app.use('/api/auth', authRoutes);
app.use('/api/parts', partRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use(
  '/api/products',
  productRoutes
);
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
app.use(

  '/uploads',

  express.static(

    path.join(__dirname, 'uploads')

  )

);
