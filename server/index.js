console.log("Starting server...");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Import routers
const AuthRouter = require("./routes/authRouter");
const UserRouter = require("./routes/userRouter");
const MainRouter = require("./routes/mainRouter");
const recruiterRouter = require("./routes/recruiterRouter");

// Supress deprecation warnings
process.noDeprecation = true;

// Connect to the database
require("./db");

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set

// Middleware setup
// Add Cross-Origin-Opener-Policy header middleware
app.use(cors({ origin: true, credentials: true }));

// Enable CORS and parse JSON bodies
app.use(cors());
app.use(bodyParser.json());

// Define routes
app.use("/", MainRouter);
app.use("/student", UserRouter);
app.use("/recruiter", recruiterRouter);
app.use("/auth", AuthRouter);

// Start the server
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
