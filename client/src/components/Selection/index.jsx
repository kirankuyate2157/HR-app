import React, { useEffect, useState } from "react";
import Dropdown from "../Employee/Dropdown";
import { RiSearch2Line } from "react-icons/ri";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import SelectionCard from "./SelectionCard";
import { ScrollArea } from "@radix-ui/react-scroll-area";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { showToast } from "@/utils/showToast";
import { getAllApplications } from "../Employee/utils/apis";

const Selection = () => {
  const [tabValue, setTabValue] = useState("selected");
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
      <Tabs defaultValue='application'>
        <div className='flex my-4'>
          <TabsList className='flex gap-1 w-auto  justify-start'>
            <TabsTrigger
              value='application'
              onClick={() => setTabValue("application")}
            >
              Applications
            </TabsTrigger>
            <TabsTrigger
              value='selected'
              onClick={() => setTabValue("selected")}
            >
              Selected
            </TabsTrigger>
          </TabsList>
        </div>
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
        <TabsContent value='application'>
          <div className='flex  flex-wrap justify-center sm:justify-start gap-3'>
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
                  <SelectionCard tab={tabValue} data={item} key={index} />
                ))}
            <SelectionCard tab={tabValue} />
          </div>
        </TabsContent>
        <TabsContent value='selected'>
          <div className='flex flex-wrap justify-center sm:justify-start gap-3'>
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
                  <SelectionCard data={item} key={index} />
                ))}
            <SelectionCard />
          </div>
        </TabsContent>
      </Tabs>
      <div className='my-6 overflow-hidden '>
        <Pagination  classNam="cursor-pointer">
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
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(currentPage + 1)}>
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
    </ScrollArea>
  );
};

export default Selection;
