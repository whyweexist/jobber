import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setsearchQuery } from "@/store/jobSlice";

const filterData = [
  {
    filterType: "All",
    array: [""],
  },
  {
    filterType: "location",
    array: ["lahore", "faisalabad", "peshawar", "hyderabad"],
  },
  {
    filterType: "industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Data Science",
      "Graphic design",
    ],
  },
  {
    filterType: "salary(Lpa)",
    array: ["0-40", "40-90", "90-150", "150"],
  },
];

function FilterCard({ isOpen, onClose }) {
  const [selectedValue, setSelectedValue] = React.useState("");
  const dispatch = useDispatch();

  const onChangeVal = (value) => {
    setSelectedValue(value);
    const query = value.replaceAll(" ", "+");
    dispatch(setsearchQuery(query));
  };

  return (
    <div
      className={`fixed md:static inset-y-0 left-0 z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-500 ease-in-out bg-purple-500 rounded-r-md  md:bg-transparent p-3 md:p-0 border-r-2 md:border-r-0 h-full md:h-auto`}
    >
      <button onClick={onClose} className="absolute top-2 right-2 md:hidden">
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h1 className="font-bold text-lg">Filter jobs</h1>
      <hr className="mt-3" />
      <RadioGroup>
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg mb-1">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const id = `id${index}-${idx}`;
              return (
                <div
                  className="flex cursor-pointer items-center space-x-2 m-2"
                  key={id}
                >
                  <RadioGroupItem
                    id={id}
                    value={item}
                    checked={selectedValue === item}
                    onClick={() => onChangeVal(item)}
                  />
                  <Label
                    onClick={() => onChangeVal(item)}
                    className="cursor-pointer"
                    htmlFor={id}
                  >
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
