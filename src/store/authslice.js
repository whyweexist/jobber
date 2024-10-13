import { createSlice } from "@reduxjs/toolkit";

const URL = String(import.meta.env.VITE_URL);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLoading, setUser, updateProfile } = authSlice.actions;
export default authSlice.reducer;
