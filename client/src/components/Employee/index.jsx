import React, { useState } from "react";
import EmployeeCard from "./Card";
import Dropdown from "./Dropdown";
import { RiSearch2Line } from "react-icons/ri";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Employee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [filterOption, setFilterOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const launchesPerPage = 16;

  let filterOptions = ["fresher", "Student", "1yr Exp", "2yr Exp", "3yr Exp"];
  return (
    <div className="h-[90vh] overflow-auto">
      Employee component..
      <div className='flex w-full  items-center justify-between space-x-4 mt-2 mb-4'>
        <div className=' w-80  bg-white shadow-md p-1 px-2 flex items-center gap-3  border border-gray-200 rounded-lg'>
          <div className='flex w-full text-black items-center gap-2'>
            <RiSearch2Line classNam='text-lg' />
            <input
              type='search'
              placeholder='Search..'
              className='w-full bg-transparent focus:outline-none'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className='flex  gap-3'>
          <Dropdown
            name='Filter'
            options={filterOptions}
            selectedOption={filterOption}
            setSelectedOption={setFilterOption}
          />
          <Dropdown
            name='Sort'
            options={["Asc", "Desc"]}
            selectedOption={sortOrder}
            setSelectedOption={setSortOrder}
          />
        </div>
      </div>
      <div className='flex flex-wrap  gap-3'>
      <EmployeeCard /> <EmployeeCard /> <EmployeeCard /> <EmployeeCard /><EmployeeCard /> <EmployeeCard /> <EmployeeCard /> <EmployeeCard />
        <EmployeeCard /> <EmployeeCard /> <EmployeeCard /> <EmployeeCard />
      </div>
      <div className='my-6 overflow-hidden'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href='#' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Employee;
