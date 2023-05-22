import { TypedError } from "../@types/tuesplace";

export const InArrayError = (val: any): TypedError => ({
  type: "InArrayError",
  message: {
    eng: `${val} should not be present in {{name.eng}}`,
    bg: `${val} не трябва да се намира в състава на {{name.eng}}`,
  },
});
