const Order = require('../models/Order');

// Получение всех заказов
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Обновление статуса заказа
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    // Добавляем новую запись в историю статусов
    order.statusHistory.push({
      status,
      date: new Date()
    });

    order.status = status;
    order.updatedAt = new Date();
    
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Получение деталей заказа для администратора
const getAdminOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = { getAllOrders, updateOrderStatus, getAdminOrderDetails };
