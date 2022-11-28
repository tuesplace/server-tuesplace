import nodemailer from "nodemailer";
import { TransformedError } from "../@types/tuesplace";
import { noreplyEmail, noreplyEmailPassword, adminEmail } from "../config";

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  secure: true,
  auth: {
    user: noreplyEmail,
    pass: noreplyEmailPassword,
  },
});

export const sendEmail = async (
  receiverEmail: string,
  subject: string,
  message: { html?: string; text?: string },
  attachments?: any[]
) => {
  await transporter.sendMail({
    from: "noreply @ tuesplace <noreply@tuesplace.com>",
    to: receiverEmail,
    subject,
    ...message,
    attachments,
  });
};

export const sendAdminEmail = async (
  err: TransformedError & { stacktrace: any },
  reqId: string
) => {
  await sendEmail(adminEmail, `Request: ${reqId}, Error ${err.name}`, {
    text: JSON.stringify(err, null, 2),
  });
};
