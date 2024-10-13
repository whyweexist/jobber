import React, { useDebugValue, useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import useGetQueriedJobs from "@/hooks/useGetQueriedJobs";
import { setsearchQuery } from "@/store/jobSlice";

function Jobs({ URL }) {
  useGetQueriedJobs(URL);
  const { queryjobs } = useSelector((state) => state.job);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilterCard = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setsearchQuery(""));
  }, []);

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:hidden">
            <button
              onClick={toggleFilterCard}
              className="p-2 bg-gray-200 rounded-md"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="md:w-1/4 lg:w-1/5">
            <FilterCard isOpen={isFilterOpen} onClose={toggleFilterCard} />
          </div>
          <div className="flex-1 pb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {queryjobs?.length !== 0 ? (
                queryjobs.map((job) => (
                  <Card className="h-[250px]" job={job} key={job.id} />
                ))
              ) : (
                <div className="font-bold">No jobs found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
