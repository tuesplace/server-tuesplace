import { Named, TypedError } from "../@types/tuesplace";

export const NotFoundError = ({ name }: Named): TypedError => ({
  type: "NotFoundError",
  message: {
    eng: `${name.eng} was not found in our database`,
    bg: `'${name.bg}' не е намерен`,
  },
});
