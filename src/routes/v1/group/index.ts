import express from "express";
import {
  createResource,
  deleteResource,
  editResource,
  getAllSortedByCreateDatePaginated,
  getResource,
} from "../../../controllers";
import { Admin, Profile, Student, Teacher } from "../../../definitions";
import {
  verifyRole,
  verifyInGroup,
  verifyResourceExists,
  verifyBodySchema,
} from "../../../middleware";
import { Group } from "../../../definitions";
import {
  createGroupSchema,
  editGroupSchema,
} from "../../../requestSchema/group";

const router = express.Router({ mergeParams: true });

router.get("/", verifyRole(Admin), getAllSortedByCreateDatePaginated(Group));

router.get(
  "/me",
  verifyRole(Student, Teacher),
  getAllSortedByCreateDatePaginated(Group, {
    resolveAttrs: async (context) =>
      context.profile!.role == Student.value
        ? {
            classes: context.profile!.class,
          }
        : { "owners._id": { $in: [context.profile!._id] } },
  })
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
        ...(context.body.owners || []),
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
