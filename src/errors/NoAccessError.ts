import { Resource, TypedError } from "../@types/tuesplace";

export const NoAccessError = <T>(resource: Resource<T>): TypedError => ({
  type: "NoAccessError",
  message: {
    eng: `You do not have access to this ${resource.name.eng}`,
    bg: `Нямате достъп до ${resource.name.bg}`,
  },
});
