const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  type: { type: String, required: true }, // холодильник, стиральная машина и т.д.
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  image: { type: String }, // URL изображения
  description: { type: String },
  popularity: { type: Number, default: 0 } // для сортировки по популярности
});

module.exports = mongoose.model('Part', partSchema);
