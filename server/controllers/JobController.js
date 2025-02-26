const Job = require("../models/Job");

const getJobs = async (req, res) => {
   try {
      const jobs = await Job.find();
      res.status(200).json(jobs);
   } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ message: "Server error" });
   }
};

// Existing createJob function (for posting new job openings)
const createJob = async (req, res) => {
   try {
      const { title, companyName, eligibility, salary, tags, recruiterId } =
         req.body;
      if (
         !title ||
         !companyName ||
         !eligibility ||
         !salary ||
         !tags ||
         !recruiterId
      ) {
         return res.status(400).json({ message: "Missing required fields" });
      }

      const job = new Job({
         title,
         companyName,
         eligibility,
         salary,
         tags,
         recruiter: recruiterId,
      });
      await job.save();

      // Optionally update the recruiter’s postedJobs array here if needed
      res.status(201).json({ message: "Job created successfully", job });
   } catch (error) {
      console.error("Error creating job:", error);
      res.status(500).json({ message: "Server error" });
   }
};

module.exports = { getJobs, createJob };
