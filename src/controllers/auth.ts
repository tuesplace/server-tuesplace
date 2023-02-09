import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { Profile } from "../models";
import { bindDeviceToken, generateTokenPair, rotateTokenPair } from "../util";
import { CriticalError, RESTError, WrongPasswordError } from "../errors";
import { DeviceToken, IDocument, IProfile } from "../@types/tuesplace";

export const signUp = async (req: Request, res: Response, next: any) => {
  try {
    const { email, password, fullName, role } = req.body;

    const _id = new mongoose.Types.ObjectId();

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new Profile({
      _id,
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.sendRes({
      ...(await generateTokenPair(_id.toString())),
      userId: _id.toString(),
    });
  } catch (err) {
    next(err);
  }
};

export const signIn = async (req: Request, res: Response, next: any) => {
  try {
    const { password } = req.body;
    const { profile } = req;

    if (!profile) {
      throw new CriticalError();
    }

    if (!(await bcrypt.compare(password, profile.password))) {
      throw new RESTError(WrongPasswordError, 401);
    }

    res.sendRes({
      ...(await generateTokenPair(profile._id.toString())),
      userId: profile._id.toString(),
    });
  } catch (err) {
    next(err);
  }
};

export const signInMobile = async (req: Request, res: Response, next: any) => {
  try {
    const { password, deviceToken } = req.body;

    const { profile } = req as { profile: IDocument<IProfile> };

    if (!(await bcrypt.compare(password, profile.password))) {
      throw new RESTError(WrongPasswordError, 401);
    }
    if (
      !profile.deviceTokens.filter(
        (token: DeviceToken) => token.address == deviceToken.address
      ).length
    ) {
      profile.deviceTokens.push({
        ...deviceToken,
        binding: await bindDeviceToken(deviceToken, profile._id.toString()),
      });

      await profile.save();
    }

    res.sendRes({
      ...(await generateTokenPair(profile._id.toString())),
      userId: profile._id.toString(),
    });
  } catch (err) {
    next(err);
  }
};

export const refreshTokenPair = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    res.sendRes(await rotateTokenPair(req));
  } catch (err) {
    next(err);
  }
};
