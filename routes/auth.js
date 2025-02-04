const express = require("express");
const router = express.Router();
const authContoller = require("../controllers/authController");

router.post("/", authContoller.handleLogin);

module.exports = router;
