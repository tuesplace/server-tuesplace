import express, { Request } from "express";
const router = express.Router({ mergeParams: true });

import { Profile, Post } from "../definitions";
import {
  createResource,
  deleteResource,
  editResource,
  getAllSortedByCreateDatePaginated,
  reactToSendableResource,
} from "../controllers";
import {
  verifyBodySchema,
  verifyResourceExists,
  verifyResourceOwner,
} from "../middleware";
import { createPostSchema, editPostSchema } from "../requestSchema";

router.get(
  "/",
  getAllSortedByCreateDatePaginated(Post, {
    modelQuery: {
      ids: {
        groupId: {
          name: "groupId",
          documentLocation: "associations.group._id",
        },
      },
    },
  })
);

router.post(
  "/",
  verifyBodySchema(createPostSchema),
  createResource(Post, {
    resolveAttrs: (context) => ({
      associations: {
        group: {
          _id: context.ids!.groupId,
          collectionName: "groups",
          shouldResolve: false,
        },
      },
      owner: {
        _id: context.profile?._id,
        collectionName: "profiles",
        shouldResolve: true,
      },
    }),
  })
);

router.put(
  "/:postId",
  verifyResourceExists(Post, {
    resolveAttrs: (context) => ({
      association: { group: { _id: context.ids!.groupId } },
    }),
  }),
  verifyResourceOwner(Profile, Post),
  verifyBodySchema(editPostSchema),
  editResource(Post)
);

router.delete(
  "/:postId",
  verifyResourceExists(Post, {
    resolveAttrs: (context) => ({
      association: { group: { _id: context.ids!.groupId } },
    }),
  }),
  verifyResourceOwner(Profile, Post),
  deleteResource(Post)
);

router.patch(
  "/:postId",
  verifyResourceExists(Post, {
    resolveAttrs: (context: Request) => ({
      association: { group: { _id: context.ids!.groupId } },
    }),
  }),
  reactToSendableResource(Post)
);

export default router;
