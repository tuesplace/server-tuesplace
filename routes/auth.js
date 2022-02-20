const express = require("express");
const router = express.Router();
const { signUp, signIn, generateAccessToken } = require("../controllers/auth");

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/generate-token-pair", generateAccessToken);

module.exports = router;
