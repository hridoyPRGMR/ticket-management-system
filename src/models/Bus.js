const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busNumber: { 
    type: String, 
    required: true,
    unique:true,
    maxlength:[50,"Bus-Number cannot exceed 50 character."]
  },
  route: { 
    from:{
      type:String,
      required:true,
      maxlength:[100,"Route-From cannot exceed 100 character."]
    },
    to:{
      type:String,
      required:true,
      maxlength:[100,"Route-To cannot exceed 100 character."]
    }
  },
  capacity: { type: Number, required: true ,min:1},
  createdAt:{type:Date,default:Date.now},
  updatedAt:{type:Date,default:Date.now}
},
{timestamp:true}
);

module.exports = mongoose.model("Bus", busSchema);
