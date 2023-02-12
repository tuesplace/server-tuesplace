import lo from "lodash";
import { Role, TypedError } from "../@types/tuesplace";

export const NotRoleError = (roles: Role | Role[]): TypedError => ({
  type: "NotRoleError",
  message: {
    eng: `Your profile is not a ${
      lo.isArray(roles)
        ? `[${roles.map((role) => role.name.eng)}]`
        : roles.name.eng
    }`,
    bg: `Вашият профил не е ${
      lo.isArray(roles)
        ? `[${roles.map((role) => role.name.bg)}]`
        : roles.name.eng
    }`,
  },
});
