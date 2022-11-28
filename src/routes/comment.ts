import express, { Request } from "express";
import {
  createResource,
  deleteResource,
  editResource,
  getAllSortedByCreateDatePaginated,
  reactToSendableResource,
} from "../controllers";
import { Comment, Profile } from "../definitions";
import {
  verifyBodySchema,
  verifyResourceExists,
  verifyResourceOwner,
} from "../middleware";
import { createComment, editCommentSchema } from "../requestSchema/comment";
import { reactToSendableSchema } from "../requestSchema/generic";

const router = express.Router({ mergeParams: true, strict: true });

router.get(
  "/",
  getAllSortedByCreateDatePaginated(Comment, {
    modelQuery: {
      ids: {
        postId: { name: "postId", documentLocation: "associations.post._id" },
      },
    },
  })
);

router.post(
  "/",
  verifyBodySchema(createComment),
  createResource(Comment, {
    resolveAttrs: (context: Request) => ({
      associations: {
        group: {
          _id: context.ids!.groupId,
          collectionName: "groups",
          shouldResolve: false,
        },
        post: {
          _id: context.ids!.postId,
          collectionName: "posts",
          shouldResolve: false,
        },
      },
      owner: {
        _id: context.profile!._id,
        collectionName: "profiles",
        shouldResolve: true,
      },
    }),
  })
);

router.put(
  "/:commentId",
  verifyBodySchema(editCommentSchema),
  verifyResourceExists(Comment, {
    resolveAttrs: (context) => ({
      association: { post: { _id: context.ids!.postId } },
    }),
  }),
  verifyResourceOwner(Profile, Comment),
  editResource(Comment)
);

router.patch(
  "/:commentId",
  verifyBodySchema(reactToSendableSchema),
  verifyResourceExists(Comment, {
    resolveAttrs: (context) => ({
      association: { post: { _id: context.ids!.postId } },
    }),
  }),
  reactToSendableResource(Comment)
);

router.delete(
  "/:commentId",
  verifyResourceExists(Comment, {
    resolveAttrs: (context) => ({
      association: { post: { _id: context.ids!.postId } },
    }),
  }),
  verifyResourceOwner(Profile, Comment),
  deleteResource(Comment)
);

export default router;
