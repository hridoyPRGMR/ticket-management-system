const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  created_at: { type: Date, immutable: true, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


// hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.updated_at = Date.now();
  }
  next();
});

userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique." });

module.exports = mongoose.model("User", userSchema);