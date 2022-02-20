const express = require("express");
const router = express.Router();
const { editProfile, deleteProfile } = require("../controllers/profile");
const { verifyToken, verifyYoungToken } = require("../middleware");

router.post("/edit-profile", verifyToken, editProfile);
router.delete(
  "/delete-profile",
  [verifyToken, verifyYoungToken],
  deleteProfile
);

module.exports = router;
