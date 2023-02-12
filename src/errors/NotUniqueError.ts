import { Resource, TypedError } from "../@types/tuesplace";

export const NotUniqueError = <T>({ name }: Resource<T>): TypedError => ({
  type: "NotUniqueError",
  message: {
    eng: `{{name.eng}} has already been used in another ${name.eng}`,
    bg: `{{name.bg}} се ползва от друг ${name.bg}`,
  },
});
