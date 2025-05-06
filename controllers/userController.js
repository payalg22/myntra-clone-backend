const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = req.body.password;
    if (password) {
      var hashedPassword = await bcrypt.hash(req.body.password, salt);
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: hashedPassword,
      gender: req.body.gender,
      dob: req.body.dob,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, token });
  } catch (err) {
    res.status(500).json(err);
  }
};
