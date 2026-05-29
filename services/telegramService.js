const axios =
  require('axios');


const sendTelegramMessage =
  async text => {

    try {

      const token =
        process.env.TELEGRAM_BOT_TOKEN;


      const chatId =
        process.env.TELEGRAM_CHAT_ID;


      await axios.post(

        `https://api.telegram.org/bot${token}/sendMessage`,

        {

          chat_id: chatId,

          text

        }

      );

    } catch (error) {

      console.error(

        'TELEGRAM ERROR:',

        error.response?.data ||

        error.message

      );

    }

};


module.exports = {

  sendTelegramMessage

};
