import { TypedError } from "../@types/tuesplace";

export const NotConformToArrayError = (array: any[]): TypedError => ({
  type: "NotConformToArrayError",
  message: {
    eng: `{{name.eng}} can have one or more of the following values: [${array}]`,
    bg: `{{name.bg}} може да има следните възможни стойности: [${array}]`,
  },
});
