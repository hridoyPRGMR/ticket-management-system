const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/auth");

// User Registration
router.post("/register", userController.register);

// User Login
router.post("/login", userController.login);


// Admin-only access to get all users
router.get("/", protect, adminOnly, userController.getAllUsers);

// Admin-only access to update a user
router.put("/:id", protect, adminOnly, userController.updateUser);

// Admin-only access to delete a user
router.delete("/:id", protect, adminOnly, userController.deleteUser);

module.exports = router;
