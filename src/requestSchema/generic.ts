import { RequestBodyBlueprint } from "../@types/tuesplace";
import { Reaction } from "../definitions";

export const reactToSendableSchema: RequestBodyBlueprint = {
  reaction: Reaction,
};
