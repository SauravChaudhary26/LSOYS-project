// controllers/recruiterController.js
const Recruiter = require("../models/Recruiter");
const Application = require("../models/Application");

const getApplicationsForRecruiter = async (req, res) => {
   const { recruiterId } = req.query;
   if (!recruiterId) {
      return res.status(400).json({ message: "Missing recruiterId" });
   }
   try {
      // Find the recruiter to access posted jobs
      const recruiter = await Recruiter.findById(recruiterId);
      if (!recruiter) {
         return res.status(404).json({ message: "Recruiter not found" });
      }

      const postedJobs = recruiter.postedJobs;
      // Retrieve applications where the job is among the posted jobs
      const applications = await Application.find({ job: { $in: postedJobs } })
         .populate("candidate", "name email")
         .populate("job", "title companyName eligibility salary tags");
      res.status(200).json(applications);
   } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ message: "Server error" });
   }
};

module.exports = { getApplicationsForRecruiter };
