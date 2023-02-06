import express from "express";
import { Types } from "mongoose";
import {
  createResource,
  deleteResource,
  getAllSortedByCreateDatePaginated,
  getSecondaryResourceInformation,
} from "../controllers";
import { Profile, Activity, Student, Admin } from "../definitions";
import {
  verifyBodySchema,
  verifyResourceExists,
  verifyRole,
} from "../middleware";
import { Group } from "../models";
import { createActivitySchema } from "../requestSchema/activity";

const router = express.Router({ mergeParams: true });

router.get(
  "/me",
  verifyRole(Student),
  getSecondaryResourceInformation(Profile, [
    {
      resource: Activity,
      lookupName: "myActivities",
      query: "itself",
      resolveAttrs: async (context) => ({
        "associations.group._id": {
          $in: (
            await Group.find({
              classes: {
                $in: context.profile!.class,
              },
            })
          ).map((doc) => doc._id),
        },
      }),
    },
  ])
);

router.get("/", verifyRole(Admin), getAllSortedByCreateDatePaginated(Activity));

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
