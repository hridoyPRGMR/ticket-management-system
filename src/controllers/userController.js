const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const AppError = require("../utils/AppError");
const {validationError} = require("../utils/validationError");

//register user
const register = async (req, res, error) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new AppError("User already exists",400));
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success:true,
      message: "User registered successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } 
  catch (error) {
    if (validationError(error, res)) return;
    next(error);
  }
};


// Login user
const login = async (req, res, next) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return next(new AppError("Invalid email or password", 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError("Invalid email or password", 401));
    }

    const token = generateToken(user._id, user.role);
    res.json({
      success:true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } 
  catch (error) {
    if (validationError(error, res)) return;
    next(error);
  }
};


// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { name, email, role, updated_at: Date.now() }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, getAllUsers, updateUser, deleteUser };