import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../utils/hooks";
import { fetchUserProfile } from "../../store/authSlice";

const AuthSuccess: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const action = searchParams.get("action") || "login";
  const status = searchParams.get("status");
  const redirectTo = action === "link" ? "/profile" : "/dashboard";

  useEffect(() => {
    // If status is not success, redirect to failure page
    if (status && status !== "success") {
      navigate("/auth/failure", {
        replace: true,
        state: { error: "Authentication failed" },
      });
      return;
    }

    const completeAuth = async () => {
      try {
        // Update the user profile in store
        await dispatch(fetchUserProfile()).unwrap();

        // Redirect after a short delay to show success message
        setTimeout(() => {
          navigate(redirectTo, { replace: true });
        }, 1500);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user profile");
        // If fetching user profile fails, redirect to failure page after a delay
        setTimeout(() => {
          navigate("/auth/failure", {
            replace: true,
            state: { error: "Failed to complete authentication" },
          });
        }, 1500);
      }
    };

    completeAuth();
  }, [dispatch, navigate, redirectTo, status]);

  if (error) {
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Authentication Error
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-gray-600">Redirecting you shortly...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <div className="mb-4 text-green-500">
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Authentication Successful
        </h2>
        <p className="text-gray-600 mb-4">
          {action === "link"
            ? "Your account has been successfully linked."
            : "You have been successfully authenticated."}
        </p>
        <p className="text-gray-600">You will be redirected shortly...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;
