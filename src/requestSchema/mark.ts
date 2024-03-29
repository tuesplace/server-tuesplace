import zod from "zod";
import { MarkField } from "../definitions";

export const createMarkSchema = zod
  .object({
    mark: MarkField,
  })
  .strict();

export const editMarkSchema = zod
  .object({
    mark: MarkField,
  })
  .strict();
