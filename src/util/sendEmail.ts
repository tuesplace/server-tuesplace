import nodemailer from "nodemailer";

import "dotenv/config";

let transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async (receiverEmail: string, subject: string, html: string, attachments: any[]) => {
  try {
    await transporter.sendMail({
      from: `noreply @ tuesplace <no-reply@tuesplace.com>`,
      to: receiverEmail,
      subject,
      html,
      attachments,
    });
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong. Try resending the email");
  }
};
