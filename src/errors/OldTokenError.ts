import { TypedError } from "../@types/tuesplace";

export const OldTokenError: TypedError = {
  type: "OldTokenError",
  message: {
    eng: "Last sign in more than 20 minutes ago. You have to sign out and sign in again",
    bg: "Последното влизане в профила е било преди 20 минути. Трябва да излезете и влезете в профила си",
  },
};
