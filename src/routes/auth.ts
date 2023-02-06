import express from "express";
import { signIn, refreshTokenPair, signUp } from "../controllers/auth";
import { verifyBodySchema, verifyResourceExists } from "../middleware";
import { Profile } from "../definitions";
import { signInSchema } from "../requestSchema";
import { environment } from "../config";

const router = express.Router({ mergeParams: true });

if (environment == "DEV") {
  router.post("/sign-up", signUp);
}

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
