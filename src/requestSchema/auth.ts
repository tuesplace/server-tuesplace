import { RequestBodyBlueprint } from "../@types/tuesplace";
import { Email, Password } from "../definitions";

export const signInSchema: RequestBodyBlueprint = {
  email: Email,
  password: Password,
};
