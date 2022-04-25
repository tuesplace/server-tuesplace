import express from "express";
const router = express.Router();
import { editProfile, deleteProfile } from "../controllers/profile";

router.post("/", editProfile);
router.delete("/", deleteProfile);

export default router;
