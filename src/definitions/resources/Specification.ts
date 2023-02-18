import { ISpecification, Resource } from "../../@types/tuesplace";
import { Specification as SpecificationModel } from "../../models";

export const Specification: Resource<ISpecification> = {
  name: {
    eng: "Specification",
    bg: "Спецификация",
  },
  lookupFieldLocation: "params.specificationId",
  documentLocation: "resources.specification",
  by: "_id",
  model: SpecificationModel,
};
