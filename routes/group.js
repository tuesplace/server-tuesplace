const express = require("express");
const router = express.Router();
const { verifyAdmin, verifyInGroup, verifyGroupExists } = require("../middleware");
const { getGroup, createGroup, editGroup, deleteGroup } = require("../controllers/group");

router.get("/:groupId", verifyGroupExists, verifyInGroup, getGroup);
router.post("", verifyAdmin, createGroup);
router.put("/:groupId", verifyGroupExists, verifyAdmin, verifyInGroup, editGroup);
router.delete("/:groupId", verifyGroupExists, verifyAdmin, verifyInGroup, deleteGroup);

module.exports = router;
