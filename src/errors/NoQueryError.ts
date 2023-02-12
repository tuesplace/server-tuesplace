import { Resource, TypedError } from "../@types/tuesplace";

export const NoQueryError = <T>(resource: Resource<T>): TypedError => ({
  type: "NoQueryError",
  message: {
    eng: `The server could not build a lookup query for ${resource.name.eng}. Contact an administrator`,
    bg: `Сървърът не успя да създате lookup заявка за ${resource.name.bg}. Свържете се с администратор.`,
  },
});
