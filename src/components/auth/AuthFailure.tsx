import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const AuthFailure: React.FC = () => {
  const [searchParams] = useSearchParams();
  const error =
    searchParams.get("error") ||
    "An unknown error occurred during authentication.";
  const action = searchParams.get("action") || "login";
  const returnUrl = action === "link" ? "/profile" : "/login";
  const returnText =
    action === "link" ? "Return to Profile" : "Return to Login";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <div className="mb-4 text-red-500">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Authentication Failed
        </h2>
        <p className="text-gray-600 mb-6">{error}</p>

        <div className="flex flex-col space-y-2">
          {action === "login" && (
            <Link
              to="/signup"
              className="py-2 px-4 bg-secondary text-white rounded hover:bg-secondary-dark transition-colors"
            >
              Create Account
            </Link>
          )}

          <Link
            to={returnUrl}
            className="py-2 px-4 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
          >
            {returnText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthFailure;
