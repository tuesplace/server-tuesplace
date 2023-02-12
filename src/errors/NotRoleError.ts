import { Role, TypedError } from "../@types/tuesplace";

export const NotRoleError = (role: Role): TypedError => ({
  type: "NotRoleError",
  message: {
    eng: `Your profile is not a ${role.name.eng}`,
    bg: `Вашият профил не е ${role.name.bg}`,
  },
});
