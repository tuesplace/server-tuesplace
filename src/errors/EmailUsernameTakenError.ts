import { TypedError } from "../@types/tuesplace";

export const EmailTakenError: TypedError = {
  type: "EmailTakenError",
  message: {
    eng: "Email is already used by another account",
    bg: "Имейлът се използва от друг акаунт",
  },
};
