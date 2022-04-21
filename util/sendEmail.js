const nodemailer = require("nodemailer");

require("dotenv/config");

let transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = async (receiverEmail, subject, html, attachments) => {
  try {
    await transporter.sendMail({
      from: `noreply @ tuesplace <no-reply@tuesplace.com>`,
      to: receiverEmail,
      subject,
      text,
      html,
      attachments
    });
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong. Try resending the email");
  }
};
