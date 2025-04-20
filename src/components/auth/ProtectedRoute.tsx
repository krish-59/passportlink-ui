import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { fetchUserProfile } from "../../store/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuthenticated, isLoading, user } = useAppSelector(
    (state) => state.auth
  );
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!user) {
          await dispatch(fetchUserProfile()).unwrap();
        }
      } catch {
        // Auth check failed, will be redirected to login
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [dispatch, user]);

  if (isCheckingAuth || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
