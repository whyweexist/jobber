import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setsearchQuery } from "@/store/jobSlice";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Mobile Developer",
  "UI/UX Designer",
  "Quality Assurance Engineer",
  "Project Manager",
  "Product Manager",
  "Technical Support Specialist",
  "Cybersecurity Analyst",
  "System Administrator",
  "Database Administrator",
  "Business Analyst",
  "Cloud Engineer",
  "Network Engineer",
  "Software Architect",
  "Game Developer",
  "Embedded Systems Engineer",
];

function CategoryCaresoul() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSearchHandle = (q) => {
    dispatch(setsearchQuery(q));
    navigate("/browse");
  };
  return (
    <div className="w-full max-w-xl mx-auto my-20">
      <Carousel className="relative">
        <CarouselContent className="flex snap-x snap-mandatory">
          {categories.map((cat, idx) => {
            return (
              <CarouselItem
                key={idx}
                className="flex-shrink-0 snap-center basis-1/2 mx-2 md:basis-1/2 lg:basis-1/2"
              >
                <Button
                  onClick={() => onSearchHandle(cat)}
                  variant="outline"
                  className="rounded-full  "
                >
                  {cat}
                </Button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-lg cursor-pointer">
          &lt;
        </CarouselPrevious>
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-lg cursor-pointer">
          &gt;
        </CarouselNext>
      </Carousel>
    </div>
  );
}

export default CategoryCaresoul;
