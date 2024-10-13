import { setqueryjobs } from "@/store/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetQueriedJobs(URL) {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.job);
  const query = searchQuery.replaceAll(" ", "+");
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${URL}/job/get?keyword=${query}`);
        console.log(query);
        if (res.data.success) {
          dispatch(setqueryjobs(res.data.jobs));
        }
      } catch (error) {
        dispatch(setqueryjobs([]));
      }
    };
    fetchAllJobs();
  }, [query]);
}

export default useGetQueriedJobs;
