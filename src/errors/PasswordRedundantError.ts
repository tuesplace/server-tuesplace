import { TypedError } from "../@types/tuesplace";

export const PasswordRedundantError: TypedError = {
  type: "PasswordRedundantError",
  message: {
    eng: "Your new password cannot be the same as your old one",
    bg: "Новата Ви парола не може да бъде същата със старата",
  },
};
