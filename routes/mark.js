const express = require("express");
const router = express.Router();
const { getMarks, addMark } = require("../controllers/mark");

router.get("", getMarks);
router.post("", addMark);

module.exports = router;
