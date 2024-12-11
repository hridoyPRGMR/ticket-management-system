const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true ,
    minlength: [2,"Name cannot be less than 2 charcater."],
    maxlength:[50,"Name cannot exceed 50 character."]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength:[50,"Email cannot exceed 50 character."],
    validate: {
      validator: function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //no space, has and @symbol,ends with .com/.org
        return emailRegex.test(value);
      },
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  password: {
    type: String,
    required: true,
    maxlength:[50,"Password cannot exceed 50 character."],
    validate: {
      validator: function (value) {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; //at least 8 characters, one uppercase, one lowercase, and one number
        return passwordRegex.test(value);
      },
      message: (props) =>
        `Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.`,
    }
  },
  role: { type: String, enum: ["admin", "user"], default: "user" },
},{
  timestamps:true,
}
);


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