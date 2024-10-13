import { configureStore } from "@reduxjs/toolkit";
import authslice from "./authslice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationsSlice from "./applicationsSlice";

const store = configureStore({
  reducer: {
    auth: authslice,
    job: jobSlice,
    companies: companySlice,
    applications: applicationsSlice,
  },
});

export default store;
