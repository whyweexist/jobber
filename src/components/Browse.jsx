import React from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import useGetQueriedJobs from "@/hooks/useGetQueriedJobs";
import { Input } from "./ui/input";
import { setsearchQuery } from "@/store/jobSlice";

function Browse({ URL }) {
  useGetQueriedJobs(URL);
  const { queryjobs } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="max-w-7xl mx-auto my-10 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <Input
            onChange={(e) => dispatch(setsearchQuery(e.target.value))}
            className="w-full md:w-1/3 lg:w-1/4"
            placeholder="Search"
          />
        </div>
        <h1 className="font-bold text-xl mb-8">
          Search results ({queryjobs.length})
        </h1>
        {queryjobs?.length === 0 ? (
          <p className="text-center text-lg">No results found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {queryjobs.map((job) => (
              <Card key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Browse;
