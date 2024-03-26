const usermodel = require("./usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const localvariables=require('./localvariable')
const otpGenerator = require("otp-generator");
const donationmodel=require("./donationmodel")

const donation=async(req,res)=>{

  try {
    const {name,amount,note}=req.body;
    const newUser = new donationmodel({
      name,
      amount,
      note,
    });
    await newUser.save();
    res.status(200).send("Donation saved Successfully");


  } catch (error) {
    res.status(400).send({ error: error.message });
  }



}

const getdonation=async(req,res)=>{

   try {
   const donations = await donationmodel.find();
   res.json({
    success: true,
    donations: donations
  });
   } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch donations' });
   }
  

}








const register=async(req,res)=>{
  
    try {
    const { username, password, email, address, Amount } = req.body;
    const existingUsername = await usermodel.findOne({ username });
    const existingEmail = await usermodel.findOne({ email });
       if (existingUsername) {
        return res.status(201).send("username already exist");
      }
      if (existingEmail) {
        return res.status(202).send("Email already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new usermodel({
        username,
        password: hashedPassword,
        email,
        Amount: Amount,
      });
      await newUser.save(); 
      res.status(200).send("Success");
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
    

}


const login = async (req, res) => {
  const { username, password } = req.body;


  try {
    const existingUsername = await usermodel.findOne({ username });

    if (!existingUsername) {
      throw new Error("Username not already exists");
    }

    const user = await usermodel.findOne({ username });
  

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }
    const userId = user._id.toString();
    const token = jwt.sign(
      {
        username: user.username,
        userid: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24hr" }
    );
    res.send({ username: user.username, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getuser = async (req, res) => {
  try {
    const { username } = req.params; // Access the 'username' parameter

    const user = await usermodel.findOne({ username });
    if (!user) {
      res.status(400).send("User not available");
    }
    const { password, ...userr } = user.toObject();

    res.status(200).send(userr);
  } catch (error) {
    res.status(400).send(error.message); // Sending the error message instead of the entire error object
  }
};
const verifyuser = async (req, res, next) => {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;
    
    const user = await usermodel.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }

    next();
  } catch (error) {
    return res.status(401).send({ error: "Verification failed" });
  }
};
const updateuser = async (req, res) => {
  try {
    const { userid } = req.user;
    if (!userid) {
      res.send("id dont provide");
    }
    const body = req.body;

    const updateduser = await usermodel.updateOne({ _id: userid }, body);

    if (!updateduser) {
      throw new Error("Not able to update");
    }

    res.send(updateduser);
  } catch (error) {
    res.send("Error in updating");
  }
};
const getotp = async (req, res) => {
  req.app.locals.Otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  res.status(201).send({ code: req.app.locals.Otp }); // Use "Otp" instead of "otp"
};
const verifyotp = async (req, res) => {
  const { code } = req.query;


  if (parseInt(req.app.locals.Otp) === parseInt(code)) {
    req.app.locals.Otp = null;
    req.app.locals.resetSession = true;
    
    return res.status(201).send({ msg: "otp verified successfully" });
  } else {
  
    return res.status(400).send({ error: "invalid otp" });
  }
};





module.exports={register,login,getuser,verifyuser,updateuser ,getotp,verifyotp,donation,getdonation};