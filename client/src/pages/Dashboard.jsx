// src/pages/StudentDashboard.jsx
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
   TextField,
   IconButton,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Link } from "react-router-dom";
import axios from "axios";

const StudentDashboard = () => {
   // Jobs state is now populated from the API call
   const [jobs, setJobs] = useState([]);
   const [searchQuery, setSearchQuery] = useState("");
   const [filterOpen, setFilterOpen] = useState(false);
   const [applyDialogOpen, setApplyDialogOpen] = useState(false);
   const [selectedJob, setSelectedJob] = useState(null);
   const [filterCriteria, setFilterCriteria] = useState({
      minSalary: "",
      tag: "",
   });
   const [userPreferences, setUserPreferences] = useState([]); // User's preferences array

   // Fetch jobs from backend API when the component mounts
   useEffect(() => {
      const fetchJobs = async () => {
         try {
            const response = await axios.get(
               "http://localhost:8080/student/jobs"
            );
            // Assuming the API returns an array of jobs
            setJobs(response.data);
         } catch (error) {
            console.error("Error fetching jobs:", error);
         }
      };
      fetchJobs();
   }, []);

   // Filter jobs based on search query and filter criteria
   const filteredJobs = jobs.filter((job) => {
      const matchesSearch =
         job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         job.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
         );
      let matchesFilter = true;
      if (filterCriteria.minSalary) {
         matchesFilter = job.salary >= Number(filterCriteria.minSalary);
      }
      if (filterCriteria.tag) {
         matchesFilter =
            matchesFilter &&
            job.tags.some(
               (tag) => tag.toLowerCase() === filterCriteria.tag.toLowerCase()
            );
      }
      return matchesSearch && matchesFilter;
   });

   // When the "Apply" button is clicked, open the confirmation dialog
   const handleApplyClick = (job) => {
      setSelectedJob(job);
      setApplyDialogOpen(true);
   };

   // Handle save button click for a job (simulation)
   const handleSaveClick = (job) => {
      console.log("Saved job:", job.title);
   };

   const confirmApplication = async () => {
      if (selectedJob) {
         try {
            // Assume you store the logged-in user's ID in localStorage
            const userId = localStorage.getItem("userId");
            console.log("Applying as user:", userId);

            // Send the API request to update appliedJobs and recommendations
            const response = await axios.put(
               "http://localhost:8080/student/apply",
               {
                  userId,
                  jobId: selectedJob._id,
                  tags: selectedJob.tags, // Array of strings like ["React", "Node"]
               }
            );
            console.log("Application updated:", response.data);
            // Optionally, remove the applied job from the dashboard view
         } catch (error) {
            console.error("Error applying for job:", error);
         }
      }
      setApplyDialogOpen(false);
      setSelectedJob(null);
   };

   return (
      <div>
         {/* Navbar */}
         <AppBar position="static">
            <Toolbar>
               <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Student Dashboard
               </Typography>
               <Button color="inherit" component={Link} to="/applications">
                  Manage Applications
               </Button>
               <Button color="inherit" component={Link} to="/saved-jobs">
                  Saved Jobs
               </Button>
               <Button color="inherit" component={Link} to="/recommendations">
                  Recommendations
               </Button>
            </Toolbar>
         </AppBar>

         <Container sx={{ marginTop: 4 }}>
            {/* Search and Filter Section */}
            <Grid container spacing={2} alignItems="center">
               <Grid item xs={12} sm={9}>
                  <TextField
                     fullWidth
                     label="Search Jobs"
                     variant="outlined"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </Grid>
               <Grid item xs={6} sm={3}>
                  <Button
                     variant="contained"
                     startIcon={<FilterListIcon />}
                     fullWidth
                     onClick={() => setFilterOpen(true)}
                  >
                     Filter
                  </Button>
               </Grid>
            </Grid>

            {/* Jobs List */}
            <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
               Available Jobs
            </Typography>
            <Grid container spacing={2}>
               {filteredJobs.map((job) => (
                  <Grid item xs={12} sm={6} md={4} key={job._id}>
                     <Card variant="outlined">
                        <CardContent>
                           <Typography variant="h6">{job.title}</Typography>
                           <Typography variant="body2" color="text.secondary">
                              {job.companyName}
                           </Typography>
                           <Typography variant="body2" color="text.secondary">
                              Eligibility: {job.eligibility}
                           </Typography>
                           <Typography variant="body2" color="text.secondary">
                              Salary: ${job.salary}
                           </Typography>
                           <div style={{ marginTop: 8 }}>
                              {job.tags.map((tag, index) => (
                                 <Chip
                                    key={index}
                                    label={tag}
                                    size="small"
                                    sx={{ marginRight: 0.5, marginBottom: 0.5 }}
                                 />
                              ))}
                           </div>
                           <Grid
                              container
                              spacing={1}
                              alignItems="center"
                              sx={{ marginTop: 2 }}
                           >
                              <Grid item xs={8}>
                                 <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => handleApplyClick(job)}
                                 >
                                    Apply
                                 </Button>
                              </Grid>
                              <Grid item xs={4}>
                                 <IconButton
                                    onClick={() => handleSaveClick(job)}
                                 >
                                    <BookmarkBorderIcon />
                                 </IconButton>
                              </Grid>
                           </Grid>
                        </CardContent>
                     </Card>
                  </Grid>
               ))}
            </Grid>
         </Container>

         {/* Apply Confirmation Dialog */}
         <Dialog
            open={applyDialogOpen}
            onClose={() => setApplyDialogOpen(false)}
         >
            <DialogTitle>Confirm Application</DialogTitle>
            <DialogContent>
               <Typography>
                  Are you sure you want to apply for "{selectedJob?.title}"?
               </Typography>
               <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: 1 }}
               >
                  You can withdraw your application within 24 hours.
               </Typography>
            </DialogContent>
            <DialogActions>
               <Button onClick={() => setApplyDialogOpen(false)}>Cancel</Button>
               <Button variant="contained" onClick={confirmApplication}>
                  Confirm
               </Button>
            </DialogActions>
         </Dialog>

         {/* Filter Dialog */}
         <Dialog open={filterOpen} onClose={() => setFilterOpen(false)}>
            <DialogTitle>Filter Jobs</DialogTitle>
            <DialogContent>
               <TextField
                  fullWidth
                  label="Minimum Salary"
                  type="number"
                  variant="outlined"
                  margin="normal"
                  value={filterCriteria.minSalary}
                  onChange={(e) =>
                     setFilterCriteria({
                        ...filterCriteria,
                        minSalary: e.target.value,
                     })
                  }
               />
               <TextField
                  fullWidth
                  label="Tag"
                  variant="outlined"
                  margin="normal"
                  value={filterCriteria.tag}
                  onChange={(e) =>
                     setFilterCriteria({
                        ...filterCriteria,
                        tag: e.target.value,
                     })
                  }
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={() => setFilterOpen(false)}>Cancel</Button>
               <Button variant="contained" onClick={() => setFilterOpen(false)}>
                  Apply Filter
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
};

export default StudentDashboard;
