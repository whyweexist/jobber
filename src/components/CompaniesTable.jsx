import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import CreateCompanyPopUp from "./CreateCompanyPopUp";

function CompaniesTable({ filter, companies, change, setChange, URL }) {
  const [open, setOpen] = useState(false);
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  useEffect(() => {
    const filteredCompany =
      companies.length > 0 &&
      companies.filter((company) => {
        if (!filter) {
          return true;
        }
        return company?.name?.toLowerCase().includes(filter.toLowerCase());
      });
    setFilteredCompanies(filteredCompany);
  }, [filter,companies]);

  return (
    <div>
      <Table>
        <TableCaption>List of your recent companies</TableCaption>
        <TableHeader>
          <TableHead>logo</TableHead>
          <TableHead>name</TableHead>
          <TableHead>date</TableHead>
          <TableHead className="text-right">action</TableHead>
        </TableHeader>
        <TableBody>
          {filteredCompanies.map((company, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell>
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      className="mt-[4px]"
                      src={
                        company.logo?.url ||
                        "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-260nw-2281862025.jpg"
                      }
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt?.slice(0,10)}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-24">
                      <div
                        onClick={() => {
                          setOpen(true);
                        }}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>

                      <CreateCompanyPopUp
                        open={open}
                        setOpen={setOpen}
                        data={company}
                        change={change}
                        setChange={setChange}
                        URL={URL}
                      />
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
