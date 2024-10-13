import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/store/authslice";

function NavBar({ URL }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const LogOutHandler = async () => {
    try {
      const res = await axios.get(`${URL}/user/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success("logged out");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to={"/"} >
          {" "}
          <div>
            <h1 className="text-2xl font-bold">
              Job
              <span className="text-red-600"> Portal</span>
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <NavLink to={"/admin/companies"}>
                  <li>Companies</li>
                </NavLink>
                <NavLink to={"/admin/jobs"}>
                  <li>Jobs</li>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to={"/"}>
                  <li>Home</li>
                </NavLink>
                <NavLink to={"/jobs"}>
                  <li>Jobs</li>
                </NavLink>
              </>
            )}
          </ul>
          {user ? (
            <Popover>
              <PopoverTrigger>
                <Avatar className="border border-black rounded-full">
                  <AvatarImage
                    className="mt-[3px]  "
                    src={
                      user?.profile?.profilePhoto?.url
                        ? user.profile.profilePhoto.url
                        : "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-260nw-2281862025.jpg"
                    }
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 mr-3">
                <div className="flex gap-2  space-y-2">
                  <Avatar className="mt-2">
                    <AvatarImage
                      className="mt-[3px]"
                      src={
                        user?.profile?.profilePhoto?.url
                          ? user.profile.profilePhoto.url
                          : "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-260nw-2281862025.jpg"
                      }
                    />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user?.fullName || "User"}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.description || "Lorem ipsum dolor sit amet."}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mt-5 text-gray-600">
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Link to={`/profile/${user?.id}`}>
                      <Button variant="NavLink">View Profile</Button>
                    </Link>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={LogOutHandler} variant="NavLink">
                      Log Out
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div>
              <Link to={"/login"}>
                <Button variant="outline" className="mx-3">
                  Login
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="p-2">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-50 transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-2xl font-bold">Job Portal</h1>
          <button onClick={toggleMobileMenu} className="p-2">
            <X />
          </button>
        </div>
        <ul className="flex flex-col p-4 font-medium">
          {user && user.role === "recruiter" ? (
            <>
              <NavLink to={"/admin/companies"}>
                <li className="py-2" onClick={toggleMobileMenu}>
                  Companies
                </li>
              </NavLink>
              <NavLink to={"/admin/jobs"}>
                <li className="py-2" onClick={toggleMobileMenu}>
                  Jobs
                </li>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={"/"}>
                <li className="py-2" onClick={toggleMobileMenu}>
                  Home
                </li>
              </NavLink>
              <NavLink to={"/jobs"}>
                <li className="py-2" onClick={toggleMobileMenu}>
                  Jobs
                </li>
              </NavLink>
            </>
          )}
          {user ? (
            <div className="flex flex-col mt-4 text-gray-600">
              <div className="flex items-center py-2 cursor-pointer">
                <User2 />
                <Link to={`/profile/${user?.id}`} onClick={toggleMobileMenu}>
                  <Button variant="outline">View Profile</Button>
                </Link>
              </div>
              <div className="flex items-center py-2 cursor-pointer">
                <LogOut />
                <Button
                  onClick={() => {
                    LogOutHandler();
                    toggleMobileMenu();
                  }}
                  variant="outline"
                >
                  Log Out
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col mt-4">
              <Link to={"/login"}>
                <Button variant="outline" className="mb-2 w-full">
                  Login
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="bg-purple-600 hover:bg-purple-700 w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
