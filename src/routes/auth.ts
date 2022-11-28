import express from "express";
const router = express.Router({ mergeParams: true });
import { signIn, refreshTokenPair } from "../controllers/auth";
import { verifyBodySchema, verifyResourceExists } from "../middleware";
import { Profile } from "../definitions";
import { signInSchema } from "../requestSchema";

router.post(
  "/sign-in",
  verifyBodySchema(signInSchema),
  verifyResourceExists({
    ...Profile,
    lookupFieldLocation: "body.email",
    by: "email",
  }),
  signIn
);
router.post("/generate-token-pair", refreshTokenPair);

export default router;
