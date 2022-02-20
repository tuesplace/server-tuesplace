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

module.exports = async (receiverEmail, subject, html) => {
  try {
    await transporter.sendMail({
      from: `Noreply @ Prospect <no-reply@prospect.education>`,
      to: receiverEmail,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong. Try resending the email");
  }
};
