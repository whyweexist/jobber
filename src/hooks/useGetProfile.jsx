import { setProfile } from "@/store/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetProfile(URL, id) {
  const dipatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${URL}/user/profile/${id}`);
        if (res.data.success) {
          dipatch(setProfile(res.data.profile));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, [user]);
}

export default useGetProfile;
