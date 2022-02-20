const { validateUserProps } = require("../util/userValidators");
const Profile = require("../models/Profile");
const bcrypt = require("bcryptjs");

const editProfile = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      profilePic,
      password,
      interests,
      workPlace,
      cv,
      role,
    } = req.body;
    const { errors, valid } = validateUserProps(
      {
        fullName,
        email,
        profilePic,
        interests,
        workPlace,
        cv,
        role,
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
        throw { password: "Новата парола трябва да е различна от старата" };
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      profile.password = hashedPassword;
    }

    profile.fullName = fullName || profile.fullName;
    profile.profilePic = profilePic || profile.profilePic;
    profile.interests = interests || profile.interests;
    profile.workPlace = workPlace || profile.workPlace;
    profile.cv = cv || profile.cv;
    profile.role = role || profile.role;

    await profile.save();

    res.send({ success: false, response: { ...profile._doc } });
  } catch (err) {
    next(err);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.auth.userId);
    if (!profile) {
      throw { profile: "Профилът не е намерен", status: 404 };
    }

    await profile.deleteOne();

    res.send({ success: true, response: { deletedProfile: true } });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  editProfile,
  deleteProfile,
};
