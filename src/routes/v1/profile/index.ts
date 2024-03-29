import express from "express";
import bcrypt from "bcryptjs";
import {
  createAssets,
  createProfile,
  deleteResource,
  editResource,
  editResourceAssets,
  getAllSortedByCreateDatePaginated,
  getResource,
} from "../../../controllers";
const router = express.Router({ mergeParams: true });
import {
  Activity,
  Admin,
  Mark,
  Parent,
  Profile,
  Student,
} from "../../../definitions";
import {
  verifyBodySchema,
  verifyResourceExists,
  verifyRole,
  verifyYoungToken,
} from "../../../middleware";
import {
  blockProfileSchema,
  createProfileSchema,
  editProfileByAdminSchema,
  editProfileSchema,
} from "../../../requestSchema";
import { Group } from "../../../models";

router.get(
  "/",
  verifyRole(Admin),
  getAllSortedByCreateDatePaginated(Profile, {
    resolveAttrs: () => ({
      role: { $not: { $eq: "admin" } },
    }),
  })
);

router.get("/me", getResource(Profile));

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
  "/:profileId",
  verifyRole(Admin),
  verifyResourceExists({
    ...Profile,
    lookupFieldLocation: "params.profileId",
    documentLocation: "resources.profile",
  }),
  getResource({
    ...Profile,
    lookupFieldLocation: "params.profileId",
    documentLocation: "resources.profile",
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

router.get(
  "/:profileId/activities",
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
  getAllSortedByCreateDatePaginated(Activity, {
    resolveAttrs: async (context) => ({
      "associations.group._id": {
        $in: (
          await Group.find({
            classes: {
              $in: context.profile!.class,
            },
          })
        ).map((doc) => doc._id),
      },
    }),
  })
);

router.post(
  "/",
  verifyRole(Admin),
  verifyBodySchema(createProfileSchema),
  createProfile
);

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
        allowedMimetypes: ["image"],
        maxCount: 1,
      },
    ]
  ),
  editResourceAssets(Profile)
);

router.put(
  "/:profileId",
  verifyRole(Admin),
  verifyResourceExists(
    {
      ...Profile,
      lookupFieldLocation: "params.profileId",
      documentLocation: "resources.profile",
    },
    { resolveAttrs: () => ({ role: { $not: { $eq: "admin" } } }) }
  ),
  verifyBodySchema(editProfileByAdminSchema),
  editResource({
    ...Profile,
    lookupFieldLocation: "params.profileId",
    documentLocation: "resources.profile",
  })
);

router.put(
  "/:profileId/assets",
  verifyResourceExists(
    {
      ...Profile,
      lookupFieldLocation: "params.profileId",
      documentLocation: "resources.profile",
    },
    { resolveAttrs: () => ({ role: { $not: { $eq: "admin" } } }) }
  ),
  createAssets(
    {
      resolveAttrs: (context) => ({
        owner: {
          _id: context.resources.profile._id,
          collectionName: "profiles",
          shouldResolve: false,
        },
      }),
    },
    Profile,
    [
      {
        name: "profilePic",
        allowedMimetypes: ["image"],
        maxCount: 1,
      },
    ]
  ),
  editResourceAssets({
    ...Profile,
    lookupFieldLocation: "params.profileId",
    documentLocation: "resources.profile",
  })
);

router.patch(
  "/:profileId",
  verifyRole(Admin),
  verifyResourceExists(
    {
      ...Profile,
      lookupFieldLocation: "params.profileId",
      documentLocation: "resources.profile",
    },
    { resolveAttrs: () => ({ role: { $not: { $eq: "admin" } } }) }
  ),
  verifyBodySchema(blockProfileSchema),
  editResource({
    ...Profile,
    lookupFieldLocation: "params.profileId",
    documentLocation: "resources.profile",
  })
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
