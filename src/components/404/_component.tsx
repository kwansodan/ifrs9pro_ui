import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold text-red-600">404</h1>
        <p className="text-lg text-gray-700">Oops! Page not found.</p>
        <Link to="/" className="mt-4 text-blue-500 hover:underline">
          Go back to Home
        </Link>
      </div>
    </>
  );
}

export default NotFound;
