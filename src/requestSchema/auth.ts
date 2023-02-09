import zod from "zod";
import { DeviceToken, Email, Password } from "../definitions";

export const signInSchema = zod
  .object({
    email: Email,
    password: Password,
  })
  .strict();

export const signInMobileSchema = zod.object({
  email: Email,
  password: Password,
  deviceToken: DeviceToken,
});
