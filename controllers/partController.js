const Part = require('../models/Part');

// Получение всех запчастей с фильтрацией и сортировкой
const getParts = async (req, res) => {
  try {
    const {
      brand,
      type,
      minPrice,
      maxPrice,
      sortBy = 'popularity',
      sortOrder = 'desc'
    } = req.query;

    // Построение фильтра
    let filter = {};
    if (brand) filter.brand = brand;
    if (type) filter.type = type;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Построение сортировки
    let sort = {};
    switch (sortBy) {
      case 'priceAsc':
        sort.price = 1;
        break;
      case 'priceDesc':
        sort.price = -1;
        break;
      default:
        sort.popularity = -1;
    }

    const parts = await Part.find(filter).sort(sort);
    res.json(parts);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Получение уникальных брендов и типов для фильтров
const getFilters = async (req, res) => {
  try {
    const brands = await Part.distinct('brand');
    const types = await Part.distinct('type');
    res.json({ brands, types });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = { getParts, getFilters };
