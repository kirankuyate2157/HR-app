import React, { useState } from "react";
import Dropdown from "../Employee/Dropdown";
import { RiSearch2Line } from "react-icons/ri";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import SelectionCard from "./SelectionCard";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const Selection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [filterOption, setFilterOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const launchesPerPage = 16;
  const [tabValue, setTabValue] = useState("selected");

  let filterOptions = ["fresher", "Student", "1yr Exp", "2yr Exp", "3yr Exp"];
  return (
    <ScrollArea className="h-[100vh] overflow-auto">
      <Tabs defaultValue="application">
        <div className='flex mb-4'>
          <TabsList  className='flex gap-1 w-auto  justify-start'>
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
          <div className='flex flex-wrap justify-center sm:justify-start gap-3'>
            <SelectionCard tab={tabValue} />
            <SelectionCard tab={tabValue} />
            <SelectionCard tab={tabValue} />
            <SelectionCard tab={tabValue} />
            <SelectionCard tab={tabValue} />
            <SelectionCard tab={tabValue} />
            <SelectionCard tab={tabValue} />
            <SelectionCard tab={tabValue} />
            <SelectionCard tab={tabValue} />
            <SelectionCard tab={tabValue} />
            <SelectionCard tab={tabValue} />
            <SelectionCard tab={tabValue} />
            <SelectionCard tab={tabValue} />
            <SelectionCard tab={tabValue} />
            <SelectionCard tab={tabValue} />
            <SelectionCard tab={tabValue} />
          </div>
        </TabsContent>
        <TabsContent value='selected'>
        <div className='flex flex-wrap justify-center sm:justify-start gap-3'>
            <SelectionCard />
            <SelectionCard />
            <SelectionCard />
            <SelectionCard />
            
          </div>
        </TabsContent>
      </Tabs>
    </ScrollArea>
  );
};

export default Selection;
