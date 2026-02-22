const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validate = require('../middlewares/validate')
const {RegisterValidation, LoginValidation} = require('../validation/userValidation')

router.post("/register",  authController.register);
router.post("/login",  authController.login);
router.post("/logout", authController.logout);

module.exports = router;