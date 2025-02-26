const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Recruiter = require("../models/Recruiter");

const signup = async (req, res) => {
   const { name, email, password, role } = req.body;
   console.log("Signup request received:", req.body);

   try {
      // Check if the user already exists in the appropriate collection
      if (role === "student") {
         const existingUser = await User.findOne({ email });
         if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
         }
      } else if (role === "recruiter") {
         const existingRecruiter = await Recruiter.findOne({ email });
         if (existingRecruiter) {
            return res
               .status(400)
               .json({ message: "Recruiter already exists" });
         }
      } else {
         return res.status(400).json({ message: "Invalid role provided" });
      }

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      let user;
      if (role === "student") {
         user = new User({
            name,
            email,
            password: hashedPassword,
         });
      } else if (role === "recruiter") {
         user = new Recruiter({
            name,
            email,
            password: hashedPassword,
         });
      }

      await user.save();

      // Create JWT token (ensure JWT_SECRET is set in your environment variables)
      const token = jwt.sign(
         { id: user._id, email: user.email, role: user.role },
         process.env.JWT_SECRET,
         { expiresIn: "1d" }
      );

      res.status(201).json({ token, user });
   } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Server error" });
   }
};

const login = async (req, res) => {
   const { email, password, role } = req.body;
   try {
      let user;
      if (role === "student") {
         user = await User.findOne({ email });
      } else if (role === "recruiter") {
         user = await Recruiter.findOne({ email });
      } else {
         return res.status(400).json({ message: "Invalid role provided" });
      }

      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      // Compare hashed passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
         { id: user._id, email: user.email, role: user.role },
         process.env.JWT_SECRET,
         { expiresIn: "1d" }
      );

      res.status(200).json({ token, user });
   } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
   }
};

module.exports = { signup, login };
