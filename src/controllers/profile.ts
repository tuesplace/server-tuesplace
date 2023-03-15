import { faker } from "@faker-js/faker";
import { NextFunction, Request, Response } from "express";
import { Profile } from "../models";
import { notifyNewProfilesCreated } from "../util";

export const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseBehavior = req.query.responseBehavior || "none";
    const password = faker.internet.password(25);
    const result = await Profile.create({
      ...req.body,
      password,
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

    notifyNewProfilesCreated([{ email: req.body.email, password }], req);

    res.sendRes(response, 201);
  } catch (err) {
    next(err);
  }
};
