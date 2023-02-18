import nodemailer from "nodemailer";
import { EmailNotification, TransformedError } from "../@types/tuesplace";
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
  message: EmailNotification,
  attachments?: any[]
) => {
  await transporter.sendMail({
    ...message,
    from: message.from || "noreply @ tuesplace <noreply@tuesplace.com>",
    to: receiverEmail,
    attachments,
  });
};

export const sendAdminEmail = async (
  err: TransformedError & { stacktrace: any },
  { reqId, errorContext }: { reqId?: string; errorContext?: string }
) => {
  await sendEmail(adminEmail, {
    subject: `Request: ${reqId || errorContext}, Error ${err.name}`,
    text: JSON.stringify(err, null, 2),
  });
};
