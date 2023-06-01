const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User")
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    console.log(existingUser)
      if(!existingUser){
        return res.status(401).json({message:"user does not exist"})
    }
    const validPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signUp,
  logIn,
};