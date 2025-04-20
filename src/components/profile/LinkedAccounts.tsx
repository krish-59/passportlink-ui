import React from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { unlinkProvider } from "../../store/authSlice";

interface LinkedAccountsProps {
  onLinkNew: () => void;
}

const LinkedAccounts: React.FC<LinkedAccountsProps> = ({ onLinkNew }) => {
  const dispatch = useAppDispatch();
  const { user, providers, isLoading } = useAppSelector((state) => state.auth);

  if (!user) return null;

  const linkedProviderIds = user.linkedProviders || [];

  const handleUnlink = async (providerId: string) => {
    // Check if this is the last linked provider
    if (linkedProviderIds.length <= 1) {
      alert(
        "Cannot unlink the last provider. You need at least one authentication method."
      );
      return;
    }

    if (window.confirm("Are you sure you want to unlink this provider?")) {
      try {
        await dispatch(unlinkProvider(providerId)).unwrap();
      } catch (error) {
        console.error("Failed to unlink provider", error);
      }
    }
  };

  const getProviderName = (providerId: string) => {
    const provider = providers.find((p) => p.id === providerId);
    return provider ? provider.displayName : providerId;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Linked Accounts</h2>
        <button
          onClick={onLinkNew}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
          Link New Account
        </button>
      </div>

      {linkedProviderIds.length === 0 ? (
        <p className="text-gray-600">You have no linked accounts.</p>
      ) : (
        <div className="space-y-4">
          {linkedProviderIds.map((providerId) => (
            <div
              key={providerId}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-md"
            >
              <div className="flex items-center">
                <span className="text-gray-800 font-medium">
                  {getProviderName(providerId)}
                </span>
              </div>
              <button
                onClick={() => handleUnlink(providerId)}
                className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors"
                disabled={linkedProviderIds.length <= 1}
              >
                Unlink
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkedAccounts;
