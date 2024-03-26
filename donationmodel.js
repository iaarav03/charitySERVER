const { default: mongoose } = require("mongoose");

const donationSchema = new mongoose.Schema({
    name: String,
    amount:String,
    note:String,
    date: {
      type: Date,
      default: Date.now // Set the default value to the current date
  }
    
  });
  
  module.exports = mongoose.model('donationmodel', donationSchema);