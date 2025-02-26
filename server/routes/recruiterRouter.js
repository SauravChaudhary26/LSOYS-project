// routes/jobs.js
const express = require("express");
const router = express.Router();
const { createJob } = require("../controllers/JobController");

// POST /api/jobs/create to create a new job opening
router.post("/create", createJob);

module.exports = router;
