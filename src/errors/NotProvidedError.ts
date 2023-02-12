import { Named, TypedError } from "../@types/tuesplace";

export const NotProvidedError = ({ name }: Named): TypedError => ({
  type: "NotProvidedError",
  message: {
    eng: `${name.eng} was not provided `,
    bg: `'${name.bg}' не е предоставен`,
  },
});
