import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import AdminJobsTable from "./AdminJobsTable";
import CreateAndEditAdminJobs from "./CreateAndEditAdminJobs";
import { useNavigate } from "react-router-dom";

function AdminJobs({ URL }) {
  const [jobs, setjobs] = useState([]);
  const [change, setChange] = useState(false);
  const [loader, setLoader] = useState(false);
  const [filterJobs, setFilterJobs] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const res = await axios.get(`${URL}/job/get/adminjobs`, {
          withCredentials: true,
        });
        if (res.data?.success) {
          setjobs(res.data.jobs);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    })();
  }, [change]);
  return (
    <div className="max-w-6xl mx-auto my-10 min-h-[60vh]">
      <div className="flex items-center justify-between">
        <Input
          onChange={(e) => setFilterJobs(e.target.value)}
          className="w-fit"
          value={filterJobs}
          placeholder="Filter by name , role"
        />
        <Button onClick={() => navigate("/admin/jobs/create")}>
          Create New job
        </Button>
      </div>
      {loader ? (
        <div className="w-[60vw] mx-auto items-center justify-center flex h-[60vh]">
          <Loader2 className="animate-spin w-[70px] text-gray-400 h-[70px]" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="w-[60vw] mx-auto items-center justify-center flex h-[60vh]">
          No Jobs exist. Go ahead to create one
        </div>
      ) : (
        <AdminJobsTable
          setChange={setChange}
          change={change}
          jobs={jobs}
          URL={URL}
          filter={filterJobs}
        />
      )}
    </div>
  );
}

export default AdminJobs;
