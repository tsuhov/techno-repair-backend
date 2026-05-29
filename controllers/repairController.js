const RepairRequest =
  require('../models/RepairRequest');


// ======================
// CREATE
// ======================

const createRepairRequest =
  async (req, res) => {

    try {

      const {

        name,

        phone,

        device,

        problem

      } = req.body;


      // IMAGES

      const images =

        req.files?.map(

          file => file.filename

        ) || [];


      // CREATE REPAIR

      const repair =
        await RepairRequest.create({

          name,

          phone,

          device,

          problem,

          images,

          status: 'new',


          history: [

            {

              status: 'new'

            }

          ]

        });


      res.status(201).json(repair);

    } catch (error) {

      console.error(error);

      res.status(500).json({

        message:

          'Ошибка создания заявки'

      });

    }

  };


// ======================
// GET ALL
// ======================

const getRepairRequests =
  async (req, res) => {

    try {

      const requests =
        await RepairRequest.find()

          .sort({

            createdAt: -1

          });


      res.json(requests);

    } catch (error) {

      console.error(error);

      res.status(500).json({

        message:

          'Ошибка получения заявок'

      });

    }

  };


// ======================
// UPDATE
// ======================

const updateRepairStatus =
  async (req, res) => {

    try {

      const {

        status,

        price,

        masterComment

      } = req.body;


      const repair =
        await RepairRequest.findById(

          req.params.id

        );


      if (!repair) {

        return res.status(404).json({

          message:

            'Заявка не найдена'

        });

      }


      // STATUS

      if (status) {

        repair.status = status;


        repair.history.push({

          status

        });

      }


      // PRICE

      if (price !== undefined) {

        repair.price = price;

      }


      // COMMENT

      if (masterComment !== undefined) {

        repair.masterComment =
          masterComment;

      }


      await repair.save();


      res.json(repair);

    } catch (error) {

      console.error(error);

      res.status(500).json({

        message:

          'Ошибка обновления'

      });

    }

  };


// ======================
// DELETE
// ======================

const deleteRepairRequest =
  async (req, res) => {

    try {

      await RepairRequest.findByIdAndDelete(

        req.params.id

      );


      res.json({

        message:

          'Заявка удалена'

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        message:

          'Ошибка удаления'

      });

    }

  };


module.exports = {

  createRepairRequest,

  getRepairRequests,

  updateRepairStatus,

  deleteRepairRequest

};
