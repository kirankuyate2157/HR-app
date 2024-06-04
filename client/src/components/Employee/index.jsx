import React, { useEffect, useState } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllApplications } from "./utils/apis";
import { showToast } from "@/utils/showToast";
import { TbLoader2 } from "react-icons/tb";

const Employee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [filterOption, setFilterOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageDoc, setPageDoc] = useState(null);
  const perPage = 10;

  const [applicant, setApplicant] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);

  // let filterOptions = ["fresher", "Student", "1yr Exp", "2yr Exp", "3yr Exp"];

  useEffect(() => {
    const fetchApplications = async () => {
      setLoader(true);
      const applicationData = await getAllApplications(perPage, currentPage);
      setLoader(false);
      console.log("Application  :", applicationData);
      showToast(applicationData.message || applicationData?.data?.message);
      setApplicant(applicationData?.applicants);
      setPageDoc(applicationData?.pagination);
    };
    fetchApplications();
  }, [currentPage]);

  useEffect(() => {
    if (applicant && applicant?.length > 0) {
      const fields = Object.keys(applicant[0]);
      setFilterOptions(fields);
    }
  }, [applicant]);

  return (
    <ScrollArea className='h-[100vh] pb-24 px-2 xs:px-4 sm:px-8 lg:px-0 overflow-auto'>
      <div className='flex w-full  items-center justify-between space-x-4 mt-2 mb-4'>
        <div className=' md:w-80 px-5  bg-white shadow-md p-1 md:px-2 flex items-center gap-3  border border-gray-200 rounded-lg'>
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
      {!loader ? (
        <>
          <div className='flex  flex-wrap justify-center sm:justify-start gap-3'>
            <>
              {applicant?.length > 0 &&
                applicant
                  ?.filter((ele) => {
                    if (searchTerm.trim() !== "") {
                      if (typeof ele[filterOption || "fullName"] === "object") {
                        for (const prop in ele[filterOption]) {
                          if (
                            typeof ele[filterOption || "fullName"][prop] ===
                              "string" &&
                            ele[filterOption || "fullName"][prop]
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          ) {
                            return true;
                          }
                        }
                        return false;
                      } else {
                        return ele[filterOption || "fullName"]
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase());
                      }
                    } else {
                      return true;
                    }
                  })
                  ?.sort((a, b) => {
                    if (sortOrder === "Asc") {
                      return new Date(a.createdAt) - new Date(b.createdAt);
                    } else {
                      return new Date(b.createdAt) - new Date(a.createdAt);
                    }
                  })
                  ?.map((item, index) => (
                    <EmployeeCard data={item} key={index} />
                  ))}
            </>
            <EmployeeCard />
          </div>
          <div className='my-6 overflow-hidden '>
            <Pagination classNam="cursor-pointer">
              <PaginationContent >
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => {
                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                      }
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>{currentPage}</PaginationLink>
                </PaginationItem>
                {currentPage < pageDoc?.totalPages && (
                  <PaginationItem >
                    <PaginationLink
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      {currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => {
                      if (currentPage < pageDoc?.totalPages) {
                        setCurrentPage(currentPage - 1);
                      }
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      ) : (
        <div className='w-full py-10 flex flex-col justify-center '>
          <div className='w-full flex justify-center items-center gap-3 text-white'>
            <TbLoader2 className='animate-spin' />{" "}
            <p className='animate-pulse'>Loading ...</p>
          </div>
        </div>
      )}
    </ScrollArea>
  );
};

export default Employee;
