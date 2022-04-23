import express from "express";
const router = express.Router();
import { signUp, signIn, generateAccessToken } from "../controllers/auth";

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/generate-token-pair", generateAccessToken);

export default router;
