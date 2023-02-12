import { Translation, TypedError } from "../@types/tuesplace";

export const BreaksRulesError = (requirement: Translation): TypedError => ({
  type: "BreaksRuleError",
  message: requirement,
});
