import { Link } from "react-router-dom";

const Unauthorized = () => {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-900">
         <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
         <p>You do not have permission to view this page.</p>
         <Link to="/" className="mt-4 text-blue-500">
            Go Home
         </Link>
      </div>
   );
};

export default Unauthorized;
