import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    job: null,
    queryjobs: [],
    profile: {},
    searchQuery: "",
  },

  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setJob: (state, action) => {
      state.job = action.payload;
    },
    setsearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setqueryjobs: (state, action) => {
      state.queryjobs = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setAllJobs, setJob,setProfile, setsearchQuery,setqueryjobs } = jobSlice.actions;
export default jobSlice.reducer;
