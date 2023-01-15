import zod from "zod";
import { Email, Password } from "../definitions";

export const signInSchema = zod
  .object({
    email: Email,
    password: Password,
  })
  .strict();
