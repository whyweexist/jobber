import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminJobsTable({ jobs, URL, filter }) {
  const [open, setOpen] = useState(false);
  const [filteredjobs, setFilteredjobs] = useState(jobs);
  const navigate = useNavigate();
  useEffect(() => {
    const filteredJobs =
      jobs.length > 0 &&
      jobs.filter((job) => {
        if (!filter) {
          return true;
        }
        return job?.title?.toLowerCase().includes(filter.toLowerCase());
      });
    setFilteredjobs(filteredJobs);
  }, [filter]);
  return (
    <div >
      <Table>
        <TableCaption>List of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableHead>Company name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>date</TableHead>
          <TableHead className="text-right">action</TableHead>
        </TableHeader>
        <TableBody>
          {filteredjobs.map((job, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell>{job?.Company?.name}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.createdAt?.slice(0, 10)}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-35">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 w-full cursor-pointer"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
