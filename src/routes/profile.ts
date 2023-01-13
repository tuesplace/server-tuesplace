import express from "express";
import bcrypt from "bcryptjs";
import {
  createAssets,
  deleteResource,
  editResource,
  editResourceAssets,
  getResource,
} from "../controllers";
const router = express.Router({ mergeParams: true });
import { Profile } from "../definitions";
import { verifyBodySchema } from "../middleware";
import { editProfileSchema } from "../requestSchema";

router.get("/", getResource(Profile));

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

router.put(
  "/",
  createAssets(
    {
      resolveAttrs: (context) => ({
        owner: {
          _id: context.profile!._id,
          collectionName: "profiles",
          shouldResolve: false,
        },
      }),
    },
    Profile,
    [
      {
        name: "profilePic",
        mimetype: "image",
        maxCount: 1,
      },
    ]
  ),
  editResourceAssets(Profile)
);

router.delete("/", deleteResource(Profile));

export default router;
