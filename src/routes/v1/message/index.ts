import express from "express";
import {
  createAssets,
  createResource,
  deleteResource,
  editResource,
  editResourceAssets,
  getAllSortedByCreateDatePaginated,
  getResource,
  reactToSendableResource,
} from "../../../controllers";
import { Message, Profile } from "../../../definitions";
import {
  verifyBodySchema,
  verifyResourceExists,
  verifyResourceOwner,
} from "../../../middleware";
import {
  createMessageSchema,
  editMessageSchema,
  reactToSendableResourceSchema,
} from "../../../requestSchema";
import { notifyAllGroupMembersCreatedPost } from "../../../util";

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  getAllSortedByCreateDatePaginated(Message, {
    resolveAttrs: (context) => ({
      "associations.group._id": context.ids!.groupId,
    }),
  })
);

router.get(
  "/:messageId",
  verifyResourceExists(Message, {
    resolveAttrs: (context) => ({
      "associations.group._id": context.ids!.groupId,
    }),
  }),
  getResource(Message)
);

router.post(
  "/",
  verifyBodySchema(createMessageSchema),
  createResource(Message, {
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
        `resource/${req.resources.post?._id?.toString() || ""}/comments`,
        "[update]"
      );
    },
  })
);

router.put(
  "/:messageId",
  verifyResourceExists(Message, {
    resolveAttrs: (context) => ({
      "associations.group._id": context.ids!.groupId,
    }),
  }),
  verifyResourceOwner(Profile, Message),
  verifyBodySchema(editMessageSchema),
  editResource(Message)
);

router.put(
  "/:messageId/assets",
  verifyResourceExists(Message, {
    resolveAttrs: (context) => ({
      "associations.group._id": context.ids!.groupId,
    }),
  }),
  verifyResourceOwner(Profile, Message),
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
    Message,
    [
      {
        name: "assets",
        maxCount: 15,
      },
    ]
  ),
  editResourceAssets(Message)
);

router.delete(
  "/:messageId",
  verifyResourceExists(Message, {
    resolveAttrs: (context) => ({
      "associations.group._id": context.ids!.groupId,
    }),
  }),
  verifyResourceOwner(Profile, Message),
  deleteResource(Message)
);

router.patch(
  "/:messageId",
  verifyBodySchema(reactToSendableResourceSchema),
  verifyResourceExists(Message, {
    resolveAttrs: (context) => ({
      "associations.group._id": context.ids!.groupId,
    }),
  }),
  reactToSendableResource(Message)
);

export { router as messageRouter };
