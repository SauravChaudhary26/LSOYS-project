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
   Box,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Link } from "react-router-dom";
import axios from "axios";

const StudentDashboard = () => {
   // State for jobs and student's applied job IDs
   const [jobs, setJobs] = useState([]);
   const [appliedJobIds, setAppliedJobIds] = useState([]);
   const [searchQuery, setSearchQuery] = useState("");
   const [filterOpen, setFilterOpen] = useState(false);
   const [applyDialogOpen, setApplyDialogOpen] = useState(false);
   const [selectedJob, setSelectedJob] = useState(null);
   const [filterCriteria, setFilterCriteria] = useState({
      minSalary: "",
      tag: "",
   });
   const [userPreferences, setUserPreferences] = useState([]); // For recommendations if needed

   // Assume userId is stored in localStorage after login
   const userId = localStorage.getItem("userId");

   // Fetch all jobs from backend API when the component mounts
   useEffect(() => {
      const fetchJobs = async () => {
         try {
            const response = await axios.get(
               "https://lsoys-project.onrender.com/student/jobs"
            );
            setJobs(response.data);
         } catch (error) {
            console.error("Error fetching jobs:", error);
         }
      };

      const fetchAppliedJobs = async () => {
         try {
            const response = await axios.get(
               `https://lsoys-project.onrender.com/student/applications?userId=${userId}`
            );
            // Assuming each application is populated with job details
            const appliedIds = response.data.map(
               (application) => application.job?._id
            );
            setAppliedJobIds(appliedIds);
         } catch (error) {
            console.error("Error fetching applied jobs:", error);
         }
      };

      if (userId) {
         fetchJobs();
         fetchAppliedJobs();
      }
   }, [userId]);

   // Filter jobs based on search query, filter criteria, and remove applied jobs
   const filteredJobs = jobs
      .filter((job) => !appliedJobIds.includes(job._id)) // filter out applied jobs
      .filter((job) => {
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
                  (tag) =>
                     tag.toLowerCase() === filterCriteria.tag.toLowerCase()
               );
         }
         return matchesSearch && matchesFilter;
      });

   // When the "Apply" button is clicked, open the confirmation dialog
   const handleApplyClick = (job) => {
      setSelectedJob(job);
      setApplyDialogOpen(true);
   };

   // Handle save button click (simulation)
   const handleSaveClick = (job) => {
      console.log("Saved job:", job.title);
   };

   const confirmApplication = async () => {
      if (selectedJob) {
         try {
            // Send the API request to update appliedJobs and recommendations
            const response = await axios.put(
               "https://lsoys-project.onrender.com/student/apply",
               {
                  userId,
                  jobId: selectedJob._id,
                  tags: selectedJob.tags, // Array of strings like ["React", "Node"]
               }
            );
            console.log("Application updated:", response.data);
            // Optionally update appliedJobIds to remove this job from dashboard view
            setAppliedJobIds((prev) => [...prev, selectedJob._id]);
         } catch (error) {
            console.error("Error applying for job:", error);
         }
      }
      setApplyDialogOpen(false);
      setSelectedJob(null);
   };

   const handleLogout = () => {
      localStorage.clear();
      navigate("/");
   };

   return (
      <div>
         {/* Navbar */}
         <AppBar position="static">
            <Toolbar>
               <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Student Dashboard
               </Typography>
               <Button
                  color="inherit"
                  component={Link}
                  to="/student-applications"
               >
                  Manage Applications
               </Button>
               <Button color="inherit" component={Link} to="/saved-jobs">
                  Saved Jobs
               </Button>
               <Button color="inherit" component={Link} to="/recommendations">
                  Recommendations
               </Button>
               <Button color="inherit" onClick={handleLogout}>
                  Logout
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
                           <Typography variant="body2" color="text.secondary">
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
                        <Grid
                           container
                           spacing={1}
                           alignItems="center"
                           sx={{ p: 1 }}
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
                              <IconButton onClick={() => handleSaveClick(job)}>
                                 <BookmarkBorderIcon />
                              </IconButton>
                           </Grid>
                        </Grid>
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
                  sx={{ mt: 1 }}
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
