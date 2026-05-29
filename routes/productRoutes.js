const express = require('express');

const multer = require('multer');

const {

  createProduct,

  getProducts,

  getProduct

} = require(
  '../controllers/productController'
);

const {

  auth

} = require(
  '../middleware/authMiddleware'
);


const router = express.Router();


// ======================
// MULTER
// ======================

const storage =
  multer.diskStorage({

    destination: (
      req,
      file,
      cb
    ) => {

      cb(
        null,
        '/app/uploads/'
      );

    },

    filename: (
      req,
      file,
      cb
    ) => {

      cb(

        null,

        Date.now() +

        '-' +

        file.originalname

      );

    }

});


const upload =
  multer({ storage });


// ======================
// PUBLIC
// ======================

router.get(
  '/',
  getProducts
);

router.get(
  '/:id',
  getProduct
);


// ======================
// ADMIN
// ======================

router.post(

  '/',

  auth,

  upload.array('images', 5),

  createProduct

);


module.exports = router;
