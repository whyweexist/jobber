import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/store/authslice";
import { toast } from "sonner";

function EditProfilePopUp({ open, setOpen, URL }) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [editInput, setInput] = useState({
    fullName: user?.fullName,
    email: user?.email,
    bio: user?.profile?.bio,
    phoneNumber: user?.phoneNumber,
    skills: user?.profile?.skill?.map((s) => s),
    resume: user?.profile?.resume,
  });

  useEffect(() => {
    setInput({
      fullName: user?.fullName,
      email: user?.email,
      bio: user?.profile?.bio,
      phoneNumber: user?.phoneNumber,
      skills: user?.profile?.skills?.map((s) => s),
      resume: user?.profile?.resume,
    });
  }, [open, user]);

  const onChangeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("fullName", editInput.fullName);
    formData.append("email", editInput.email);
    formData.append("phoneNumber", editInput.phoneNumber);
    formData.append("bio", editInput.bio);
    if (user && user.role === "student") {
      formData.append("skills", editInput.skills);
      formData.append("resume", editInput.resume);
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.patch(`${URL}/user/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        setOpen(false);
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      // toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {" "}
      <Dialog open={open} close={() => setOpen(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                name="fullName"
                onChange={onChangeHandler}
                defaultValue={editInput.fullName}
                id="name"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Bio" className="text-right">
                Bio
              </Label>
              <Input
                name="bio"
                onChange={onChangeHandler}
                defaultValue={editInput.bio}
                id="Bio"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                email
              </Label>
              <Input
                id="email"
                name="email"
                onChange={onChangeHandler}
                defaultValue={editInput.email}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                phoneNumber
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                onChange={onChangeHandler}
                defaultValue={editInput.phoneNumber}
                className="col-span-3"
              />
            </div>
            {user && user.role === "student" ? (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  onChange={onChangeHandler}
                  defaultValue={editInput.skills || ""}
                  className="col-span-3"
                />
              </div>
            ) : (
              ""
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Profile Photo
              </Label>
              <Input
                type="file"
                id="file"
                name="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                className="col-span-3 cursor-pointer"
              />
            </div>
            {user && user.role === "student" ? (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="resume" className="text-right">
                  Resume Link
                </Label>
                <Input
                  id="resume"
                  name="resume"
                  onChange={onChangeHandler}
                  defaultValue={editInput.resume || ""}
                  className="col-span-3"
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <DialogFooter>
            {loading ? (
              <Button
                disabled
                type="submit"
                className="w-full my-4 bg-gray-400 text-white flex items-center justify-center"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full my-4 bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300"
                onClick={onSubmitHandler}
              >
                Update
              </Button>
            )}
          </DialogFooter>
          <div
            onClick={() => setOpen(false)}
            className="cross-icon-dialog"
          ></div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditProfilePopUp;
