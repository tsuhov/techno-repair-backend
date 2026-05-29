const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const User = require('../models/User');


// ======================
// REGISTER
// ======================

const register = async (req, res) => {

  try {

    console.log('REGISTER START');


    const {

      name,

      email,

      password

    } = req.body;


    const existingUser =
      await User.findOne({ email });


    if (existingUser) {

      return res.status(400).json({

        message:
          'Пользователь уже существует'

      });

    }


    const user = new User({

      name,

      email,

      password

    });


    await user.save();

    console.log('USER SAVED');


    res.status(201).json({

      message:
        'Регистрация успешна'

    });

  } catch (error) {

    console.error(
      'REGISTER ERROR:',
      error
    );


    res.status(500).json({

      message:
        'Ошибка сервера'

    });

  }

};


// ======================
// LOGIN
// ======================

const login = async (req, res) => {

  try {

    console.log('LOGIN START');


    const {

      email,

      password

    } = req.body;


    console.log('EMAIL:', email);


    const user =
      await User.findOne({ email });


    console.log('USER:', user);


    if (!user) {

      console.log('USER NOT FOUND');


      return res.status(400).json({

        message:
          'Неверный email или пароль'

      });

    }


    const isMatch =
      await user.comparePassword(password);


    console.log(
      'PASSWORD MATCH:',
      isMatch
    );


    if (!isMatch) {

      return res.status(400).json({

        message:
          'Неверный email или пароль'

      });

    }


    const token = jwt.sign(

      {

        userId:
          user._id

      },

      process.env.JWT_SECRET,

      {

        expiresIn:
          '7d'

      }

    );


    console.log('LOGIN SUCCESS');


    res.json({

      token,

      user: {

        id:
          user._id,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role

      }

    });

  } catch (error) {

    console.error(
      'LOGIN ERROR:',
      error
    );


    res.status(500).json({

      message:
        'Ошибка сервера'

    });

  }

};


// ======================
// VERIFY EMAIL
// ======================

const verifyEmail = async (
  req,
  res
) => {

  try {

    res.json({

      message:
        'Email verification временно отключен'

    });

  } catch (error) {

    console.error(
      'VERIFY ERROR:',
      error
    );


    res.status(500).json({

      message:
        'Ошибка сервера'

    });

  }

};


// ======================
// FORGOT PASSWORD
// ======================

const forgotPassword = async (
  req,
  res
) => {

  try {

    res.json({

      message:
        'Сброс пароля временно отключен'

    });

  } catch (error) {

    console.error(
      'FORGOT ERROR:',
      error
    );


    res.status(500).json({

      message:
        'Ошибка сервера'

    });

  }

};


// ======================
// RESET PASSWORD
// ======================

const resetPassword = async (
  req,
  res
) => {

  try {

    res.json({

      message:
        'Reset password временно отключен'

    });

  } catch (error) {

    console.error(
      'RESET ERROR:',
      error
    );


    res.status(500).json({

      message:
        'Ошибка сервера'

    });

  }

};


module.exports = {

  register,

  login,

  verifyEmail,

  forgotPassword,

  resetPassword

};
