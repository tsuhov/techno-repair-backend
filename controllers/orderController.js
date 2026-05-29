const Order = require('../models/Order');

// Создание нового заказа
const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      email,
      address,
      applianceModel,
      problemDescription
    } = req.body;

    const photos = req.files ? req.files.map(file => file.path) : [];

    const order = new Order({
      userId: req.user._id,
      customerName,
      phone,
      email,
      address,
      applianceModel,
      problemDescription,
      photos
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {

    console.error('CREATE ORDER ERROR:', error);

    res.status(500).json({
      message: 'Ошибка сервера',
      error: error.message
   });
}
};

// Получение заказов пользователя
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('ORDER ERROR:', error);

    res.status(500).json({
      message: 'Ошибка сервера',
      error: error.message
    });
  }
};

// Получение деталей заказа
const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        message: 'Ошибка сервера',
        error: error.message
      });
    }
};

module.exports = { createOrder, getUserOrders, getOrderDetails };
