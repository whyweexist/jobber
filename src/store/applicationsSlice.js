import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "applicants",
  initialState: {
    loading: false,
    applications: [],
  },
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
  },
});

export const { setApplications } = applicationSlice.actions;
export default applicationSlice.reducer;
