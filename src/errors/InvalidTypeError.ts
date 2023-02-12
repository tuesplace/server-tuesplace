import { Named, TypedError, Translation } from "../@types/tuesplace";

export const InvalidTypeError = (
  { name }: Named,
  type: Translation
): TypedError => ({
  type: "InvalidType",
  message: {
    eng: `${name.eng} is not a ${type.eng}`,
    bg: `${name.bg} не е ${type.bg}`,
  },
});
