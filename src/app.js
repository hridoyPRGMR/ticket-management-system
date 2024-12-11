const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const AppError = require("./utils/AppError");

require("dotenv").config();

const app = express();
connectDB();

app.use(express.json());

//routes
app.use("/",userRoutes);
app.use("/auth", authRoutes);
app.use("/admin",adminRoutes);

//for unmatched route
app.use((req,res,next)=>{
    const err = new AppError("Route Not Found!",404);
    next(err);
})

//error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
