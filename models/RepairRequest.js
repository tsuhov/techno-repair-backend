const mongoose = require('mongoose');


const repairRequestSchema =
  new mongoose.Schema(

    {

      name: {

        type: String,

        required: true

      },


      phone: {

        type: String,

        required: true

      },


      device: {

        type: String,

        required: true

      },


      problem: {

        type: String,

        required: true

      },


      status: {

        type: String,

        default: 'new'

      },


      price: {

        type: Number,

        default: 0

      },


      masterComment: {

        type: String,

        default: ''

      },
      
      images: [

        {

          type: String

        }

      ],

      history: [

        {

          status: String,

          date: {

            type: Date,

            default: Date.now

          }

        }

      ]

    },

    {

      timestamps: true

    }

  );


module.exports =
  mongoose.model(

    'RepairRequest',

    repairRequestSchema

  );
