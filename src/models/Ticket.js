const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true},
  date: { type: Date, required: true },
  time: { 
    type: String, 
    required: true ,
    maxlength:[20,"Time cannot exceed 50 character."]
  },
  price: { type: Number, required: true },
  availableSeats: { type: Number, required: true, min: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
