const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.Login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);

module.exports = router;