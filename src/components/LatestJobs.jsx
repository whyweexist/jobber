import React, { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { setsearchQuery } from "@/store/jobSlice";

function LatestJobs() {
  const { allJobs } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      // dispatch(setsearchQuery(""));
    };
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="text-2xl md:text-4xl font-bold">
          <span className="text-purple-700">Latest And Top</span> Job Openings
        </h1>
      </div>
      <div className="grid w-[90%] mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5">
        {allJobs?.length !== 0 ? (
          allJobs.slice(0, 6).map((job) => <Card key={job._id} job={job} />)
        ) : (
          <div className="font-bold ">No jobs found</div>
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
