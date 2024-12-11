const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/auth");

// User Registration
router.post("/register", userController.register);

// User Login
router.post("/login", userController.login);

module.exports = router;
