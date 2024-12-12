const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const AppError = require("../utils/AppError");
const {validationError} = require("../utils/validationError");
const { getBuses, getTicket, purchaseTicket, saveUser } = require("../services/userService");

//register user
const register = async (req, res, next) => {
  
  try {
    const user = await saveUser(req);
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success:true,
      message: "User registered successfully",
      token,
      user,
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

const logout = async (req, res, next) => {
  try {
    // console.log('User logged out:', req.user._id);

    // HttpOnly flag: Prevents client-side JavaScript from accessing the cookie.
    // Secure flag: Ensures the cookie is only sent over HTTPS.
    // SameSite attribute: Controls cookie sharing between different websites.
    res.clearCookie('jwtToken', { httpOnly: true, secure: true, sameSite: 'strict' });
    res.status(200).json({success:true, message: 'Logged out successfully' });

  } catch (error) {
    console.error('Logout failed:', error);
    next(error); 
  }
};


//user functionality api's
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

module.exports = { register, login, logout, getPaginatedBuses, getTickets, purchaseTickets };