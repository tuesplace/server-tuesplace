import { Request, Response } from "express";
import { Types } from "mongoose";
import { Languages } from "../definitions";
import { resolveDocuments } from "../util";

export const init = (req: Request, res: Response, next: any) => {
  try {
    req.ids = {};
    req.resources = {};
    req.language =
      Languages.find((lang) => lang === req.headers?.["accept-language"]) ||
      "eng";

    Object.keys(req.params)
      .filter((key: string) => key.endsWith("Id"))
      .forEach((key) => {
        req.ids![key] = new Types.ObjectId(req.params[key]);
      });

    req.assets = {};

    req.resolvedFiles = [];

    req.id = new Types.ObjectId().toString();

    res.sendRes = async (
      response?: object,
      code = 200,
      shouldResolve = true
    ) => {
      res.status(code).send({
        success: code >= 200 && code <= 206,
        response: shouldResolve ? await resolveDocuments(response) : response,
      });
    };

    next();
  } catch (err) {
    next(err);
  }
};
