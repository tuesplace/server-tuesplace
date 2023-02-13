import zod from "zod";
import { MessageBody } from "../definitions";

export const createMessageSchema = zod
  .object({
    body: MessageBody,
  })
  .strict();

export const editMessageSchema = zod
  .object({
    body: MessageBody.optional(),
  })
  .strict();
