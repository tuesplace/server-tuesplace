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
import { Admin, Profile } from "../definitions";
import {
  verifyBodySchema,
  verifyResourceExists,
  verifyRole,
  verifyYoungToken,
} from "../middleware";
import { editProfileSchema } from "../requestSchema";

router.get("/me", getResource(Profile));

router.put(
  "/me",
  verifyYoungToken,
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
  "/me",
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

router.delete(
  "/:profileId",
  verifyRole(Admin),
  verifyResourceExists({
    ...Profile,
    lookupFieldLocation: "params.profileId",
    documentLocation: "resources.profile",
  }),
  deleteResource({ ...Profile, documentLocation: "resources.profile" })
);

export { router as profileRouter };
