// routes/users.js
const express = require("express");
const router = express.Router();
const {
   getStudentApplications,
   withdrawApplication,
   applyJob,
   getSavedJobs,
   toggleSaveJob,
   getRecommendedJobs,
} = require("../controllers/UserController");
const { getJobs } = require("../controllers/JobController");

router.get("/test", (req, res) => {
   res.send("STUDENT ROUTE IS RUNNING FINE");
});

router.put("/apply", applyJob);
router.get("/jobs", getJobs);
router.get("/applications", getStudentApplications);
router.put("/withdraw", withdrawApplication);

router.get("/savedjobs", getSavedJobs);
router.put("/save", toggleSaveJob);

router.get("/recommendations", getRecommendedJobs);

module.exports = router;
