import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Loader2, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import EditProfilePopUp from "./EditProfilePopUp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useGetProfile from "@/hooks/useGetProfile";

function Profile({ URL }) {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const { id } = useParams();
  useGetProfile(URL, id);
  const profile = useSelector((store) => store.job.profile);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${URL}/job/get/appliedjobs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setAppliedJobs(res.data.appliedJobs);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [URL]);

  return (
    <div
      className={`mx-auto ${
        user && user.role === "recruiter" ? "min-h-[60vh]" : ""
      } px-4 sm:px-6 lg:px-8`}
    >
      <EditProfilePopUp open={open} setOpen={setOpen} URL={URL} />
      <div className="bg-white border border-gray-200 my-5 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
          {console.log(profile)}
          <div className="flex-shrink-0">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
              <AvatarImage
                className="mt-[4px]"
                src={
                  profile?.profile?.profilePhoto?.url
                    ? profile.profile.profilePhoto.url
                    : "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-260nw-2281862025.jpg"
                }
              />
            </Avatar>
          </div>
          <div className="flex-grow">
            <h1 className="font-medium text-center md:text-left text-xl sm:text-2xl">
              {profile?.fullName}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {profile?.profile?.bio}
            </p>
          </div>
          <div className="text-right">
            {profile?.id === user?.id ? (
              <Button onClick={() => setOpen(!open)} variant="outline">
                <Pen />
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span className="text-sm">{profile?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span className="text-sm">{profile?.phoneNumber}</span>
          </div>
        </div>
        {profile && profile.role === "student" ? (
          <>
            <div className="mt-6">
              <h1 className="font-bold text-lg sm:text-xl">Skills</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile?.profile.skills.map((skill, idx) => (
                  <Badge key={idx}>{skill}</Badge>
                ))}
              </div>
            </div>
            <div className="grid w-full max-w-sm mt-4 items-center gap-1.5">
              <Label className="text-md font-bold">Resume</Label>
              <a
                href={profile?.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Click here for Resume
              </a>
            </div>
          </>
        ) : null}
      </div>
      {profile && profile.id === user?.id && profile.role === "student" ? (
        <div className="my-8">
          <h1 className="font-bold text-lg sm:text-xl text-center">
            All Applied Jobs
          </h1>
          {appliedJobs.length > 0 ? (
            <AppliedJobTable jobs={appliedJobs} />
          ) : (
            <p className="text-center">No jobs applied yet.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
