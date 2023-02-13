import express from "express";
import {
  signIn,
  refreshTokenPair,
  signUp,
  signInMobile,
} from "../../../controllers";
import { verifyBodySchema, verifyResourceExists } from "../../../middleware";
import { Profile } from "../../../definitions";
import { signInSchema, signInMobileSchema } from "../../../requestSchema";
import { environment } from "../../../config";

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

router.post(
  "/sign-in/mobile",
  verifyBodySchema(signInMobileSchema),
  verifyResourceExists({
    ...Profile,
    lookupFieldLocation: "body.email",
    by: "email",
  }),
  signInMobile
);

router.post("/generate-token-pair", refreshTokenPair);

export { router as authRouter };
