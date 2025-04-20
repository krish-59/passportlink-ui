import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService, { User, Provider } from "../services/authService";

interface AuthState {
  user: User | null;
  providers: Provider[];
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  providers: [],
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getUser();
      return user;
    } catch {
      return rejectWithValue("Failed to fetch user profile");
    }
  }
);

export const fetchProviders = createAsyncThunk(
  "auth/fetchProviders",
  async (_, { rejectWithValue }) => {
    try {
      const providers = await authService.getProviders();
      return providers;
    } catch (error) {
      console.error("Error fetching providers:", error);
      return rejectWithValue("Failed to fetch providers");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return true;
    } catch {
      return rejectWithValue("Failed to logout");
    }
  }
);

export const unlinkProvider = createAsyncThunk(
  "auth/unlinkProvider",
  async (providerId: string, { rejectWithValue, dispatch }) => {
    try {
      await authService.unlinkProvider(providerId);
      // Refresh user profile to get updated linked providers
      dispatch(fetchUserProfile());
      return providerId;
    } catch {
      return rejectWithValue("Failed to unlink provider");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUserProfile
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // fetchProviders
      .addCase(fetchProviders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.providers = action.payload;
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, setAuthLoading, clearAuthError } = authSlice.actions;

export default authSlice.reducer;
