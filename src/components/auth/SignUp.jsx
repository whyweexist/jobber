import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/authslice";

function SignUp({ URL }) {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "",
  });
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const onChangeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    formData.append("password", input.password);
    try {
      const res = await axios.post(`${URL}/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md border border-gray-200 rounded-md p-4 mx-auto my-10 bg-white shadow-md"
      >
        <h1 className="font-bold text-xl mb-5 text-center text-gray-800">
          Sign Up
        </h1>
        <div className="my-2">
          <Label className="block text-gray-700">Full Name</Label>
          <Input
            name="fullName"
            value={input.fullName}
            onChange={onChangeHandler}
            type="text"
            placeholder="Enter Your Name"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="my-2">
          <Label className="block text-gray-700">Email</Label>
          <Input
            name="email"
            value={input.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Enter Your Email"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="my-2">
          <Label className="block text-gray-700">Phone Number</Label>
          <Input
            value={input.phoneNumber}
            name="phoneNumber"
            onChange={onChangeHandler}
            type="number"
            placeholder="Enter Your Phone Number"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="my-2">
          <Label className="block text-gray-700">Password</Label>
          <Input
            value={input.password}
            name="password"
            onChange={onChangeHandler}
            type="password"
            placeholder="Enter Your Password"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="my-4">
          <RadioGroup
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            defaultValue="option-one"
          >
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                onChange={onChangeHandler}
                className="cursor-pointer"
                checked={input.role === "student"}
                value="student"
                id="option-one"
              />
              <Label htmlFor="option-one">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                onChange={onChangeHandler}
                className="cursor-pointer"
                checked={input.role === "recruiter"}
                value="recruiter"
                id="option-two"
              />
              <Label htmlFor="option-two">Recruiter</Label>
            </div>
          </RadioGroup>
        </div>
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
          >
            Sign Up
          </Button>
        )}
        <div className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <b className="text-sm underline text-blue-400">
            <Link to="/login">Click here</Link>
          </b>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
