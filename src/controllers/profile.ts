import { validateUser } from "../util/validators";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { IProfile } from "../@types/tuesplace/IProfile";
import { RepeatOldPassword, RESTError } from "../errors";

const editProfile = async (req: Request, res: Response, next: any) => {
  try {
    const { fullName, email, password } = req.body;
    const { profile } = req;
    const { errors, valid } = validateUser(
      <IProfile>{
        fullName,
        email,
        password,
      },
      false
    );

    if (!valid) {
      throw new RESTError(errors, 400);
    }

    if (email) {
      profile.email = email;
      profile.emailVerified = false;
    }

    if (password) {
      if (await bcrypt.compare(password, profile.password)) {
        throw new RESTError(RepeatOldPassword, 400);
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      profile.password = hashedPassword;
    }

    profile.fullName = fullName || profile.fullName;

    await profile.save();

    res.status(204).sendRes();
  } catch (err) {
    next(err);
  }
};

const deleteProfile = async (req: Request, res: Response, next: any) => {
  try {
    const { profile } = req;

    await profile.deleteOne();

    res.status(204).sendRes();
  } catch (err) {
    next(err);
  }
};

export { editProfile, deleteProfile };
