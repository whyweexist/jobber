import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import CategoryCaresoul from "./CategoryCaresoul";
import LatestJobs from "./LatestJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home({ URL }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <>
      <HeroSection />
      <CategoryCaresoul />
      <LatestJobs />
    </>
  );
}

export default Home;
