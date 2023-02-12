import { TypedError } from "../@types/tuesplace";

export const ArrayElementsNotUniqueError: TypedError = {
  type: "ArrayElementsNotUniqueError",
  message: {
    eng: "{{name.eng}} must be an array of unique values",
    bg: "{{name.bg}} трябва да бъде масив от различни стойности",
  },
};
