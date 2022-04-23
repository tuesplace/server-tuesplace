import express from "express";
const router = express.Router();
import { verifyAdmin, verifyInGroup, verifyGroupExists } from "../middleware";
import { getGroup, createGroup, editGroup, deleteGroup } from "../controllers/group";

router.get("/:groupId", verifyGroupExists, verifyInGroup, getGroup);
router.post("", verifyAdmin, createGroup);
router.put("/:groupId", verifyGroupExists, verifyAdmin, verifyInGroup, editGroup);
router.delete("/:groupId", verifyGroupExists, verifyAdmin, verifyInGroup, deleteGroup);

export default router;
