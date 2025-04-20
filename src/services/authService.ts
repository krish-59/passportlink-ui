import apiClient from "../utils/apiClient";

export interface Provider {
  id: string;
  name: string;
  displayName: string;
  icon: string;
}

export interface User {
  id: string;
  email: string;
  username?: string;
  displayName?: string;
  linkedProviders: string[];
}

export const authService = {
  // Get available authentication providers
  getProviders: async (): Promise<Provider[]> => {
    const response = await apiClient.get("/auth/providers");
    const providerIds = response.data.providers || [];

    // Transform provider IDs into Provider objects
    return providerIds.map((id: string) => ({
      id,
      name: id,
      displayName: id.charAt(0).toUpperCase() + id.slice(1), // Capitalize first letter
      icon: id, // The icon name matches the provider name in the ProviderButton component
    }));
  },

  // Get current user profile
  getUser: async (): Promise<User> => {
    const response = await apiClient.get("/auth/user");
    return response.data;
  },

  // Start OAuth flow with a provider
  loginWithProvider: (providerId: string): void => {
    // Use the apiClient's baseURL to ensure consistent URL handling
    window.location.href = apiClient.defaults.baseURL + `/auth/${providerId}`;
  },

  // Link account with a provider
  linkProvider: (providerId: string): void => {
    // Use the apiClient's baseURL to ensure consistent URL handling
    window.location.href =
      apiClient.defaults.baseURL + `/auth/link/${providerId}`;
  },

  // Unlink account from a provider
  unlinkProvider: async (providerId: string): Promise<void> => {
    await apiClient.get(`/auth/unlink/${providerId}`);
  },

  // Logout user
  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  // Check if user is authenticated
  isAuthenticated: async (): Promise<boolean> => {
    try {
      await authService.getUser();
      return true;
    } catch {
      return false;
    }
  },
};

export default authService;
