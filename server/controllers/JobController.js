const Job = require("../models/Job");
const Recruiter = require("../models/Recruiter");

const getJobs = async (req, res) => {
   try {
      const jobs = await Job.find();
      res.status(200).json(jobs);
   } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ message: "Server error" });
   }
};

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

      // Update the recruiter's postedJobs array with the new job's _id
      await Recruiter.findByIdAndUpdate(
         recruiterId,
         { $push: { postedJobs: job._id } },
         { new: true }
      );

      res.status(201).json({ message: "Job created successfully", job });
   } catch (error) {
      console.error("Error creating job:", error);
      res.status(500).json({ message: "Server error" });
   }
};

module.exports = { getJobs, createJob };
