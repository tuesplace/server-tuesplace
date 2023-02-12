import { TypedError } from "../@types/tuesplace";

export const InvalidValueError = (expectedValue: any): TypedError => ({
  type: "InvalidValueError",
  message: {
    eng: `{{name.eng}} was supposed to have a value equal to '${expectedValue}'`,
    bg: `{{name.bg}} е трябвало да има стойност, равна на '${expectedValue}'`,
  },
});
