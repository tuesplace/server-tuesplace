import express from "express";
const router = express.Router();
import { editProfile, deleteProfile } from "../controllers/profile";
import { verifyToken, verifyYoungToken } from "../middleware";

router.post("/edit-profile", verifyToken, editProfile);
router.delete(
  "/delete-profile",
  [verifyToken, verifyYoungToken],
  deleteProfile
);

export default router;
