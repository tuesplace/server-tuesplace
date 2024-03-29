import express from "express";
import { Types } from "mongoose";
import {
  createAssets,
  createResource,
  getAllSubmissionsWithMarksPaginated,
} from "../../../controllers";
import { Mark, Post, Student, Submission, Teacher } from "../../../definitions";
import {
  verifyBodySchema,
  verifyResourceExists,
  verifyRole,
} from "../../../middleware";
import {
  createMarkSchema,
  createSubmissionSchema,
} from "../../../requestSchema";

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  verifyRole(Teacher),
  getAllSubmissionsWithMarksPaginated(false)
);

router.get(
  "/me",
  verifyRole(Student),
  getAllSubmissionsWithMarksPaginated(true)
);

router.post(
  "/",
  verifyRole(Student),
  verifyBodySchema(createSubmissionSchema),
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
  createResource(Submission, {
    resolveAttrs: (context) => ({
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
      assets: context.resolvedAssets,
      owner: {
        _id: context.profile!._id,
        shouldResolve: true,
        collectionName: "profiles",
      },
    }),
  })
);

router.post(
  "/:submissionId/marks",
  verifyRole(Teacher),
  verifyResourceExists(Submission, {
    resolveAttrs: (context) => ({
      "associations.group._id": context.ids!.groupId,
      "associations.post._id": context.ids!.postId,
    }),
  }),
  verifyBodySchema(createMarkSchema),
  createResource(Mark, {
    resolveAttrs: (context) => ({
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
        submission: {
          _id: new Types.ObjectId(context.params.submissionId),
          collectionName: "submissions",
          shouldResolve: true,
        },
        student: {
          _id: context.resources.submission.owner._id,
          collectionName: "profiles",
          shouldResolve: true,
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

export { router as submissionRouter };
