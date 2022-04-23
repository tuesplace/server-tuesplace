import express from "express";
const router = express.Router();
import { getMarks, getStudentMarks, addMark, editMark, deleteMark } from "../controllers/mark";
import { verifyStudentExists, verifyStudentInGroup, verifyMarkExists } from "../middleware";

router.get("/", getMarks);
router.get("/student/:studentId", verifyStudentExists, verifyStudentInGroup, getStudentMarks);
router.post("/student/:studentId", verifyStudentExists, verifyStudentInGroup, addMark);
router.put("/:markId", verifyMarkExists, editMark);
router.delete("/:markId", verifyMarkExists, deleteMark);

export default router;
