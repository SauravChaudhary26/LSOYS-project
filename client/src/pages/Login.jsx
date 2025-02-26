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

const Login = () => {
   const [formData, setFormData] = useState({
      email: "",
      password: "",
      role: "select-role",
   });
   const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const Navigate = useNavigate();
   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!formData.email || !formData.password) {
         toast.error("All fields are required");
         return;
      }

      if (formData.role === "select-role") {
         toast.error("Please select a role");
         return;
      }

      setLoading(true);
      try {
         const url = "https://lsoys-project.onrender.com/auth/login";
         const response = await axios.post(url, formData);

         if (!response.data.token) {
            toast.error("Login failed");
            return;
         }

         toast.success("Signup successful!");
         localStorage.setItem("token", response.data.token);
         localStorage.setItem("userRole", response.data.user.role);
         localStorage.setItem("userId", response.data.user._id);
         console.log(response.data);

         if (response.data.user.role === "student") {
            Navigate("/dashboard");
         } else if (response.data.user.role === "recruiter") {
            Navigate("/post-job");
         } else {
            toast.error("Invalid role");
         }
      } catch (error) {
         toast.error(error.response?.data?.message || "Signup failed");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex justify-center flex-col items-center min-h-screen bg-gray-950 text-white p-4">
         <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
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
                     <MenuItem value="select-role">Select role</MenuItem>
                     <MenuItem value="student">Student</MenuItem>
                     <MenuItem value="recruiter">Recruiter</MenuItem>
                  </Select>
               </FormControl>
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
                     "Login in"
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
                  Don't have an account?{" "}
                  <Link to="/" className="text-blue-500">
                     Sign-Up
                  </Link>
               </Typography>
            </div>
         </div>
         <Typography className="text-gray-400 mt-7 ml-4">
            *Render.com free servers are very slow, so backend takes around 30
            seconds to process the first request at the worst. Any subsequent
            requests are faster. Thank you for your patience.
         </Typography>
         <ToastContainer />
      </div>
   );
};

export default Login;
