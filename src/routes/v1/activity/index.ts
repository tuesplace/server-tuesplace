import express from "express";
import { Types } from "mongoose";
import {
  createResource,
  deleteResource,
  getAllSortedByCreateDatePaginated,
} from "../../../controllers";
import { Activity, Student, Admin, Teacher } from "../../../definitions";
import {
  verifyBodySchema,
  verifyResourceExists,
  verifyRole,
} from "../../../middleware";
import { Group } from "../../../models";
import { createActivitySchema } from "../../../requestSchema";

const router = express.Router({ mergeParams: true });

router.get("/", verifyRole(Admin), getAllSortedByCreateDatePaginated(Activity));

router.get(
  "/me",
  verifyRole(Student, Teacher),
  getAllSortedByCreateDatePaginated(Activity, {
    resolveAttrs: async (context) => ({
      "associations.group._id": {
        $in:
          context.profile.role === Student.value
            ? (
                await Group.find({
                  classes: {
                    $in: context.profile!.class,
                  },
                })
              ).map((doc) => doc._id)
            : (
                await Group.find({
                  "owners._id": context.profile._id,
                })
              ).map((doc) => doc._id),
      },
    }),
  })
);

router.post(
  "/",
  verifyRole(Admin),
  verifyBodySchema(createActivitySchema),
  createResource(Activity, {
    resolveAttrs: (context) => ({
      associations: {
        room: {
          _id: new Types.ObjectId(context.body.room),
          shouldResolve: true,
          collectionName: "rooms",
        },
        group: {
          _id: new Types.ObjectId(context.body.group),
          shouldResolve: true,
          collectionName: "groups",
        },
      },
    }),
  })
);

router.delete(
  "/:activityId",
  verifyRole(Admin),
  verifyResourceExists(Activity),
  deleteResource(Activity)
);

export { router as activityRouter };
