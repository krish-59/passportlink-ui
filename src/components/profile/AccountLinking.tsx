import React from "react";
import { useAppSelector } from "../../utils/hooks";
import authService from "../../services/authService";

interface AccountLinkingProps {
  onCancel: () => void;
}

const AccountLinking: React.FC<AccountLinkingProps> = ({ onCancel }) => {
  const { providers, user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  const linkedProviderIds = user.linkedProviders || [];
  const availableProviders = providers.filter(
    (provider) => !linkedProviderIds.includes(provider.id)
  );

  const handleLinkProvider = (providerId: string) => {
    authService.linkProvider(providerId);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Link New Account
        </h2>
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>

      {availableProviders.length === 0 ? (
        <p className="text-gray-600">
          You have already linked all available providers.
        </p>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">
            Select a provider to link with your account:
          </p>

          {availableProviders.map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleLinkProvider(provider.id)}
              className="flex items-center justify-center space-x-2 w-full p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium">{provider.displayName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountLinking;
