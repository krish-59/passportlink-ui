import React from "react";
import { useAppSelector } from "../utils/hooks";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const DashboardPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>

          {user ? (
            <div className="p-4 border border-gray-200 rounded-md">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Welcome, {user.displayName || user.email}!
              </h2>
              <p className="text-gray-600 mb-4">
                You are successfully authenticated with PassportLink.
              </p>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-md font-medium text-gray-700 mb-2">
                  Your Account Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-700">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ID</p>
                    <p className="text-gray-700">{user.id}</p>
                  </div>
                  {user.username && (
                    <div>
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="text-gray-700">{user.username}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Linked Providers</p>
                    <p className="text-gray-700">
                      {user.linkedProviders.length > 0
                        ? user.linkedProviders.join(", ")
                        : "No linked providers"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
