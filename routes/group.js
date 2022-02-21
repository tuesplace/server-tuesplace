const express = require("express");
const router = express.Router();
const { verifyToken, verifyGroupRedactor, verifyInGroup } = require("../middleware");
const { getGroup, createGroup, editGroup, deleteGroup } = require("../controllers/group");

router.get("/:groupId", verifyToken, verifyInGroup, getGroup);
router.post("", verifyToken, createGroup);
router.put("/:groupId", verifyToken, verifyGroupRedactor, editGroup);
router.delete("/:groupId", verifyToken, verifyGroupRedactor, deleteGroup);

module.exports = router;
