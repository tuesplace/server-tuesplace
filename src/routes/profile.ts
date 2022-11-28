import express from "express";
import bcrypt from "bcryptjs";
import { deleteResource, editResource } from "../controllers";
const router = express.Router({ mergeParams: true });
import { Profile } from "../definitions";
import { verifyBodySchema } from "../middleware";
import { editProfileSchema } from "../requestSchema";

router.post(
  "/",
  verifyBodySchema(editProfileSchema),
  editResource(Profile, {
    afterEdit: {
      email: async (doc) => {
        doc.verifications.email = false;
      },
      password: async (doc) => {
        doc.password = await bcrypt.hash(doc.password, 13);
      },
    },
  })
);

router.delete("/", deleteResource(Profile));

export default router;
