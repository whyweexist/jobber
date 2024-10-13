import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

function Card({ job }) {
  const navigate = useNavigate();

  const timeFunc = (mongotime) => {
    const createAt = new Date(mongotime);
    const currTime = new Date();
    let difference = currTime - createAt;
    const days = Math.floor(difference / (1000 * 24 * 60 * 60));
    return days;
  };

  return (
    <div className="max-w-md w-[80vw] sm:w-[40vw] md:w-[22vw] mx-auto rounded-md shadow-xl bg-white border border-gray-100 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {timeFunc(job?.createdAt) === 0
            ? "Today"
            : `${timeFunc(job?.createdAt)}days ago`}
        </p>
      </div>

      <div className="flex items-center mt-4">
        <Button
          variant="outline"
          className="rounded-full overflow-hidden"
          size="icon"
        >
          <Avatar className="w-fit">
            <AvatarImage
              className="rounded-full overflow-hidden"
              src={
                job?.Company?.logo?.url
                  ? job?.Company?.logo?.url
                  : "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-260nw-2281862025.jpg"
              }
            />
          </Avatar>
        </Button>
        <div className="ml-4">
          <h1 className="font-medium text-lg">{job?.Company.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position}
        </Badge>
        <Badge className="text-[#f83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <Button
          onClick={() => navigate(`/job/${job?._id}`)}
          variant="outline"
          className="w-full md:w-auto "
        >
          Details
        </Button>
      </div>
    </div>
  );
}

export default Card;
