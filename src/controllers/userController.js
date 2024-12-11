const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const AppError = require("../utils/AppError");
const {validationError} = require("../utils/validationError");
const { getBuses, getTicket, purchaseTicket } = require("../services/userService");

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


//user functionality
const getPaginatedBuses = async (req,res,next) =>{

  const {page = 1, limit=10} = req.query;

  try{
    const buses = await getBuses(parseInt(page),parseInt(limit));
    res.status(200).json(buses);
  }
  catch(error){
    next(error);
  }
} 


const getTickets  = async(req, res, next)=>{

  const {busId,date} = req.query;

  try{
    const tickets = await getTicket(busId,date);
    res.status(200).json(tickets);
  }
  catch(error){
    next(error);
  }

}

const purchaseTickets = async (req, res, next) => {
  try {
      const result = await purchaseTicket(req.body);

      res.status(201).json({
          success: true,
          message: "Ticket(s) purchased successfully.",
          purchase: result,
      });
  } 
  catch (error) {
      next(error); 
  }
};

module.exports = { register, login, getPaginatedBuses, getTickets, purchaseTickets };