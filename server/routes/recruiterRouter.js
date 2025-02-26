// routes/jobs.js
const express = require("express");
const router = express.Router();
const { createJob } = require("../controllers/JobController");
const {
   getApplicationsForRecruiter,
} = require("../controllers/recruiterController");

// POST /api/jobs/create to create a new job opening
router.post("/create", createJob);
router.get("/applications", getApplicationsForRecruiter);

module.exports = router;
