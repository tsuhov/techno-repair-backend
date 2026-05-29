const express = require('express');

const {

  register,

  login,

  verifyEmail,

  forgotPassword,

  resetPassword

} = require('../controllers/authController');


const router = express.Router();


// ======================
// AUTH
// ======================

router.post(
  '/register',
  register
);

router.post(
  '/login',
  login
);


// ======================
// EMAIL VERIFY
// ======================

router.get(
  '/verify/:token',
  verifyEmail
);


// ======================
// RESET PASSWORD
// ======================

router.post(
  '/forgot-password',
  forgotPassword
);

router.post(
  '/reset-password/:token',
  resetPassword
);


module.exports = router;
