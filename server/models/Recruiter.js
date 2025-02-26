const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema(
   {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, default: "recruiter" },
      postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
   },
   { timestamps: true }
);

module.exports = mongoose.model("Recruiter", recruiterSchema);
