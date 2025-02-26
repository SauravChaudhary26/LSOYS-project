const router = require("express").Router();

// Test route
router.get("/test", (req, res) => {
   res.send("SERVER IS RUNNING FINE");
});

module.exports = router;
