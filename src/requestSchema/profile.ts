import zod from "zod";
import { FullName, Classes, Password, Role, UniqueEmail } from "../definitions";

export const editProfileSchema = zod
  .object({
    fullName: FullName.optional(),
    email: UniqueEmail.optional(),
    password: Password.optional(),
  })
  .strict();

export const editProfileByAdminSchema = zod
  .object({ fullName: FullName.optional(), email: UniqueEmail.optional() })
  .strict();

export const blockProfileSchema = zod
  .object({ blocked: zod.boolean() })
  .strict();

export const createProfileSchema = zod
  .object({
    fullName: FullName,
    email: UniqueEmail,
    role: Role,
    class: Classes.optional(),
  })
  .strict();
