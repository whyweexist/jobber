import React from "react";
import NavBar from "./components/shared/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./store/authslice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

//layout

function LayOut({ URL }) {
  useGetAllJobs(URL);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${URL}/user/info`, {
          withCredentials: true,
        });
        dispatch(setUser(res.data.user));
      } catch (error) {
        console.log(error.response);
      }
    })();
  }, []);
  return (
    <>
      <NavBar URL={URL} />
      <Outlet />
      <Footer />
    </>
  );
}

export default LayOut;
