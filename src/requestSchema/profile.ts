import zod from "zod";
import { FullName, Password, UniqueEmail } from "../definitions";

export const editProfileSchema = zod.object({
  fullName: FullName.optional(),
  email: UniqueEmail.optional(),
  password: Password.optional(),
});
