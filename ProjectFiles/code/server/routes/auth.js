const express= require("express");
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken');
const User=require("../models/User");
const Admin=require("../models/Admin");
const Operator=require("../models/Operator");

const router=express.Router();

router.post("/register",async(req,res)=>{
    const {name,email,password,role}=req.body;

    const hashedpassword=await bcrypt.hash(password,10);

    try {
        let newUser;
        if (role === "user") {
        newUser = new User({ name, email, password: hashedpassword, role: "user" }); // ✅ set role
        } else if (role === "admin") {
        newUser = new Admin({ name, email, password: hashedpassword, role: "admin" }); // ✅ set role
        } else if (role === "operator") {
          newUser = new Operator({
            name,
            email,
            password: hashedpassword,
            approved: false,
            role: "operator" // ✅ set role
          });
        }
        else{
            return res.status(400).json({message:"Invalid role"})
        }
        await newUser.save();
        res.status(201).json({message:`${role} registration successfull`})
    } catch (error) {
        res.status(400).json({message:"registration failed",error})
    }
});

router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  let Model;

  if (role === 'user') Model = User;
  else if (role === 'admin') Model = Admin;
  else if (role === 'operator') Model = Operator;
  else return res.status(400).json({ message: 'Invalid role' });

  try {
    const user = await Model.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // 🔒 Check approval status for operators
    if (role === 'operator' && user.approved === false) {
      return res.status(403).json({ message: 'Operator not approved by admin yet' });
    }

    const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
    iat: Math.floor(Date.now() / 1000), // Optional: ensures new token each time
    loginSession: Date.now().toString() // Custom field to add uniqueness
  },
  'welcomebro',
  { expiresIn: '1d' }
);

    res.status(200).json({ message: 'Login successful', token, role: user.role });

  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
});

module.exports=router;