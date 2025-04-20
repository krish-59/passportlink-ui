import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../utils/hooks";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome to PassportLink
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A secure and flexible OAuth-based authentication solution for modern
            web applications.
          </p>

          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-white text-primary border border-primary rounded-md hover:bg-gray-50 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Multiple Providers
            </h2>
            <p className="text-gray-600">
              Support for multiple OAuth providers including Google, GitHub,
              Facebook, and more.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Account Linking
            </h2>
            <p className="text-gray-600">
              Link multiple social accounts to a single user profile for
              enhanced flexibility.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Secure Authentication
            </h2>
            <p className="text-gray-600">
              Enterprise-grade security with industry-standard OAuth 2.0 and
              OpenID Connect.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
