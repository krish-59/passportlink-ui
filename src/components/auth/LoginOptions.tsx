import React, { useEffect } from "react";
import ProviderButton from "./ProviderButton";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { fetchProviders } from "../../store/authSlice";
import authService from "../../services/authService";

const LoginOptions: React.FC = () => {
  const dispatch = useAppDispatch();
  const { providers, isLoading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  const handleProviderLogin = (providerId: string) => {
    authService.loginWithProvider(providerId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p>Failed to load providers. Please try again later.</p>
        <button
          onClick={() => dispatch(fetchProviders())}
          className="mt-2 text-primary hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto px-4">
      {/* <div className="relative py-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600/20"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-4 bg-white text-gray-500">Or continue with</span>
        </div>
      </div> */}

      <div className="space-y-3">
        {Array.isArray(providers) && providers.length > 0 ? (
          providers.map((provider) => (
            <ProviderButton
              key={provider.id}
              provider={provider}
              onClick={handleProviderLogin}
            />
          ))
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500">
              No authentication providers available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginOptions;
