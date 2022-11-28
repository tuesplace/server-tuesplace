import { RequestBodyBlueprint } from "../@types/tuesplace";
import { FullName, IRRepeatableEmail, Password } from "../definitions";

export const editProfileSchema: RequestBodyBlueprint = {
  fullName: FullName,
  email: { ...IRRepeatableEmail, optional: true },
  password: { ...Password, optional: true },
};
