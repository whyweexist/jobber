import React from "react";
import ApplicantsTable from "./ApplicantsTable";
import { useSelector } from "react-redux";

function Applicants({ URL }) {
  const { applications } = useSelector((state) => state.applications);

  return (
    <div className="max-w-[80vw] mx-auto min-h-[70vh]">
      <h1 className="font-bold text-3xl my-4">
        Applicants {applications.length}
      </h1>
      <ApplicantsTable URL={URL} />
    </div>
  );
}

export default Applicants;
