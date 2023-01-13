import { NextFunction, Request, Response } from "express";
import lo, { get } from "lodash";
import {
  EditResourceOptions,
  IDocument,
  ITimestamped,
  Resource,
  CreateResourceOptions,
  Assets,
  IAsset,
  Association,
  FindResourceOptions,
  SecondaryAssociationResolverInfo,
  EditAssetsOptions,
  IPublicSendable,
} from "../@types/tuesplace";
import { reactToSendable } from "../util";
import { reduceArrayOfObject } from "../util/array";
import { resolveDocuments } from "../util";
import capitalizeString from "../util/capitalizeString";

export const getAllResource =
  <T>(resource: Resource<T>, options?: FindResourceOptions) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const documents = await resource.model.find(
        options?.resolveAttrs?.(req) || {}
      );

      res.sendRes(documents.map((doc: any) => doc._doc));
    } catch (err) {
      next(err);
    }
  };

export const getAllSortedByCreateDatePaginated =
  (resource: Resource<ITimestamped>, options?: FindResourceOptions) =>
  async (req: Request, res: Response, next: any) => {
    try {
      const { page, limit } = req.query;
      let pageNum = Number(page || 0);
      const limitNum = Number(limit || 10);

      if (pageNum > 0) pageNum -= 1;
      const documents = await resource.model
        .find(options?.resolveAttrs?.(req) || {})
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
      const document = lo.get(req, resource.documentLocation) as IDocument<T>;
      res.sendRes(document._doc);
    } catch (err) {
      next(err);
    }
  };

export const getSecondaryResourceInformation =
  <T>(resource: Resource<T>, info: SecondaryAssociationResolverInfo) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const document = get(req, resource.documentLocation);
      const secondaryInformation = [];
      for (let index = 0; index < info.length; index += 1) {
        const secondaryInfo = (
          await info[index].resource.model.find({
            [info[index].association]: document[info[index].from],
          })
        ).map((doc: any) => doc._doc);

        const secondaryResourceName = `${info[index].query}${
          info[index].resource.name.eng
        }Where${capitalizeString(info[index].association.split(".")[0])}`;

        if (info[index].query === "itself") {
          secondaryInformation.push({
            [secondaryResourceName]: await resolveDocuments(secondaryInfo),
          });
          continue;
        }
        if (info[index].query === "count") {
          secondaryInformation.push({
            [secondaryResourceName]: secondaryInfo.length,
          });
          continue;
        }
        if (info[index].query === "ifPresent") {
          secondaryInformation.push({
            [secondaryResourceName]: !!secondaryInfo && !!secondaryInfo.length,
          });
          continue;
        }
      }
      res.sendRes(reduceArrayOfObject(secondaryInformation), 200, false);
    } catch (err) {
      next(err);
    }
  };

export const createResource =
  <T>(resource: Resource<T>, options?: CreateResourceOptions) =>
  async (req: Request, res: Response, next: any) => {
    try {
      const responseBehavior = req.query.responseBehavior || "none";
      const result = await resource.model.create({
        ...req.body,
        ...(options?.resolveAttrs?.(req) || {}),
      });
      let response;
      switch (responseBehavior) {
        case "id":
          response = { id: result.id };
          break;
        case "doc":
          response = result._doc;
          break;
      }
      res.sendRes(response, 201);
    } catch (err) {
      next(err);
    }
  };

export const editResource =
  <T>(resource: Resource<T>, options?: EditResourceOptions<T>) =>
  async (req: Request, res: Response, next: any) => {
    try {
      const document = lo.get(req, resource.documentLocation) as IDocument<any>;
      const editValues = req.body;
      for (const i in editValues) {
        document[i] = editValues[i] || document._doc[i];
        await options?.afterEdit[i]?.(document, req);
      }
      await document.save();
      res.sendRes(null, 204);
    } catch (err) {
      next(err);
    }
  };

export const editResourceAssets =
  (
    resource: Resource<Assets>,
    options: EditAssetsOptions = { ignoreMode: true }
  ) =>
  async (req: Request, res: Response, next: any) => {
    try {
      const document = lo.get(
        req,
        resource.documentLocation
      ) as IDocument<Assets>;
      const mode = options.ignoreMode ? "replace" : req.query.mode || "replace";
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

      if (Object.keys(resolvedAssets || {}).length) {
        document.assets =
          mode === "replace"
            ? resolvedAssets
            : lo.merge(document.assets, resolvedAssets);
      }

      if (!!options.toCreate) {
        (document as any).created = true;
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
      const document = lo.get(req, resource.documentLocation) as IDocument<T>;
      await document.deleteOne();

      res.sendRes(null, 204);
    } catch (err) {
      next(err);
    }
  };
