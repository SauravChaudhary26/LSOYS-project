// controllers/userController.js
const User = require("../models/User");

const applyJob = async (req, res) => {
   const { userId, jobId, tags } = req.body;
   console.log("userId", userId);
   console.log("jobId", jobId);

   if (!userId || !jobId || !tags) {
      return res.status(400).json({ message: "Missing required fields" });
   }

   try {
      const user = await User.findById(userId);
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      // Add jobId to appliedJobs if not already applied
      if (
         !user.appliedJobs.map((id) => id.toString()).includes(jobId.toString())
      ) {
         user.appliedJobs.push(jobId);
      }

      // For each tag in the job, add it to recommendations if not already present
      tags.forEach((tag) => {
         if (!user.recommendations.includes(tag)) {
            user.recommendations.push(tag);
         }
      });

      await user.save();
      res.status(200).json({ message: "Application updated", user });
   } catch (err) {
      console.error("Error in applyJob:", err);
      res.status(500).json({ message: "Server error" });
   }
};

module.exports = { applyJob };
