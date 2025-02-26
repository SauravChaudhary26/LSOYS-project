// src/pages/PostJob.jsx
import React, { useState } from "react";
import {
   AppBar,
   Toolbar,
   Typography,
   Button,
   Container,
   TextField,
   Paper,
   Grid,
   Chip,
   Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
   const navigate = useNavigate();
   const [jobData, setJobData] = useState({
      title: "",
      companyName: "",
      eligibility: "",
      salary: "",
      tags: [], // store tags as an array
   });
   // State to manage the current tag input
   const [tagInput, setTagInput] = useState("");

   const handleChange = (e) => {
      setJobData({ ...jobData, [e.target.name]: e.target.value });
   };

   const handleTagKeyDown = (e) => {
      if (e.key === "Enter" && tagInput.trim() !== "") {
         e.preventDefault(); // Prevent form submission on Enter
         setJobData((prevData) => ({
            ...prevData,
            tags: [...prevData.tags, tagInput.trim()],
         }));
         setTagInput("");
      }
   };

   const handleTagDelete = (tagToDelete) => {
      setJobData((prevData) => ({
         ...prevData,
         tags: prevData.tags.filter((tag) => tag !== tagToDelete),
      }));
   };

   const handleLogout = () => {
      localStorage.clear();
      navigate("/login");
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      // Get the recruiter _id from localStorage
      const recruiterId = localStorage.getItem("userId");

      const payload = {
         title: jobData.title,
         companyName: jobData.companyName,
         eligibility: jobData.eligibility,
         salary: Number(jobData.salary),
         tags: jobData.tags,
         recruiterId, // recruiter _id from MongoDB
      };

      try {
         const response = await axios.post(
            "http://localhost:8080/recruiter/create",
            payload
         );
         console.log("Job created:", response.data);
         // Clear the form after successful submission
         setJobData({
            title: "",
            companyName: "",
            eligibility: "",
            salary: "",
            tags: [],
         });
      } catch (error) {
         console.error("Error posting job:", error);
      }
   };

   return (
      <Box
         sx={{ backgroundColor: "#111827", minHeight: "100vh", color: "white" }}
      >
         {/* AppBar with classic dark colors */}
         <AppBar position="static" sx={{ backgroundColor: "#000" }}>
            <Toolbar>
               <Typography
                  variant="h6"
                  sx={{ flexGrow: 1, fontWeight: "bold" }}
               >
                  Post New Job
               </Typography>
               <Button
                  color="inherit"
                  onClick={() => navigate("/manage-applications")}
                  sx={{ mr: 2 }}
               >
                  Manage Applications
               </Button>
               <Button color="inherit" onClick={handleLogout}>
                  Logout
               </Button>
            </Toolbar>
         </AppBar>

         {/* Centered container for the form */}
         <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
            <Paper
               elevation={3}
               sx={{ p: 4, borderRadius: 2, backgroundColor: "#1f2937" }}
            >
               <Typography
                  variant="h5"
                  align="center"
                  sx={{ mb: 3, fontWeight: 500 }}
               >
                  Create Job Opening
               </Typography>
               <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                     <Grid item xs={12}>
                        <TextField
                           label="Job Title"
                           name="title"
                           fullWidth
                           value={jobData.title}
                           onChange={handleChange}
                           required
                           variant="outlined"
                           InputLabelProps={{ style: { color: "white" } }}
                           InputProps={{ style: { color: "white" } }}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           label="Company Name"
                           name="companyName"
                           fullWidth
                           value={jobData.companyName}
                           onChange={handleChange}
                           required
                           variant="outlined"
                           InputLabelProps={{ style: { color: "white" } }}
                           InputProps={{ style: { color: "white" } }}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           label="Eligibility"
                           name="eligibility"
                           fullWidth
                           value={jobData.eligibility}
                           onChange={handleChange}
                           required
                           variant="outlined"
                           InputLabelProps={{ style: { color: "white" } }}
                           InputProps={{ style: { color: "white" } }}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           label="Salary"
                           name="salary"
                           type="number"
                           fullWidth
                           value={jobData.salary}
                           onChange={handleChange}
                           required
                           variant="outlined"
                           InputLabelProps={{ style: { color: "white" } }}
                           InputProps={{ style: { color: "white" } }}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           label="Add Skill Tag"
                           fullWidth
                           value={tagInput}
                           onChange={(e) => setTagInput(e.target.value)}
                           onKeyDown={handleTagKeyDown}
                           variant="outlined"
                           helperText="Type a skill and press Enter to add"
                           InputLabelProps={{ style: { color: "white" } }}
                           InputProps={{ style: { color: "white" } }}
                        />
                        <Box sx={{ mt: 2 }}>
                           {jobData.tags.map((tag, index) => (
                              <Chip
                                 key={index}
                                 label={tag}
                                 onDelete={() => handleTagDelete(tag)}
                                 sx={{
                                    mr: 1,
                                    mb: 1,
                                    color: "white",
                                    borderColor: "white",
                                 }}
                                 variant="outlined"
                              />
                           ))}
                        </Box>
                     </Grid>
                     <Grid item xs={12} sx={{ textAlign: "center" }}>
                        <Button
                           variant="contained"
                           type="submit"
                           sx={{ px: 4, py: 1.5 }}
                        >
                           Post Job
                        </Button>
                     </Grid>
                  </Grid>
               </form>
            </Paper>
         </Container>
      </Box>
   );
};

export default PostJob;
