import { TypedError } from "../@types/tuesplace";

export const PasswordConfirmError: TypedError = {
  type: "PasswordConfirmError",
  message: {
    eng: "Password Confirm is not equal to Password",
    bg: "Паролите не съвпадат",
  },
};
