const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validate = require('../middlewares/validate')
const {registerValidation, loginValidation} = require('../validation/userValidation')

router.post("/register", validate(registerValidation), authController.register);
router.post("/login", validate(loginValidation), authController.login);
router.post("/logout", authController.logout);

module.exports = router