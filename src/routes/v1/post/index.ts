import express from "express";
import { Profile, Post } from "../../../definitions";
import {
  createResource,
  deleteResource,
  editResource,
  editResourceAssets,
  getAllSortedByCreateDatePaginated,
  getResource,
  reactToSendableResource,
} from "../../../controllers";
import {
  verifyBodySchema,
  verifyResourceExists,
  verifyResourceOwner,
} from "../../../middleware";
import {
  createPostSchema,
  editPostSchema,
  reactToSendableResourceSchema,
} from "../../../requestSchema";
import { createAssets } from "../../../controllers";
import { notifyAllGroupMembersCreatedPost } from "../../../util";

const router = express.Router({ mergeParams: true, strict: true });

router.get(
  "/",
  getAllSortedByCreateDatePaginated(Post, {
    resolveAttrs: (context) => ({
      "associations.group._id": context.ids!.groupId,
    }),
  })
);

router.get(
  "/:postId",
  verifyResourceExists(Post, {
    resolveAttrs: (context) => ({
      "associations.group._id": context.ids!.groupId,
    }),
  }),
  getResource(Post)
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
    afterCreate: async (req) => {
      await notifyAllGroupMembersCreatedPost(req);
      req.io.emit(
        `resource/${req.resources.group?._id?.toString() || ""}/posts`,
        "[update]"
      );
    },
  })
);

router.put(
  "/:postId",
  verifyResourceExists(Post, {
    resolveAttrs: (context) => ({
      "associations.group._id": context.ids!.groupId,
    }),
  }),
  verifyResourceOwner(Profile, Post),
  verifyBodySchema(editPostSchema),
  editResource(Post)
);

router.put(
  "/:postId/assets",
  verifyResourceExists(Post, {
    resolveAttrs: (context) => ({
      "associations.group._id": context.ids!.groupId,
    }),
  }),
  verifyResourceOwner(Profile, Post),
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
    Post,
    [
      {
        name: "assets",
        maxCount: 15,
      },
    ]
  ),
  editResourceAssets(Post)
);

router.delete(
  "/:postId",
  verifyResourceExists(Post, {
    resolveAttrs: (context) => ({
      "associations.group._id": context.ids!.groupId,
    }),
  }),
  verifyResourceOwner(Profile, Post),
  deleteResource(Post)
);

router.patch(
  "/:postId",
  verifyBodySchema(reactToSendableResourceSchema),
  verifyResourceExists(Post, {
    resolveAttrs: (context) => ({
      "associations.group._id": context.ids!.groupId,
    }),
  }),
  reactToSendableResource(Post)
);

export { router as postRouter };
