const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
  try {
    let { fullname, email, password } = req.body;
    let checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return res.status(409).send("You already have an account please login");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    let user = await userModel.create({
      fullname,
      email,
      password: hash,
    });
    let token = generateToken(user);
    res.cookie("token", token);
    res.send("User created succesfully");
  } catch (err) {
    console.log(err.msg);
    res.status(500).send("Error registering user");
  }
}

module.exports.loginUser = async function (req, res) {
  try {
    
    let { email, password } = req.body;
    
    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(401).send("Email or Password incorrect");
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.status(200).send("You can login");
    } else {
      return res.status(401).send("Wrong password");
    }
  }
  catch (err) {
    console.log(err.msg);
    res.status(500).send("Error logging in. Please try again later.");
  }
};