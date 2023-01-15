import zod from "zod";
import { Reaction } from "../definitions";

export const reactToSendableSchema = zod
  .object({
    reaction: Reaction,
  })
  .strict();
