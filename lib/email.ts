import axios from 'axios';

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    const result = await axios.post("https://mail.cradlevoices.com", {
      "token": process.env.CRADLE_TOKEN,
      "recipientEmails": [options.to],
      "emailBody": options.text,
      "subject": options.subject,
      "senderName": "Rift Finance",
      "senderEmail": "sphere@cradlevoices.com"
    }, {});

    console.log(result);
  } catch (e) {
    console.error('Email sending error:', e);
  }
};
