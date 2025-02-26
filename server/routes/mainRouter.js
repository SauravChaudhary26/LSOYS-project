const JwtValidation = require("../middlewares/JwtValidation");
const router = require("express").Router();
const { applyJob } = require("../controllers/UserController");

// Test route
router.get("/test", (req, res) => {
   res.send("SERVER IS RUNNING FINE");
});

module.exports = router;
