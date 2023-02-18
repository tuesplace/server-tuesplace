import { model, Schema } from "mongoose";
import { ISpecification } from "../@types/tuesplace";

const specificationSchema = new Schema<ISpecification>({
  assets: {
    type: Object,
    default: {},
  },
  associations: {
    type: Object,
    default: {},
  },
});

export const Specification = model("Specification", specificationSchema);
