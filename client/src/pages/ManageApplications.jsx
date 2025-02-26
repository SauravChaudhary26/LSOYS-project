// src/pages/ManageApplications.jsx
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
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageApplications = () => {
   const navigate = useNavigate();
   const [applications, setApplications] = useState([]);

   // Fetch the candidate's applications from the backend
   const fetchApplications = async () => {
      const userId = localStorage.getItem("userId"); // Assumes userId is stored on login
      try {
         const response = await axios.get(
            `https://lsoys-project.onrender.com/student/applications?userId=${userId}`
         );
         console.log(response.data);
         setApplications(response.data);
      } catch (error) {
         console.error("Error fetching applications:", error);
      }
   };

   useEffect(() => {
      fetchApplications();
   }, []);

   // Handler to withdraw an application
   const handleWithdraw = async (jobId) => {
      const userId = localStorage.getItem("userId");
      try {
         await axios.put(
            "https://lsoys-project.onrender.com/student/withdraw",
            {
               userId,
               jobId,
            }
         );
         // Refresh the list after successful withdrawal
         fetchApplications();
      } catch (error) {
         console.error("Error withdrawing application:", error);
      }
   };

   return (
      <div>
         {/* AppBar */}
         <AppBar position="static">
            <Toolbar>
               <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  My Applications
               </Typography>
               <Button color="inherit" onClick={() => navigate("/dashboard")}>
                  Home
               </Button>
            </Toolbar>
         </AppBar>

         <Container sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
               Your Applied Jobs
            </Typography>
            {applications.length === 0 ? (
               <Typography>No applications found.</Typography>
            ) : (
               <Grid container spacing={2}>
                  {applications.map((app) => (
                     <Grid item xs={12} sm={6} md={4} key={app._id}>
                        <Card variant="outlined">
                           <CardContent>
                              <Typography variant="h6">
                                 {app.job.title}
                              </Typography>
                              <Typography
                                 variant="body2"
                                 color="text.secondary"
                              >
                                 {app.job.companyName}
                              </Typography>
                              <Typography
                                 variant="body2"
                                 color="text.secondary"
                              >
                                 Eligibility: {app.job.eligibility}
                              </Typography>
                              <Typography
                                 variant="body2"
                                 color="text.secondary"
                              >
                                 Salary: ${app.job.salary}
                              </Typography>
                              <Button
                                 variant="contained"
                                 color="error"
                                 onClick={() => handleWithdraw(app.job._id)}
                                 sx={{ mt: 2 }}
                              >
                                 Withdraw
                              </Button>
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

export default ManageApplications;
