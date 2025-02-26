## Live link :- https://lsoys-project.netlify.app/

# Job Portal assignment for LSOYS Games & Apps

A full-stack job portal built using the MERN stack (MongoDB, Express, React, Node.js) with role-based authentication and job recommendations. The site allows two types of users—**Students** and **Recruiters**—to sign up, log in, and access different functionalities based on their roles. Students can search and apply for jobs, save job listings, and receive recommendations based on their application history, while Recruiters can post new job openings and manage applications.

## Features

-  **User Authentication & Role-Based Access:**
   -  Students and Recruiters can sign up and log in.
   -  Role-based dashboard access ensures each user sees relevant features.
-  **Student Dashboard:**

   -  View a list of available jobs fetched from the database.
   -  Search and filter jobs by salary or specific skill tags.
   -  Apply for jobs with a confirmation modal; application updates user preferences.
   -  Save job listings for later review.

-  **Recruiter Dashboard:**

   -  Post new job openings with details such as title, company name, eligibility criteria, salary, and skill tags.
   -  Manage job postings and view received applications (future implementation).

-  **Responsive & Modern UI:**

   -  Built with React and Material UI components.
   -  Tailored styling for a dark theme with smooth, modern aesthetics.

-  **JWT Authentication:**
   -  Secure authentication using JWT tokens.
   -  Passwords are hashed using bcrypt for enhanced security.

## Tech Stack

-  **Frontend:**

   -  React, React Router
   -  Material UI and Tailwind CSS for styling
   -  Axios for API calls

-  **Backend:**
   -  Node.js, Express
   -  MongoDB with Mongoose for data storage
   -  JWT and bcrypt for authentication and security

## Getting Started

### Prerequisites

-  [Node.js](https://nodejs.org/) (v14 or above recommended)
-  [npm](https://www.npmjs.com/)
-  [MongoDB](https://www.mongodb.com/) (either local installation or a cloud instance like MongoDB Atlas)

### Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/SauravChaudhary26/LSOYS-project
   cd mern-job-portal
   ```

2. **Backend Setup:**

   -  Navigate to the backend folder (if you have a separate folder, e.g., `server/`):

      ```bash
      cd server
      ```

   -  Install backend dependencies:

      ```bash
      npm install
      ```

   -  Create a `.env` file in the backend folder with the following environment variables:

      ```env
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret_key
      PORT=8080
      ```

   -  Start the backend server:

      ```bash
      npm run dev
      ```

      The backend should now be running on [http://localhost:8080](http://localhost:8080).

3. **Frontend Setup:**

   -  Open a new terminal and navigate to the client folder:

      ```bash
      cd client
      ```

   -  Install frontend dependencies:

      ```bash
      npm install
      ```

   -  Start the frontend development server:

      ```bash
      npm run dev
      ```

      The frontend should now be accessible at [http://localhost:3000](http://localhost:3000) (or the port specified by Vite).

4. **Using the Application:**

   -  **Sign Up / Login:**  
      Create an account as a student or recruiter.
   -  **Student Dashboard:**  
      After logging in as a student, you can view available jobs, search/filter listings, and apply for jobs. When you apply for a job, the job’s ID is added to your `appliedJobs` array and its tags update your recommendations.

   -  **Recruiter Dashboard:**  
      If you sign up as a recruiter, you can post new job openings through the “Post Job” page. Each job posting will be stored in the database and associated with your recruiter account.

## API Endpoints

### Jobs

-  `GET /student/jobs`  
   Retrieves all job listings.

-  `POST /recruiter/create`  
   Creates a new job posting.  
   **Request Body:**
   ```json
   {
      "title": "Job Title",
      "companyName": "Company Name",
      "eligibility": "Eligibility criteria",
      "salary": 60000,
      "tags": ["React", "Node"],
      "recruiterId": "recruiter_mongodb_id"
   }
   ```

### Student Application

-  `PUT /student/apply`  
   Updates a student’s `appliedJobs` and `recommendations` when they apply for a job.  
   **Request Body:**
   ```json
   {
      "userId": "student_mongodb_id",
      "jobId": "job_mongodb_id",
      "tags": ["React", "Node"]
   }
   ```

## Folder Structure

```
mern-job-portal/
├── client/           # React frontend code
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── ProtectedRoute.jsx
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── PostJob.jsx
│       │   ├── Login.jsx
│       │   └── Signup.jsx
│       └── App.jsx
└── server/           # Backend code (Express, MongoDB)
    ├── controllers/
    │   ├── authController.js
    │   ├── jobController.js
    │   └── userController.js
    ├── models/
    │   ├── Job.js
    │   ├── User.js
    │   └── Recruiter.js
    ├── routes/
    │   ├── auth.js
    │   ├── jobs.js
    │   └── users.js
    ├── .env
    └── app.js
```

## Future Improvements

-  Implement advanced filtering and sorting options on the job listings.
-  Enhance the student dashboard with additional recommendation algorithms.
-  Expand recruiter features to manage applications and track job posting statistics.
-  Add unit and integration tests for both frontend and backend.

---
