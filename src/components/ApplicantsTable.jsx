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
import { MoreHorizontal } from "lucide-react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { setApplications } from "@/store/applicationsSlice";
import useStatusHandler from "@/hooks/useStatusHandler";

const status = ["Accepted", "Rejected"];

function ApplicantsTable({ URL }) {
  const { applications } = useSelector((state) => state.applications);
  const { jobId } = useParams();
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(`${URL}/application/applicant/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setApplications(res.data.job.applications));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicants();
  }, [change]);

  return (
    <div>
      <div>
        <Table>
          <TableCaption>
            List of all applications your job post received
          </TableCaption>
          <TableHeader>
            <TableHead className="text-center">Full name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableHeader>
          <TableBody>
            {applications?.map((application) => {
              return (
                <TableRow>
                  <TableCell className="font-bold text-center">
                    <Link
                      to={`/profile/${application?.applicant?._id}`}
                      className="cursor-pointer"
                    >
                      <Avatar className="h-10 w-10 mx-auto">
                        <AvatarImage
                          className="mt-[4px]"
                          src={
                            application?.applicant?.profile.profilePhoto?.url
                              ? application?.applicant?.profile.profilePhoto
                                  ?.url
                              : "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-260nw-2281862025.jpg"
                          }
                        />
                      </Avatar>
                    </Link>
                    {application?.applicant?.fullName}
                  </TableCell>
                  <TableCell>{application?.applicant?.email}</TableCell>
                  <TableCell>{application?.applicant?.phoneNumber}</TableCell>
                  <TableCell className="text-blue-500 cursor-pointer">
                    <a
                      target="_blank"
                      href={application?.applicant?.profile?.resume}
                    >
                      Resume Link
                    </a>
                  </TableCell>
                  <TableCell>{application?.createdAt?.slice(0, 10)}</TableCell>
                  <TableCell className="cursor-pointer text-right">
                    <select
                      onChange={(e) =>
                        useStatusHandler(
                          URL,
                          e.target.value,
                          application._id,
                          change,
                          setChange
                        )
                      }
                      className="block w-full p-2 font-bold bg-white border border-[#e2e8f0] rounded-md"
                      value={application.status}
                    >
                      <option value={"pending"}>pending</option>
                      <option value={"accepted"}>accepted</option>
                      <option value={"rejected"}>rejected</option>
                    </select>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ApplicantsTable;
