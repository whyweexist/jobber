import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

function AppliedJobTable({ jobs }) {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption>List of all applied jobs</TableCaption>
        <TableHeader>
          <TableHead>Date</TableHead>
          <TableHead>Job Role</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableHeader>
        <TableBody>
          {jobs?.map((job, idx) => (
            <TableRow key={idx}>
              <TableCell>{job?.job?.createdAt?.slice(0, 10)}</TableCell>
              <TableCell>{job?.job?.title}</TableCell>
              <TableCell>{job?.job?.Company?.name}</TableCell>
              <TableCell className="text-right">
                <Badge
                  className={`${
                    job?.status === "accepted"
                      ? "bg-green-500 text-white"
                      : job?.status === "rejected"
                      ? "bg-red-500 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {job?.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable;
