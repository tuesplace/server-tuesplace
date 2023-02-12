import { IModel } from "../models";
import { Named } from "./Named";

export interface Resource<T> extends Named {
  model: IModel<T>;
  lookupFieldLocation: string;
  by: string;
  documentLocation: string;
}
