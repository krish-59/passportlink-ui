import React, { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import UserProfile from "../components/profile/UserProfile";
import LinkedAccounts from "../components/profile/LinkedAccounts";
import AccountLinking from "../components/profile/AccountLinking";
import { useAppDispatch } from "../utils/hooks";
import { fetchProviders } from "../store/authSlice";

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLinking, setIsLinking] = useState(false);

  const handleStartLinking = () => {
    dispatch(fetchProviders()); // Make sure we have the latest providers
    setIsLinking(true);
  };

  const handleCancelLinking = () => {
    setIsLinking(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>

        <div className="grid grid-cols-1 gap-6">
          <UserProfile />

          {isLinking ? (
            <AccountLinking onCancel={handleCancelLinking} />
          ) : (
            <LinkedAccounts onLinkNew={handleStartLinking} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
