import express from "express";
import {
  createResource,
  deleteResource,
  editResource,
  getAllSortedByCreateDatePaginated,
  getResource,
  getSecondaryResourceInformation,
} from "../controllers";
import { Admin, Profile, Student } from "../definitions";
import {
  verifyRole,
  verifyInGroup,
  verifyResourceExists,
  verifyBodySchema,
} from "../middleware";
import { Group } from "../definitions";
import { createGroupSchema, editGroupSchema } from "../requestSchema/group";

const router = express.Router({ mergeParams: true });

router.get("/", getAllSortedByCreateDatePaginated(Group));

router.get(
  "/me",
  verifyRole(Student),
  getSecondaryResourceInformation(Profile, [
    {
      lookupName: "groups",
      query: "itself",
      resource: Group,
      resolveAttrs: async (context) => ({ classes: context.profile!.class }),
    },
  ])
);

router.get(
  "/:groupId",
  verifyResourceExists(Group),
  verifyInGroup(Profile),
  getResource(Group)
);

router.post(
  "/",
  verifyRole(Admin),
  verifyBodySchema(createGroupSchema),
  createResource(Group, {
    resolveAttrs: (context) => ({
      owners: [
        {
          _id: context.profile?._id,
          collectionName: "profiles",
          shouldResolve: true,
        },
      ],
    }),
  })
);

router.put(
  "/:groupId",
  verifyRole(Admin),
  verifyBodySchema(editGroupSchema),
  verifyResourceExists(Group),
  verifyInGroup(Profile),
  editResource(Group)
);

router.delete(
  "/:groupId",
  verifyResourceExists(Group),
  verifyRole(Admin),
  verifyInGroup(Profile),
  deleteResource(Group)
);

export { router as groupRouter };
