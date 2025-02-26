// src/pages/SavedJobs.jsx
import React, { useState, useEffect } from "react";
import {
   AppBar,
   Toolbar,
   Typography,
   Button,
   Container,
   Grid,
   Card,
   CardContent,
   Chip,
   Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const SavedJobs = () => {
   const [savedJobs, setSavedJobs] = useState([]);
   const userId = localStorage.getItem("userId");

   // Fetch saved jobs from the backend
   useEffect(() => {
      const fetchSavedJobs = async () => {
         try {
            const response = await axios.get(
               `https://lsoys-project.onrender.com/student/savedjobs?userId=${userId}`
            );
            setSavedJobs(response.data);
         } catch (error) {
            console.error("Error fetching saved jobs:", error);
         }
      };

      if (userId) {
         fetchSavedJobs();
      }
   }, [userId]);

   return (
      <div>
         {/* Navbar */}
         <AppBar position="static">
            <Toolbar>
               <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Saved Jobs
               </Typography>
               <Button color="inherit" component={Link} to="/dashboard">
                  Dashboard
               </Button>
            </Toolbar>
         </AppBar>

         <Container sx={{ mt: 4 }}>
            {savedJobs.length === 0 ? (
               <Typography>No saved jobs found.</Typography>
            ) : (
               <Grid container spacing={2}>
                  {savedJobs.map((job) => (
                     <Grid item xs={12} sm={6} md={4} key={job._id}>
                        <Card
                           variant="outlined"
                           sx={{
                              height: 250,
                              overflow: "hidden",
                              display: "flex",
                              flexDirection: "column",
                              borderRadius: "12px",
                              p: 1,
                           }}
                        >
                           <CardContent sx={{ flexGrow: 1, p: 1 }}>
                              <Typography
                                 variant="h6"
                                 sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                 }}
                              >
                                 {job.title}
                              </Typography>
                              <Typography
                                 variant="body2"
                                 color="text.secondary"
                                 sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                 }}
                              >
                                 {job.companyName}
                              </Typography>
                              <Typography
                                 variant="body2"
                                 color="text.secondary"
                                 sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                 }}
                              >
                                 Eligibility: {job.eligibility}
                              </Typography>
                              <Typography
                                 variant="body2"
                                 color="text.secondary"
                              >
                                 Salary: ${job.salary}
                              </Typography>
                              <Box sx={{ mt: 1 }}>
                                 {job.tags.map((tag, index) => (
                                    <Chip
                                       key={index}
                                       label={tag}
                                       size="small"
                                       sx={{ mr: 0.5, mb: 0.5 }}
                                    />
                                 ))}
                              </Box>
                           </CardContent>
                        </Card>
                     </Grid>
                  ))}
               </Grid>
            )}
         </Container>
      </div>
   );
};

export default SavedJobs;
