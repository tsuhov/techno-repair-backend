const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String },
  applianceModel: { type: String, required: true },
  problemDescription: { type: String, required: true },
  photos: [{ type: String }], // массив URL фотографий
  status: { 
    type: String, 
    default: 'Принято',
    enum: ['Принято', 'Диагностика', 'Ожидание запчастей', 'Ремонт', 'Готово', 'Выдано']
  },
  statusHistory: [{
    status: String,
    date: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// При создании заказа добавляем первый статус в историю
orderSchema.pre('save', function(next) {
  if (this.isNew) {
    this.statusHistory.push({
      status: this.status,
      date: new Date()
    });
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
