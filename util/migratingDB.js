/*const Profile = require("../models/Profile");

const migrateAllProfiles = async () => {
  const profiles = await Profile.find({});
  profiles.forEach(async (profile) => {
    await profile.updateOne({
      fullName: profile.fullName || "",
      profilePic: profile.profilePic || "",
      workPlace: profile.workPlace || "",
      cv: profile.cv || {},
      role: profile.role || "",
    });
  });
};
*/
