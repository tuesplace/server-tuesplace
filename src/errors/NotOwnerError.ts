import { Resource, TypedError } from "../@types/tuesplace";

export const NotOwnerError = <T>(resource: Resource<T>): TypedError => ({
  type: "NotOwnerError",
  message: {
    eng: `You are not the owner of ${resource.name.eng}`,
    bg: `Вие не сте собственика на ${resource.name.bg}`,
  },
});
