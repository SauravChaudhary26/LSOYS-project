// src/pages/Recommendations.jsx
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

const Recommendations = () => {
   const [recommendedJobs, setRecommendedJobs] = useState([]);
   const userId = localStorage.getItem("userId");

   useEffect(() => {
      const fetchRecommendedJobs = async () => {
         try {
            const response = await axios.get(
               `https://lsoys-project.onrender.com/student/recommendations?userId=${userId}`
            );
            setRecommendedJobs(response.data);
         } catch (error) {
            console.error("Error fetching recommended jobs:", error);
         }
      };

      if (userId) {
         fetchRecommendedJobs();
      }
   }, [userId]);

   return (
      <div>
         {/* Navbar */}
         <AppBar position="static">
            <Toolbar>
               <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Job Recommendations
               </Typography>
               <Button color="inherit" component={Link} to="/dashboard">
                  Dashboard
               </Button>
            </Toolbar>
         </AppBar>

         <Container sx={{ mt: 4 }}>
            {recommendedJobs.length === 0 ? (
               <Typography>No recommended jobs found.</Typography>
            ) : (
               <Grid container spacing={2}>
                  {recommendedJobs.map((job) => (
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

export default Recommendations;
