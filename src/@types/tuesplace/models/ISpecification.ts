import { Assets, Associations } from "../general";
import { IMongoSchema } from "./IMongoSchema";

export interface ISpecification extends IMongoSchema, Associations, Assets {}
