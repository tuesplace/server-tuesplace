import express from "express";
import bcrypt from "bcryptjs";
import {
  createAssets,
  deleteResource,
  editResource,
  editResourceAssets,
  getAllSortedByCreateDatePaginated,
  getResource,
} from "../controllers";
const router = express.Router({ mergeParams: true });
import { Admin, Mark, Parent, Profile, Student, Teacher } from "../definitions";
import {
  verifyBodySchema,
  verifyResourceExists,
  verifyRole,
  verifyYoungToken,
} from "../middleware";
import { editProfileSchema } from "../requestSchema";

router.get(
  "/",
  verifyRole(Teacher),
  getAllSortedByCreateDatePaginated(Profile, {
    resolveAttrs: () => ({
      role: { $not: { $eq: "admin" } },
    }),
  })
);

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

router.get(
  "/me/marks",
  verifyRole(Student),
  getAllSortedByCreateDatePaginated(Mark, {
    resolveAttrs: (context) => ({
      "associations.student._id": context.profile!._id,
    }),
  })
);

router.get(
  "/:profileId/marks",
  verifyRole(Parent),
  verifyResourceExists(
    {
      ...Profile,
      lookupFieldLocation: "params.profileId",
      documentLocation: "resources.profile",
    },
    {
      resolveAttrs: (context) => ({
        "associations.parent._id": context.profile!._id,
      }),
    }
  ),
  getAllSortedByCreateDatePaginated(Mark, {
    resolveAttrs: (context) => ({
      "associations.student._id": context.resources.profile._id,
    }),
  })
);

router.put(
  "/me/assets",
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
