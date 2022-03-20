const express = require("express");
const router = express.Router();
const { getMarks, getStudentMarks, addMark, editMark, deleteMark } = require("../controllers/mark");
const { verifyStudentExists, verifyStudentInGroup, verifyMarkExists } = require("../middleware");

router.get("/", getMarks);
router.get("/student/:studentId", verifyStudentExists, verifyStudentInGroup, getStudentMarks);
router.post("/student/:studentId", verifyStudentExists, verifyStudentInGroup, addMark);
router.put("/:markId", verifyMarkExists, editMark);
router.delete("/:markId", verifyMarkExists, deleteMark);

module.exports = router;
