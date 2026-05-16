const express = require('express');
const multer = require('multer');
const { auth } = require('../middleware/authMiddleware');
const { 
  createOrder, 
  getUserOrders, 
  getOrderDetails 
} = require('../controllers/orderController');

const router = express.Router();

// Настройка загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.use(auth);

router.post('/', upload.array('photos', 3), createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrderDetails);

module.exports = router;
