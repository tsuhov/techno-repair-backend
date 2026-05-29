const axios = require('axios');


const sendEmail = async (

  to,

  subject,

  html

) => {

  try {

    console.log('EMAIL API START');


    const response = await axios.post(

      'https://api.unisender.com/ru/api/sendEmail',

      null,

      {

        params: {

          format: 'json',

          api_key:
            process.env.UNISENDER_API_KEY,

          email:
            process.env.SMTP_USER,

          sender_name:
            'Techno Repair',

          sender_email:
            process.env.SMTP_USER,

          subject:
            subject,

          body:
            html,

          list_id: 1

        }

      }

    );


    console.log(
      'EMAIL RESPONSE:',
      response.data
    );

  } catch (error) {

    console.error(

      'EMAIL ERROR:',

      error.response?.data ||

      error.message

    );

  }

};


module.exports = sendEmail;
