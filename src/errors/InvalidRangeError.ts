import { TypedError } from "../@types/tuesplace";

export const InvalidRangeError = (
  moreThan: number | string,
  lessThan: number | string = 0
): TypedError => ({
  type: "InvalidRangeError",
  message: {
    eng: `{{name.eng}} needs to have a length which is more than ${moreThan} and less than ${lessThan} `,
    bg: `Дължината на {{name.bg}} трябва да бъде по-голяма от ${moreThan} и по-малка от ${lessThan}`,
  },
});
