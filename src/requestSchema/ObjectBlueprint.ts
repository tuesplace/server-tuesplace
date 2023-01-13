import lo from "lodash";
import { RequestBodyBlueprint, Named, TypedError } from "../@types/tuesplace";
import { InvalidLengthError } from "../errors";

export class ObjectBlueprint {
  schema: RequestBodyBlueprint;
  rootObject: Named;

  constructor(schema: RequestBodyBlueprint, rootObject: Named) {
    this.schema = schema;
    this.rootObject = rootObject;
  }

  public async assert(obj: any) {
    const schemaKeys = Object.keys(this.schema);
    const objKeys = Object.keys(obj);
    if (
      !obj ||
      !!schemaKeys.filter(
        (key) => !objKeys.includes(key) && !this.schema[key].optional
      ).length ||
      !!objKeys.filter((key) => !schemaKeys.includes(key)).length
    ) {
      return [
        InvalidLengthError(this.rootObject, Object.keys(this.schema).length),
      ];
    }
    const errors = (
      await Promise.all(
        Object.keys(this.schema).map(async (key) => {
          return !obj[key] && this.schema[key].optional === true
            ? null
            : await this.schema[key].assert(obj[key], obj);
        })
      )
    ).filter((err) => !!err);

    let reducedErrors: TypedError[] = [];
    errors.forEach((err: TypedError | TypedError[]) => {
      if (lo.isArray(err)) {
        reducedErrors = reducedErrors.concat(err);
        return;
      }
      reducedErrors.push(err);
    });

    return reducedErrors;
  }
}
