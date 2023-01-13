import express from "express";
import {
  createResource,
  deleteResource,
  editResource,
  getAllSortedByCreateDatePaginated,
  getResource,
} from "../controllers";
import { Admin } from "../definitions";
import {
  verifyRole,
  verifyInGroup,
  verifyResourceExists,
  verifyBodySchema,
} from "../middleware";
import { Group } from "../definitions";
import { createGroupSchema } from "../requestSchema/group";

const router = express.Router({ mergeParams: true });

router.get("/", getAllSortedByCreateDatePaginated(Group));

router.get(
  "/:groupId",
  verifyResourceExists(Group),
  verifyInGroup(),
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
  verifyResourceExists(Group),
  verifyRole(Admin),
  verifyInGroup(),
  editResource(Group)
);

router.delete(
  "/:groupId",
  verifyResourceExists(Group),
  verifyRole(Admin),
  verifyInGroup(),
  deleteResource(Group)
);

export { router as groupRouter };
