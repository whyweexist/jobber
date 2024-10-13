import axios from "axios";
import React from "react";
import { toast } from "sonner";

const useStatusHandler = async (URL, status, id, change, setChange) => {
  try {
    const res = await axios.patch(
      `${URL}/application/status/${id}`,
      {
        status: status,
      },
      { withCredentials: true }
    );
    console.log(res);
    setChange(!change);
    if (res.data.success) {
      toast.success("Status Updated Successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

export default useStatusHandler;
