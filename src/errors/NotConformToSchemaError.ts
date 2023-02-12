import { Named, TypedError } from "../@types/tuesplace";

export const NotConformToSchemaError = ({ name }: Named): TypedError => ({
  type: "NotConformToSchemaError",
  message: {
    eng: `${name.eng} does not conform to schema`,
    bg: `${name.bg} не е по схемата`,
  },
});
