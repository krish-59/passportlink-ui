import React from "react";
import { useAppSelector } from "../../utils/hooks";

const UserProfile: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">User Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Email
          </label>
          <div className="text-gray-800 font-medium">{user.email}</div>
        </div>

        {user.username && (
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Username
            </label>
            <div className="text-gray-800 font-medium">{user.username}</div>
          </div>
        )}

        {user.displayName && (
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Display Name
            </label>
            <div className="text-gray-800 font-medium">{user.displayName}</div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            User ID
          </label>
          <div className="text-gray-800 font-medium">{user.id}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
