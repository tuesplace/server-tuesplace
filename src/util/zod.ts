import { RefinementCtx, ZodIssue } from "zod";
import { TypedError } from "../@types/tuesplace";
import capitalizeString from "./capitalizeString";
import { renderTranslation } from "./translation";

export const parseZodError = (parseResult: any): TypedError[] =>
  parseResult.error.issues
    .filter((issue: ZodIssue) => issue.code === "custom")
    .map((issue: any) => {
      const typedError = issue.params;
      return {
        ...typedError,
        message: issue.path[0]
          ? renderTranslation(typedError.message, {
              name: {
                eng: capitalizeString(issue.path[0].toString()),
                bg: capitalizeString(issue.path[0].toString()),
              },
            })
          : typedError.message,
      };
    });

export const customZodRefinement =
  (
    getErrorCallback: (
      val: any
    ) => Promise<TypedError | null> | TypedError | null
  ) =>
  async (val: any, ctx: RefinementCtx) => {
    const err = await getErrorCallback(val);
    if (err) {
      ctx.addIssue({
        code: "custom",
        params: err,
      });
    }
  };
