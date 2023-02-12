import { TypedError } from "../@types/tuesplace";

export const WrongPasswordError: TypedError = {
  type: "WrongPasswordError",
  message: {
    eng: "Password is incorrect",
    bg: "Паролата е грешна",
  },
};
