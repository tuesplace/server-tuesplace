import { Request, Response } from "express";
import { get, merge } from "lodash";
import {
  EditResourceOptions,
  IDocument,
  IPublicSendable,
  ITimestamped,
  QueryOptions,
  Resource,
  CreateResourceOptions,
  Assets,
  IAsset,
  Association,
} from "../@types/tuesplace";
import { reactToSendable } from "../util";
import { reduceArrayOfObject } from "../util/array";
import { constructQueryValues } from "../util/fields";

export const getAllSortedByCreateDatePaginated =
  (resource: Resource<ITimestamped>, options?: QueryOptions) =>
  async (req: Request, res: Response, next: any) => {
    try {
      const { page, limit } = req.query;
      let pageNum = Number(page || 0);
      const limitNum = Number(limit || 10);

      if (pageNum > 0) pageNum -= 1;

      const documents = await resource.model
        .find(
          options?.modelQuery
            ? constructQueryValues(options!.modelQuery!, req)
            : {}
        )
        .sort({ createdAt: -1 })
        .skip(pageNum * limitNum)
        .limit(limitNum);

      res.sendRes(documents.map((doc: any) => doc._doc));
    } catch (err) {
      next(err);
    }
  };

export const getResource =
  <T>(resource: Resource<T>) =>
  (req: Request, res: Response, next: any) => {
    try {
      const document = get(req, resource.documentLocation) as IDocument<T>;
      res.sendRes(document._doc);
    } catch (err) {
      next(err);
    }
  };

export const createResource =
  <T>(resource: Resource<T>, options?: CreateResourceOptions) =>
  async (req: Request, res: Response, next: any) => {
    try {
      await resource.model.create({
        ...req.body,
        ...(options?.resolveAttrs?.(req) || {}),
      });
      res.sendRes(null, 204);
    } catch (err) {
      next(err);
    }
  };

export const editResource =
  <T>(resource: Resource<T>, options?: EditResourceOptions<T>) =>
  async (req: Request, res: Response, next: any) => {
    try {
      const document = get(req, resource.documentLocation) as IDocument<any>;
      const editValues = req.body;
      for (const i in editValues) {
        document[editValues[i].name] = editValues[i].value;
        await options?.afterEdit[editValues[i].name]?.(document);
      }
      await document.save();
      res.sendRes(null, 204);
    } catch (err) {
      next(err);
    }
  };

export const editResourceAssets =
  (resource: Resource<Assets>) =>
  async (req: Request, res: Response, next: any) => {
    try {
      const document = get(req, resource.documentLocation) as IDocument<Assets>;
      const { mode } = req.query;
      const resolvedAssets = reduceArrayOfObject(
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

      if (resolvedAssets.length) {
        document.assets =
          !mode || mode === "replace"
            ? resolvedAssets
            : merge(document.assets, resolvedAssets);
      }

      await document.save();
      res.sendRes(null, 204);
    } catch (err) {
      next(err);
    }
  };

export const reactToSendableResource =
  (resource: Resource<unknown>) =>
  async (req: Request, res: Response, next: any) => {
    try {
      const document = get(
        req,
        resource.documentLocation
      ) as IDocument<IPublicSendable>;

      const { reaction } = req.body;

      await reactToSendable(document, req.profile!.id, reaction);
      res.sendRes(null, 204);
    } catch (err) {
      next(err);
    }
  };

export const deleteResource =
  <T>(resource: Resource<T>) =>
  async (req: Request, res: Response, next: any) => {
    try {
      const document = get(req, resource.documentLocation) as IDocument<T>;
      await document.deleteOne();

      res.sendRes(null, 204);
    } catch (err) {
      next(err);
    }
  };
