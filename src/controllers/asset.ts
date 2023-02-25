import multer from "multer";
import multerS3 from "multer-s3";
import { Request, Response } from "express";
import { get } from "lodash";
import { Asset } from "../models";

import { reduceArrayOfObject, s3Client } from "../util";
import { s3BucketName } from "../config";
import {
  Association,
  CreateResourceOptions,
  FileFormField,
  IAsset,
  IDocument,
  Resource,
} from "../@types/tuesplace";
import { NotFoundError, RESTError } from "../errors";
import { Asset as AssetName } from "../definitions";

export const createAssets = <AssociatedResourceT>(
  options: CreateResourceOptions,
  associatedResource: Resource<AssociatedResourceT>,
  fields: FileFormField[]
) => [
  multer({
    fileFilter: (_, file, cb) => {
      console.log(file);
      const mimetype = fields.find(
        (field) => field.name === file.fieldname
      )!.mimetype;

      cb(null, mimetype ? file.mimetype.includes(mimetype) : true);
    },
    storage: multerS3({
      s3: s3Client,
      acl: "private",
      bucket: s3BucketName,
      key: async (req: Request, file, cb) => {
        const key = `${associatedResource.name.eng.toLowerCase()}/${(
          get(
            req,
            associatedResource.documentLocation
          ) as IDocument<AssociatedResourceT>
        )._id.toString()}/${file.originalname}`;

        req.resolvedFiles.push({ ...file, key });
        cb(null, key);
      },
    }),
  }).fields(fields),
  async (req: Request, _res: Response, next: any) => {
    try {
      if (!req.resolvedFiles?.length) {
        throw new RESTError(NotFoundError(AssetName), 404);
      }

      const fields = [
        ...new Set(req.resolvedFiles.map((file) => file.fieldname)),
      ];

      for (let i = 0; i < fields.length; i += 1) {
        const fieldFiles = req.resolvedFiles.filter(
          (file) => file.fieldname == fields[i]
        );
        const assets = [];
        for (let j = 0; j < fieldFiles.length; j += 1) {
          assets.push(
            await Asset.create({
              key: fieldFiles[j].key,
              ...options.resolveAttrs?.(req),
              mimetype: fieldFiles[j].mimetype,
              meta: {
                originalName: fieldFiles[j].originalname,
                size: fieldFiles[j].size,
              },
            })
          );
        }
        req.assets[fields[i]] = assets;
      }

      req.resolvedAssets = reduceArrayOfObject(
        Object.keys(req.assets).map((key) => ({
          [key]: req.assets[key].map(
            (asset: IAsset): Association => ({
              _id: asset._doc._id,
              collectionName: "assets",
              shouldResolve: true,
            })
          ),
        }))
      );
      next();
    } catch (err) {
      next(err);
    }
  },
];
