import { useState } from "react";
import {
   TextField,
   Button,
   CircularProgress,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Select-role",
   });
   const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const Navigate = useNavigate();
   const handleSubmit = async (e) => {
      e.preventDefault();

      if (
         !formData.name ||
         !formData.email ||
         !formData.password ||
         !formData.confirmPassword
      ) {
         toast.error("All fields are required");
         return;
      }

      if (formData.role === "Select-role") {
         toast.error("Please select a role");
         return;
      }

      if (formData.password !== formData.confirmPassword) {
         toast.error("Passwords do not match");
         return;
      }

      setLoading(true);
      try {
         const response = await axios.post("/api/auth/signup", formData);

         if (!response || !response.data.token) {
            toast.error("Signup failed");
            return;
         }

         toast.success("Signup successful!");
         localStorage.setItem("token", response.data.token);
         localStorage.setItem("userRole", response.data.user.role);
         console.log(response.data);

         if (response.data.user.role === "student") {
            Navigate("/dashboard");
         } else if (response.data.user.role === "recruiter") {
            Navigate("/post-job");
         } else {
            toast.error("Invalid role");
         }
      } catch (error) {
         console.log(error);
         toast.error(error.response?.data?.message || "Signup failed");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white p-4">
         <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
               <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  onChange={handleChange}
                  value={formData.name}
                  InputLabelProps={{ style: { color: "#bbb" } }}
                  InputProps={{
                     style: {
                        color: "#fff",
                        backgroundColor: "#1f2937",
                        borderRadius: "8px",
                     },
                  }}
               />
               <TextField
                  label="Email"
                  type="email"
                  name="email"
                  fullWidth
                  onChange={handleChange}
                  value={formData.email}
                  InputLabelProps={{ style: { color: "#bbb" } }}
                  InputProps={{
                     style: {
                        color: "#fff",
                        backgroundColor: "#1f2937",
                        borderRadius: "8px",
                     },
                  }}
               />
               <FormControl fullWidth>
                  <InputLabel style={{ color: "#bbb" }}></InputLabel>
                  <Select
                     name="role"
                     value={formData.role}
                     onChange={handleChange}
                     style={{
                        color: "#fff",
                        backgroundColor: "#1f2937",
                        borderRadius: "8px",
                     }}
                  >
                     <MenuItem value="Select-role">Select role</MenuItem>
                     <MenuItem value="student">Student</MenuItem>
                     <MenuItem value="recruiter">Recruiter</MenuItem>
                  </Select>
               </FormControl>
               <TextField
                  label="Password"
                  type="password"
                  name="password"
                  fullWidth
                  onChange={handleChange}
                  value={formData.password}
                  InputLabelProps={{ style: { color: "#bbb" } }}
                  InputProps={{
                     style: {
                        color: "#fff",
                        backgroundColor: "#1f2937",
                        borderRadius: "8px",
                     },
                  }}
               />
               <TextField
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  fullWidth
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  InputLabelProps={{ style: { color: "#bbb" } }}
                  InputProps={{
                     style: {
                        color: "#fff",
                        backgroundColor: "#1f2937",
                        borderRadius: "8px",
                     },
                  }}
               />
               <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  className="rounded-lg py-3"
               >
                  {loading ? (
                     <CircularProgress size={24} color="inherit" />
                  ) : (
                     "Sign Up"
                  )}
               </Button>
            </form>
            <div className="mt-4 text-center">
               <Typography variant="body2" className="text-gray-400 mt-2 mb-6">
                  <Link to="/forgot-password" className="text-blue-500">
                     Forgot Password?
                  </Link>
               </Typography>
               <Typography variant="body2" className="text-gray-400 mt-4">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500">
                     Login
                  </Link>
               </Typography>
            </div>
         </div>
         <ToastContainer />
      </div>
   );
};

export default Signup;
