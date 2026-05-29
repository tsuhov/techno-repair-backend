const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');


const userSchema =
  new mongoose.Schema({

    name: {

      type: String,

      required: true

    },

    email: {

      type: String,

      required: true,

      unique: true

    },

    password: {

      type: String,

      required: true

    },

    role: {

      type: String,

      default: 'user'

    },

    isVerified: {

      type: Boolean,

      default: true

    },

    verificationToken: {

      type: String

    },

    resetPasswordToken: {

      type: String

    },

    resetPasswordExpires: {

      type: Date

    },

    createdAt: {

      type: Date,

      default: Date.now

    }

});


// ======================
// HASH PASSWORD
// ======================

userSchema.pre(

  'save',

  async function() {

    if (
      !this.isModified('password')
    ) {

      return;

    }


    this.password =
      await bcrypt.hash(
        this.password,
        10
      );


    

});


// ======================
// COMPARE PASSWORD
// ======================

userSchema.methods.comparePassword =
  async function(password) {

    return await bcrypt.compare(

      password,

      this.password

    );

};


// ======================
// EXPORT
// ======================

module.exports =
  mongoose.model(
    'User',
    userSchema
);
