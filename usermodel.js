const {default:mongoose}=require("mongoose")

const userschema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, "please provide name"],
      unique: [true, "username exist"],
    },
    password: {
      type: String,
      required: [true, "please provide name"],
      unique: false,
    },
  
    email: {
      type: String,
      required: [true, "please provide email"],
      unique: true,
    },
  
    Amount: { type: String },
    lastname: { type: String },
    mobile: { type:Number },
      
  
  });
  module.exports=mongoose.Model.usermodels || mongoose.model('usermodel',userschema) ;