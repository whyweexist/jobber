import { setJob } from "@/store/jobSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function jobDescription({ URL }) {
  const { jobId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const job = useSelector((state) => state.job.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isApplied =
    job?.applications?.some(
      (application) => application.applicant === user?.id
    ) || false;
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const getSingleJob = async () => {
      try {
        const res = await axios.get(`${URL}/job/get/job/${jobId}`);
        if (res.data.success) {
          dispatch(setJob(res.data.job));
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };

    getSingleJob();
  }, [applied]);

  const applyJobHandler = async () => {
    if (user) {
      try {
        const res = await axios.get(`${URL}/application/applyjob/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setApplied(!applied);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      navigate("/login");
      toast.error("you have to login first");
    }
  };

  const demojob = {
    title: "Frontend Developer",
    description:
      "We are looking for a skilled frontend developer to join our team.",
    requirements: ["React", "Tailwind CSS", "JavaScript"],
    salary: 60000,
    location: "New York, NY",
    jobType: "Full-time",
    position: "Senior",
    experience: "3+ years",
    Company: "Tech Innovators",
    created_by: "Admin",
  };

  if (!job) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#7e22ce]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative p-8">
          {/* Apply Button */}
          <div className="absolute top-4 right-4">
            <button
              disabled={isApplied}
              onClick={applyJobHandler}
              className={`${
                isApplied ? "bg-gray-500 hover:bg-gray-500" : "bg-blue-500"
              } text-white py-2 px-4 rounded shadow-md hover:bg-blue-600 cursor-pointer`}
            >
              {isApplied ? "Applied" : "Apply Now"}
            </button>
          </div>
          {/* Job Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            {job?.title}{" "}
            <span className="ml-2 text-blue-500">
              <i className="fas fa-briefcase"></i>
            </span>
          </h1>
          {/* Job Description */}
          <p className="text-gray-700 mb-6">{job?.description}</p>

          {/* Job Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                Requirements{" "}
                <span className="ml-2 text-blue-500">
                  <i className="fas fa-list-ul"></i>
                </span>
              </h2>
              <ul className="list-disc list-inside text-gray-700 ml-4 mt-2">
                {job?.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                Salary{" "}
                <span className="ml-2 text-blue-500">
                  <i className="fas fa-dollar-sign"></i>
                </span>
              </h2>
              <p className="text-gray-700 mt-2">
                ${job?.salary.toLocaleString()}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                Location{" "}
                <span className="ml-2 text-blue-500">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
              </h2>
              <p className="text-gray-700 mt-2">{job?.location}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                Job Type{" "}
                <span className="ml-2 text-blue-500">
                  <i className="fas fa-clock"></i>
                </span>
              </h2>
              <p className="text-gray-700 mt-2">{job?.jobType}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                Position{" "}
                <span className="ml-2 text-blue-500">
                  <i className="fas fa-user-tie"></i>
                </span>
              </h2>
              <p className="text-gray-700 mt-2">{job?.position}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                Experience{" "}
                <span className="ml-2 text-blue-500">
                  <i className="fas fa-briefcase"></i>
                </span>
              </h2>
              <p className="text-gray-700 mt-2">{job?.experience}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                Company{" "}
                <span className="ml-2 text-blue-500">
                  <i className="fas fa-building"></i>
                </span>
              </h2>
              <p className="text-gray-700 mt-2">{job?.Company?.name}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                Applicants{" "}
                <span className="ml-2 text-blue-500">
                  <i className="fas fa-building"></i>
                </span>
              </h2>
              <p className="text-gray-700 mt-2">{job?.applications?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default jobDescription;
