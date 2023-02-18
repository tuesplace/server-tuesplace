import { Named } from "./Named";

export type RoleValue = "student" | "teacher" | "admin" | "parent";
export interface Role extends Named {
  value: RoleValue;
}
