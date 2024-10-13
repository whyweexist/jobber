import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "companies",
  initialState: {
    loading: false,
    companies: [],
    singleCompany: null,
  },
  reducers: {
    setCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setSliceCompanies: (state, action) => {
      state.companies = action.payload;
    },
  },
});

export const { setCompany, setSliceCompanies } = companySlice.actions;
export default companySlice.reducer;
