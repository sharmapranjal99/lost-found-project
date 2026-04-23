const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "secret123";

// Register
router.post("/register", async (req,res)=>{
  const {name,email,password} = req.body;

  const exist = await User.findOne({email});
  if(exist) return res.status(400).json({msg:"Email exists"});

  const hash = await bcrypt.hash(password,10);

  const user = new User({name,email,password:hash});
  await user.save();

  res.json({msg:"Registered"});
});

// Login
router.post("/login", async (req,res)=>{
  const {email,password} = req.body;

  const user = await User.findOne({email});
  if(!user) return res.status(400).json({msg:"Invalid"});

  const match = await bcrypt.compare(password,user.password);
  if(!match) return res.status(400).json({msg:"Invalid"});

  const token = jwt.sign({id:user._id}, JWT_SECRET);

  res.json({token});
});

module.exports = router;