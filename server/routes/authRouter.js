const { signup, login } = require("../controllers/AuthControllers");

// console.log('Starting authRouter...'); // To check if the file is loading correctly

const router = require("express").Router();

router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
