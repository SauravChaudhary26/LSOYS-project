// routes/users.js
const express = require("express");
const router = express.Router();
const { applyJob } = require("../controllers/UserController");
const { getJobs } = require("../controllers/JobController");

router.get("/test", (req, res) => {
   res.send("STUDENT ROUTE IS RUNNING FINE");
});

router.put("/apply", applyJob);
router.get("/jobs", getJobs);

module.exports = router;
