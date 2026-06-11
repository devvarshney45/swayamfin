const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST || 'smtp-relay.brevo.com',
  port: Number(process.env.BREVO_PORT || 587),
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

exports.sendMail = async (options) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || `"Swayamfin" <${process.env.BREVO_USER}>`,
      ...options
    });
    return info;
  } catch (error) {
    console.error('[MAILER ERROR]', error);
    throw error;
  }
};
