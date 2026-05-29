const express = require('express');

const multer = require('multer');

const path = require('path');


const router =
  express.Router();


const {

  createRepairRequest,

  getRepairRequests,

  updateRepairStatus,

  deleteRepairRequest

} = require(

  '../controllers/repairController'

);


// ======================
// MULTER
// ======================

const storage =
  multer.diskStorage({

    destination:

      (req, file, cb) => {

        cb(

          null,

          'uploads'

        );

      },


    filename:

      (req, file, cb) => {

        cb(

          null,

          Date.now() +

          path.extname(

            file.originalname

          )

        );

      }

  });


const upload =
  multer({

    storage

  });


// ======================
// ROUTES
// ======================

router.post(

  '/',

  upload.array(

    'images',

    5

  ),

  createRepairRequest

);


router.get(
  '/',
  getRepairRequests
);


router.put(
  '/:id',
  updateRepairStatus
);


router.delete(
  '/:id',
  deleteRepairRequest
);


module.exports = router;
