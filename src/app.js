const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

require("dotenv").config();

const app = express();
connectDB();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/admin",adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));