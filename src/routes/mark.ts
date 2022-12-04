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

router.get(
  "/student/:studentId/",
  verifyResourceExists(StudentResource, {
    resolveAttrs: (context: Request) => ({
      class: {
        $in: context.resources.group.classes,
      },
    }),
  }),
  getAllSortedByCreateDatePaginated(Mark, {
    modelQuery: {
      ids: {
        studentId: {
          name: "studentId",
          documentLocation: "associations.student._id",
        },
        groupId: {
          name: "groupId",
          documentLocation: "associations.group._id",
        },
      },
    },
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
    resolveAttrs: (context: Request) => ({
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
      associations: { student: { _id: context.ids!.studentId } },
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
      associations: { student: { _id: context.ids!.studentId } },
    }),
  }),
  verifyResourceOwner(Profile, Mark),
  deleteResource(Mark)
);

export default router;
