const express = require('express');
const { adminAuth } = require('../middleware/authMiddleware');
const { 
  getAllOrders, 
  updateOrderStatus, 
  getAdminOrderDetails 
} = require('../controllers/adminController');

const router = express.Router();

router.use(adminAuth);

router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.get('/orders/:id', getAdminOrderDetails);

module.exports = router;

