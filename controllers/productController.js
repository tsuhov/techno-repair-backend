const Product = require('../models/Product');


// ======================
// CREATE PRODUCT
// ======================

const createProduct = async (
  req,
  res
) => {

  try {

    const {

      title,

      description,

      price,

      category,

      brand,

      stock

    } = req.body;


    const images =

      req.files

        ? req.files.map(
            file => file.path
          )

        : [];


    const product =
      new Product({

        title,

        description,

        price,

        category,

        brand,

        stock,

        images

      });


    await product.save();


    res.status(201).json(product);

  } catch (error) {

    console.error(
      'CREATE PRODUCT ERROR:',
      error
    );


    res.status(500).json({

      message:
        'Ошибка сервера'

    });

  }

};


// ======================
// GET PRODUCTS
// ======================

const getProducts = async (
  req,
  res
) => {

  try {

    const products =
      await Product.find({

        isPublished: true

      }).sort({

        createdAt: -1

      });


    res.json(products);

  } catch (error) {

    console.error(
      'GET PRODUCTS ERROR:',
      error
    );


    res.status(500).json({

      message:
        'Ошибка сервера'

    });

  }

};


// ======================
// GET PRODUCT
// ======================

const getProduct = async (
  req,
  res
) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      );


    if (!product) {

      return res.status(404).json({

        message:
          'Товар не найден'

      });

    }


    res.json(product);

  } catch (error) {

    console.error(
      'GET PRODUCT ERROR:',
      error
    );


    res.status(500).json({

      message:
        'Ошибка сервера'

    });

  }

};


module.exports = {

  createProduct,

  getProducts,

  getProduct

};
