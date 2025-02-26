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
   Chip,
   Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Applications = () => {
   const navigate = useNavigate();
   const [applications, setApplications] = useState([]);

   useEffect(() => {
      const fetchApplications = async () => {
         try {
            // Get recruiterId from localStorage (set on login)
            const recruiterId = localStorage.getItem("userId");
            const response = await axios.get(
               `https://lsoys-project.onrender.com/recruiter/applications?recruiterId=${recruiterId}`
            );
            setApplications(response.data);
         } catch (error) {
            console.error("Error fetching applications:", error);
         }
      };
      fetchApplications();
   }, []);

   return (
      <div>
         {/* AppBar */}
         <AppBar position="static">
            <Toolbar>
               <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Manage Applications
               </Typography>
               <Button
                  color="inherit"
                  onClick={() => navigate("/post-job")}
                  sx={{ mr: 2 }}
               >
                  Post Job
               </Button>
               <Button
                  color="inherit"
                  onClick={() => navigate("/recruiter/dashboard")}
               >
                  Dashboard
               </Button>
            </Toolbar>
         </AppBar>

         <Container sx={{ marginTop: 4 }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
               Applications Received
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
                                 Candidate: {app.candidate.name} (
                                 {app.candidate.email})
                              </Typography>
                              <Typography
                                 variant="body2"
                                 color="text.secondary"
                              >
                                 Applied On:{" "}
                                 {new Date(app.appliedAt).toLocaleDateString()}
                              </Typography>
                              <Box sx={{ mt: 1 }}>
                                 {app.job.tags.map((tag, index) => (
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

export default Applications;
