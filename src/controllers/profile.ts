import { validateUser } from "../util/validators";
import Profile from "../models/Profile";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { IProfile } from "../@types/tuesplace/IProfile";

const editProfile = async (req: Request, res: Response, next: any) => {
  try {
    const { fullName, email, password } = req.body;
    const { errors, valid } = validateUser(
      <IProfile>{
        fullName,
        email,
        password,
      },
      false
    );

    if (!valid) {
      throw { ...errors, status: 400 };
    }

    const profile = await Profile.findById(req.auth.userId);

    if (!profile) {
      throw { profile: "Профилът не е намерен", status: 404 };
    }

    if (email) {
      profile.email = email;
      profile.emailVerified = false;
    }

    if (password) {
      if (await bcrypt.compare(password, profile.password)) {
        throw {
          password: "Новата парола трябва да е различна от старата",
        };
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      profile.password = hashedPassword;
    }

    profile.fullName = fullName || profile.fullName;

    await profile.save();

    res.sendRes({ ...profile._doc });
  } catch (err) {
    next(err);
  }
};

const deleteProfile = async (req: Request, res: Response, next: any) => {
  try {
    const profile = await Profile.findById(req.auth.userId);
    if (!profile) {
      throw { profile: "Профилът не е намерен", status: 404 };
    }

    await profile.deleteOne();

    res.status(204).sendRes();
  } catch (err) {
    next(err);
  }
};

export { editProfile, deleteProfile };
