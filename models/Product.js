const mongoose = require('mongoose');


const productSchema =
  new mongoose.Schema({

    title: {

      type: String,

      required: true

    },

    description: {

      type: String

    },

    price: {

      type: Number,

      required: true

    },

    images: [

      {

        type: String

      }

    ],

    category: {

      type: String

    },

    brand: {

      type: String

    },

    stock: {

      type: Number,

      default: 1

    },

    isPublished: {

      type: Boolean,

      default: true

    },

    createdAt: {

      type: Date,

      default: Date.now

    }

});


module.exports = mongoose.model(
  'Product',
  productSchema
);
