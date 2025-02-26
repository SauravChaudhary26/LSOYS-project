// models/Application.js
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
   {
      candidate: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      job: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Job",
         required: true,
      },
      appliedAt: {
         type: Date,
         default: Date.now,
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
