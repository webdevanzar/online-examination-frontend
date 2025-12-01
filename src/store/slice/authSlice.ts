import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
  dob: string;
  gender: string;
  selfieVideo: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  unreadNotificationCount: number;
}

const initialState: AuthState = {
  isAuthenticated: false,
  id: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  profileImage: undefined,
  dob: "",
  gender: "",
  selfieVideo: "",
  isActive: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  unreadNotificationCount: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<AuthState>
    ) => {
      const user = action.payload;
      state.isAuthenticated = true;
      state.id = user.id;
      state.fullName = user.fullName;
      state.email = user.email;
      state.phoneNumber = user.phoneNumber;
      state.profileImage = user.profileImage ?? "";
      state.isActive = user.isActive;
      state.dob = user.dob;
      state.gender = user.gender;
      state.selfieVideo = user.selfieVideo;
      state.createdAt = new Date(user.createdAt ?? new Date());
      state.updatedAt = new Date(user.updatedAt ?? new Date());
      state.unreadNotificationCount = user.unreadNotificationCount;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.id = "";
      state.fullName = "";
      state.email = "";
      state.phoneNumber = "";
      state.profileImage = undefined;
      state.dob = "";
      state.gender = "";
      state.selfieVideo = "";
      state.isActive = false;
      state.createdAt = new Date();
      state.updatedAt = new Date();
      state.unreadNotificationCount = 0;
    },
    updateProfile: (state, action: PayloadAction<Partial<AuthState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export default authSlice.reducer;
export const { loginSuccess, logoutSuccess, updateProfile } = authSlice.actions;
