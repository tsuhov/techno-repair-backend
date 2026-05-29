const express = require('express');
const multer = require('multer');
const path = require('path');

const Order = require('../models/Order');

const { auth } = require('../middleware/authMiddleware');

const {
  createOrder,
  getUserOrders,
  getOrderDetails
} = require('../controllers/orderController');

const router = express.Router();


// ======================
// Multer config
// ======================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, '/app/uploads/');
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + '-' + file.originalname;

    cb(null, uniqueName);
  }

});

const upload = multer({
  storage
});


// ======================
// Admin routes
// ======================

router.get('/admin/all', async (req, res) => {

  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Ошибка сервера'
    });

  }

});


// ======================
// Auth middleware
// ======================

router.use(auth);


// ======================
// User routes
// ======================

router.post(
  '/',
  upload.array('photos', 3),
  createOrder
);

router.get('/', getUserOrders);

router.get('/:id', getOrderDetails);


module.exports = router;
