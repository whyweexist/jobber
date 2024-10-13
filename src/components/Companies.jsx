import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import CompaniesTable from "./CompaniesTable";
import CreateCompanyPopUp from "./CreateCompanyPopUp";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSliceCompanies } from "@/store/companySlice";

function Companies({ URL }) {
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [change, setChange] = useState(false);
  const [loader, setLoader] = useState(false);
  const [filterCompany, setfilterCompany] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const res = await axios.get(`${URL}/company/get`, {
          withCredentials: true,
        });
        if (res.data?.success) {
          setCompanies(res.data.companies);
          dispatch(setSliceCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    })();
  }, [change]);

  return (
    <div className="max-w-6xl mx-auto my-10 min-h-[60vh]">
      <CreateCompanyPopUp open={open} URL={URL} setOpen={setOpen} />
      <div className="flex items-center justify-between">
        <Input
          onChange={(e) => setfilterCompany(e.target.value)}
          className="w-fit"
          value={filterCompany}
          placeholder="Filter by name"
        />
        <Button onClick={() => setOpen(true)}>New Company</Button>
      </div>
      {loader ? (
        <div className="w-[60vw] mx-auto items-center justify-center flex h-[60vh]">
          <Loader2 className="animate-spin w-[70px] text-gray-400 h-[70px]" />
        </div>
      ) : companies.length === 0 ? (
        <div className="w-[60vw] mx-auto items-center justify-center flex h-[60vh]">
          No companies exist.Go ahead to create one
        </div>
      ) : (
        <CompaniesTable
          setChange={setChange}
          change={change}
          companies={companies}
          URL={URL}
          filter={filterCompany}
        />
      )}
    </div>
  );
}

export default Companies;
