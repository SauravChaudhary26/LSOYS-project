// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
   {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, default: "student" },
      // Fields specific to students
      appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
      savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
      recommendations: [String], // Modified to store job tags as strings
   },
   { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
