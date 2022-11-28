import { Request } from "express";
import { flatten, get } from "lodash";
import { QueryModelByReqFields, ResolvedQueryField } from "../@types/tuesplace";

export const constructValueArray = (
  fields: QueryModelByReqFields,
  context: Request
): ResolvedQueryField[] => {
  return flatten(
    Object.keys(fields).map((key: string) =>
      Object.keys(fields[key]).map((fieldKey: string) => {
        const field = fields[key][fieldKey];
        const contextLocation = `${key}.${field.name}`;
        return {
          ...field,
          contextLocation,
          value: get(context, contextLocation),
        };
      })
    )
  );
};

export const constructQueryValues = (
  fields: QueryModelByReqFields,
  context: Request
) => {
  return constructValueArray(fields, context).reduce(
    (curr: object, record: ResolvedQueryField) => ({
      ...curr,
      [record.documentLocation]: record.value,
    }),
    {}
  );
};
