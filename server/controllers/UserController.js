// controllers/studentController.js
const User = require("../models/User");
const Application = require("../models/Application");
const Job = require("../models/Job");

const applyJob = async (req, res) => {
   const { userId, jobId, tags } = req.body; // Expect tags as an array of strings
   if (!userId || !jobId || !tags) {
      return res.status(400).json({ message: "Missing required fields" });
   }

   try {
      const user = await User.findById(userId);
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      // Update appliedJobs if jobId not already present
      if (
         !user.appliedJobs.map((id) => id.toString()).includes(jobId.toString())
      ) {
         user.appliedJobs.push(jobId);
      }

      // Update recommendations (an array of strings)
      tags.forEach((tag) => {
         if (!user.recommendations.includes(tag)) {
            user.recommendations.push(tag);
         }
      });

      await user.save();

      // Create an Application record if one doesn't already exist
      const existingApp = await Application.findOne({
         candidate: userId,
         job: jobId,
      });
      if (!existingApp) {
         const application = new Application({
            candidate: userId,
            job: jobId,
         });
         await application.save();
      }

      res.status(200).json({ message: "Application updated", user });
   } catch (error) {
      console.error("Error in applyJob:", error);
      res.status(500).json({ message: "Server error" });
   }
};

const getStudentApplications = async (req, res) => {
   const { userId } = req.query;
   if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
   }
   try {
      const applications = await Application.find({
         candidate: userId,
      }).populate("job", "title companyName eligibility salary tags");
      res.status(200).json(applications);
   } catch (error) {
      console.error("Error fetching student applications:", error);
      res.status(500).json({ message: "Server error" });
   }
};

// Withdraw an application: remove job from appliedJobs and delete the application record
const withdrawApplication = async (req, res) => {
   const { userId, jobId } = req.body;
   if (!userId || !jobId) {
      return res.status(400).json({ message: "Missing required fields" });
   }
   try {
      // Remove the job from the user's appliedJobs array
      await User.findByIdAndUpdate(userId, { $pull: { appliedJobs: jobId } });
      // Remove the corresponding Application document
      await Application.findOneAndDelete({ candidate: userId, job: jobId });
      res.status(200).json({ message: "Application withdrawn successfully" });
   } catch (error) {
      console.error("Error withdrawing application:", error);
      res.status(500).json({ message: "Server error" });
   }
};

const getSavedJobs = async (req, res) => {
   const { userId } = req.query;
   if (!userId) {
      return res.status(400).json({ message: "Missing required userId" });
   }
   try {
      // Find the user and populate the savedJobs array (which references Job documents)
      const user = await User.findById(userId).populate("savedJobs");
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user.savedJobs);
   } catch (error) {
      console.error("Error fetching saved jobs:", error);
      res.status(500).json({ message: "Server error" });
   }
};

const toggleSaveJob = async (req, res) => {
   const { userId, jobId } = req.body;
   if (!userId || !jobId) {
      return res.status(400).json({ message: "Missing required fields" });
   }
   try {
      const user = await User.findById(userId);
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }
      const jobIdStr = jobId.toString();
      let message = "";
      // Check if job is already saved
      if (user.savedJobs.map((id) => id.toString()).includes(jobIdStr)) {
         // Remove the job from savedJobs
         user.savedJobs.pull(jobId);
         message = "Job removed from saved jobs";
      } else {
         // Add the job to savedJobs
         user.savedJobs.push(jobId);
         message = "Job saved for later";
      }
      await user.save();
      res.status(200).json({ message, savedJobs: user.savedJobs });
   } catch (error) {
      console.error("Error toggling saved job:", error);
      res.status(500).json({ message: "Server error" });
   }
};

const getRecommendedJobs = async (req, res) => {
   const { userId } = req.query;
   if (!userId) {
      return res.status(400).json({ message: "Missing required userId" });
   }
   try {
      const user = await User.findById(userId);
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }
      // Find jobs where at least one tag matches one of the user's recommendations
      const recommendedJobs = await Job.find({
         tags: { $in: user.recommendations },
      });
      res.status(200).json(recommendedJobs);
   } catch (error) {
      console.error("Error fetching recommended jobs:", error);
      res.status(500).json({ message: "Server error" });
   }
};

module.exports = {
   applyJob,
   getStudentApplications,
   withdrawApplication,
   getSavedJobs,
   toggleSaveJob,
   getRecommendedJobs,
};
