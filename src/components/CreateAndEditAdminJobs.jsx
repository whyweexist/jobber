import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function CreateAndEditAdminJobs({ URL }) {
  const companies = useSelector((state) => state.companies.companies);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    jobType: "",
    experience: "",
    position: 0,
    location: "",
    companyId: "",
  });
  const navigate = useNavigate();

  const onChangeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectHandler = (val) => {
    const selectedComp = companies.find(
      (company) => company.name.toLowerCase() === val
    );
    setInput({ ...input, companyId: selectedComp._id });
    console.log(input);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${URL}/job/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/admin/jobs");
        toast.success("job posted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] w-screen my-5">
      <form
        onSubmit={onSubmitHandler}
        className="min-h-[60vh] p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
      >
        <div className="grid grid-cols-2 gap-[4px]">
          <div>
            <Label className="font-bold">Title</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={onChangeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-lime-100 my-1"
            />
          </div>
          <div>
            <Label className="font-bold">description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={onChangeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-lime-100 my-1"
            />
          </div>
          <div>
            <Label className="font-bold">requirements</Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={onChangeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-lime-100 my-1"
            />
          </div>
          <div>
            <Label className="font-bold">salary(LPA)</Label>
            <Input
              type="text"
              name="salary"
              value={input.salary}
              onChange={onChangeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-lime-100 my-1"
            />
          </div>
          <div>
            <Label className="font-bold">jobType(part-time or full-time)</Label>
            <Input
              type="text"
              name="jobType"
              value={input.jobType}
              onChange={onChangeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-lime-100 my-1"
            />
          </div>
          <div>
            <Label className="font-bold">experience</Label>
            <Input
              type="text"
              name="experience"
              value={input.experience}
              onChange={onChangeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-lime-100 my-1"
            />
          </div>
          <div>
            <Label className="font-bold">position</Label>
            <Input
              type="number"
              name="position"
              value={input.position}
              onChange={onChangeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-lime-100 my-1"
            />
          </div>
          <div>
            <Label className="font-bold">location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={onChangeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-lime-100 my-1"
            />
          </div>
          {companies?.length > 0 ? (
            <div>
              <Label className="font-bold mr-[6px]">location</Label>
              <select
                onChange={(e) => selectHandler(e.target.value)}
                className="block w-full p-2 bg-white border border-[#e2e8f0] rounded-md"
                placeholder="select a company"
                name="companyId"
                id="company"
              >
                {companies?.map((company) => (
                  <option
                    value={company?.name?.toLowerCase()}
                    key={company?._id}
                  >
                    {company?.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            ""
          )}
        </div>

        {companies?.length === 0 ? (
          <p className="text-sm mt-5 text-center  text-red-400 font-bold">
            Register a company first to create a job
          </p>
        ) : loading ? (
          <Button
            disabled
            type="submit"
            className="w-full my-4 bg-gray-400 text-white flex items-center justify-center"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please Wait
          </Button>
        ) : (
          <Button className="w-full mt-4">Create Job</Button>
        )}
      </form>
    </div>
  );
}

export default CreateAndEditAdminJobs;
