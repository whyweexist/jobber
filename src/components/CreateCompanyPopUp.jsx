import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCompany } from "@/store/companySlice";
import { useNavigate } from "react-router-dom";

function CreateCompanyPopUp({ open, setOpen, URL, data, change, setChange }) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editInput, setInput] = useState({});
  const url = URL;

  useEffect(() => {
    if (data) {
      setInput({
        name: data.name,
        description: data.description ? data.description : "",
        website: data.website ? data.website : "",
        location: data.location ? data.location : "",
      });
    } else {
      setInput({
        name: "",
        description: "",
        website: "",
        location: "",
      });
    }
  }, []);

  const onChangeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      !editInput.name ||
      !editInput.description ||
      !editInput.website ||
      !editInput.location
    ) {
      return toast.error("all fields are required");
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("companyName", editInput.name);
      formData.append("description", editInput.description);
      formData.append("website", editInput.website);
      formData.append("location", editInput.location);
      if (image) {
        formData.append("file", image);
      }

      if (!data) {
        const res = await axios.post(`${url}/company/register`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        if (res?.data?.success) {
          setInput({
            name: "",
            description: "",
            website: "",
            location: "",
          });
          setImage(false);
          dispatch(setCompany(res.data.company));
          setOpen(false);
          navigate(`/admin/companies`);
          toast.success(res?.data?.message);
        }
      } else {
        const res = await axios.patch(
          `${url}/company/update/${data?._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setInput({
            name: "",
            description: "",
            website: "",
            location: "",
          });
          setImage(false);
          setOpen(false);
          setChange(!change);
          toast.success("Company updated successfully");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Dialog open={open} close={() => setOpen(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Register Company</DialogTitle>
            <DialogDescription>
              Register your company to post job vaccancies from that company
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Company name
              </Label>
              <Input
                required={true}
                name="name"
                onChange={onChangeHandler}
                defaultValue={editInput.name}
                id="name"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <textarea
                required={true}
                type="textarea"
                name="description"
                onChange={onChangeHandler}
                defaultValue={editInput.description}
                id="Bio"
                className="col-span-3 border border-[#e2e8f0]"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="website" className="text-right">
                website
              </Label>
              <Input
                id="website"
                name="website"
                onChange={onChangeHandler}
                defaultValue={editInput.website}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                location
              </Label>
              <Input
                id="location"
                name="location"
                onChange={onChangeHandler}
                defaultValue={editInput.location}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Company logo (optional)
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
                onClick={onSubmitHandler}
                type="submit"
                className="w-full my-4 bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300"
              >
                {data ? "update" : "Register"}
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

export default CreateCompanyPopUp;
