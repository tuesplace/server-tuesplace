import { RESTError } from "../errors";
import sendEmail from "./sendEmail";

export default async (err: unknown) => {
  if (err instanceof Error || err instanceof RESTError) {
    await sendEmail(
      process.env.ADMIN_EMAIL!,
      `${err.name} - ${Date.now}`,
      `<h1>Error (${err.name}) - ${Date.now()}</h1><br/><p>${err.stack}</p>`,
      []
    );
  }
};
