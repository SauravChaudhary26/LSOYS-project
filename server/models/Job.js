// models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
   {
      title: { type: String, required: true },
      companyName: { type: String, required: true },
      eligibility: { type: String, required: true },
      salary: { type: Number, required: true },
      tags: [{ type: String }], // Array of job tags (e.g., ["React", "Node"])
      recruiter: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Recruiter",
         required: true,
      },
   },
   { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Job", jobSchema);
