import { Request } from "express";
import { Types } from "mongoose";
import multer from "multer";
import { IDocument, IModel } from "./models";

export type Assets = {
  assets: {
    [key: string]: Association[];
  };
};

export type Verifications = {
  [key]: {
    email: boolean;
    byAdmin: boolean;
  };
};

export type Translation = {
  [key: string]: string;
  eng: string;
  bg: string;
};

type PropAssert = (prop: any) => TypedError | null;
type ContextPropAssert = (prop: any, obj: any) => TypedError | null;

export type Assert = PropAssert | ContextPropAssert;

export type Named = {
  name: Translation;
};

type Asserted = {
  assert: Assert;
};

export type Rule = {
  requirement: Translation;
  assertions: RuleAssert[];
};

export interface Field extends Named, Asserted {
  optional?: boolean;
}

export type ValueType = Translation;
export interface Resource<T> extends Named {
  model: IModel<T>;
  lookupFieldLocation: string;
  by: string;
  documentLocation: string;
}

export type Association = {
  _id: Types.ObjectId;
  collectionName: string;
  data?: IDocument;
  shouldResolve: boolean;
};

export type Associations = {
  associations: {
    [key: string]: Association;
  };
};

export type Owned = {
  owner: Association;
};

export type OwnedByMany = {
  owners: Association[];
};

export interface Reaction extends Owned {
  value: string;
}

export type Assignment = {
  isAssignment: boolean;
  deadline?: Date;
};

export type Body = {
  body: string;
};

export type EditResourceOptions<T> = {
  afterEdit: {
    [key: string]: (doc: IDocument<T>, context: Request) => Promise<void>;
  };
};

export type QueryField = {
  name: string;
  documentLocation: string;
};

export interface ResolvedQueryField extends QueryField {
  contextLocation: string;
  value: unknown;
}

export type QueryModelByReqFields = {
  [key: string]: {
    [key: string]: QueryField;
  };
  body?: {
    [key: string]: QueryField;
  };
  params?: {
    [key: string]: QueryField;
  };
};

export type QueryOptions = {
  modelQuery?: QueryModelByReqFields;
};

export interface Role extends Named {
  value: string;
}

export type CreateResourceOptions = {
  resolveAttrs?: (context: Request) => object;
};

export type FindResourceOptions = {
  resolveAttrs?: (context: Request) => object;
};

export interface FileFormField extends multer.Field {
  mimetype?: string;
}

export interface ResolvedMulterFile extends Express.Multer.File {
  key: string;
}

export type SecondaryAssociationResolverInfo =
  | {
      resource: Resource<unknown>;
      lookupName: string;
      association?: string;
      query: "count" | "ifPresent" | "itself";
      from?: string;
      resolveAttrs?: (context: Request) => Promise<object>;
    }[];

export type EditAssetsOptions = {
  toCreate?: boolean;
  ignoreMode: boolean;
};
