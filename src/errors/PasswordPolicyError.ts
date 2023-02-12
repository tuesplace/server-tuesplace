import { TypedError } from "../@types/tuesplace";

export const PasswordPolicyError: TypedError = {
  type: "PasswordPolicyError",
  message: {
    eng: "Password must contain 1 upper-, 1 lower-cased letter, 1 number and 1 special character and be at least 7 characters long",
    bg: "Паролата трябва да съдържа 1 главна и 1 малка буква, 1 цифра и 1 специален символ и трябва да бъде поне 7 символа",
  },
};
