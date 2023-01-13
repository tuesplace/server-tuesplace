import express from "express";
import { signIn, refreshTokenPair } from "../controllers/auth";
import { verifyBodySchema, verifyResourceExists } from "../middleware";
import { Profile } from "../definitions";
import { signInSchema } from "../requestSchema";

const router = express.Router({ mergeParams: true });

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

export { router as authRouter };
