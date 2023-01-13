import express, { Request } from "express";
import {
  createResource,
  deleteResource,
  editResource,
  getAllSortedByCreateDatePaginated,
} from "../controllers";
const router = express.Router({ mergeParams: true });
import { Mark, Profile, StudentResource } from "../definitions";
import {
  verifyResourceExists,
  verifyInGroup,
  verifyBodySchema,
  verifyResourceOwner,
} from "../middleware";
import { editMarkSchema, createMarkSchema } from "../requestSchema";

router.get(
  "/",
  getAllSortedByCreateDatePaginated(Mark, {
    resolveAttrs: (context) => ({
      "associations.group._id": context.ids!.groupId,
    }),
  })
);

router.get(
  "/student/:studentId/",
  verifyResourceExists(StudentResource, {
    resolveAttrs: (context) => ({
      class: {
        $in: context.resources.group.classes,
      },
    }),
  }),
  getAllSortedByCreateDatePaginated(Mark, {
    resolveAttrs: (context) => ({
      "associations.student._id": context.ids!.studentId,
      "associations.group._id": context.ids!.groupId,
    }),
  })
);

router.post(
  "/student/:studentId/",
  verifyBodySchema(createMarkSchema),
  verifyResourceExists(StudentResource, {
    resolveAttrs: (context) => ({
      class: {
        $in: context.resources.group.classes,
      },
    }),
  }),
  createResource(Mark, {
    resolveAttrs: (context) => ({
      associations: {
        group: {
          _id: context.ids!.groupId,
          collectionName: "groups",
          shouldResolve: true,
        },
        student: {
          _id: context.ids!.studentId,
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

router.put(
  "/student/:studentId/:markId",
  verifyBodySchema(editMarkSchema),
  verifyResourceExists(StudentResource, {
    resolveAttrs: (context) => ({
      class: {
        $in: context.resources.group.classes,
      },
    }),
  }),
  verifyResourceExists(Mark, {
    resolveAttrs: (context) => ({
      "associations.student._id": context.ids!.studentId,
    }),
  }),
  verifyResourceOwner(Profile, Mark),
  editResource(Mark)
);

router.delete(
  "/student/:studentId/mark/:markId",
  verifyResourceExists(StudentResource, {
    resolveAttrs: (context) => ({
      class: {
        $in: context.resources.group.classes,
      },
    }),
  }),
  verifyInGroup(StudentResource),
  verifyResourceExists(Mark, {
    resolveAttrs: (context) => ({
      "associations.student._id": context.ids!.studentId,
    }),
  }),
  verifyResourceOwner(Profile, Mark),
  deleteResource(Mark)
);

export default router;
