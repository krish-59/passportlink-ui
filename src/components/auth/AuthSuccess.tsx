import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../utils/hooks";
import { fetchUserProfile } from "../../store/authSlice";

const AuthSuccess: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action") || "login";
  const redirectTo = action === "link" ? "/profile" : "/dashboard";

  useEffect(() => {
    const completeAuth = async () => {
      try {
        // Update the user profile in store
        await dispatch(fetchUserProfile()).unwrap();

        // Redirect after a short delay to show success message
        setTimeout(() => {
          navigate(redirectTo, { replace: true });
        }, 1500);
      } catch {
        // If fetching user profile fails, redirect to login
        navigate("/login", { replace: true });
      }
    };

    completeAuth();
  }, [dispatch, navigate, redirectTo]);

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
