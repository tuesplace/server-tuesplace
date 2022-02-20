const Profile = require("../models/Profile");

const migrateAllProfiles = async () => {
  const profiles = await Profile.find({});
  profiles.forEach(async (profile) => {
    await profile.updateOne({
      fullName: profile.fullName || "",
      profilePic: profile.profilePic || "",
      interests: profile.interests || [],
      workPlace: profile.workPlace || "",
      cv: profile.cv || {},
      role: profile.role || "",
    });
  });
};
