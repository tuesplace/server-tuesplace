import express from "express";
import {
  createResource,
  deleteResource,
  editResource,
  getAllSortedByCreateDatePaginated,
} from "../../../controllers";
import { Room } from "../../../definitions";
import { verifyBodySchema, verifyResourceExists } from "../../../middleware";
import { roomSchema } from "../../../requestSchema";

const router = express.Router({ mergeParams: true });

router.get("/", getAllSortedByCreateDatePaginated(Room));

router.post("/", verifyBodySchema(roomSchema), createResource(Room));

router.put(
  "/:roomId",
  verifyBodySchema(roomSchema),
  verifyResourceExists(Room),
  editResource(Room)
);

router.delete("/:roomId", verifyResourceExists(Room), deleteResource(Room));

export { router as roomRouter };
