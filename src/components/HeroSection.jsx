import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setsearchQuery } from "@/store/jobSlice";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.job);
  const navigate = useNavigate();

  const onSearchHandle = () => {
    console.log(searchQuery);
    navigate("/browse");
  };

  return (
    <div className="text-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-red-500 font-medium text-sm sm:text-base lg:text-lg">
          No.1 job hunt website
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Search, Apply and <br />
          get your <span className="text-purple-700">dream jobs</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mx-auto max-w-3xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora minus
          ex voluptates accusamus repudiandae.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center w-full sm:max-w-4xl mx-auto">
          <div className="relative w-full sm:w-auto">
            <input
              onChange={(e) => dispatch(setsearchQuery(e.target.value))}
              type="text"
              placeholder="Find your dream jobs"
              className="outline-none border border-gray-200 w-full rounded-full px-4 py-2 pr-16"
            />
            <Button
              className="absolute right-0 top-[1px] bottom-0  rounded-r-full py-2 px-4 bg-purple-700 text-white"
              onClick={onSearchHandle}
            >
              <Search />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
