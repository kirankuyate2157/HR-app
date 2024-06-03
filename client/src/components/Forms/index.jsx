import React, { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import FormCard from "./FormCard";
import NewJob from "./NewJob";
import { getAllJob } from "./utils/apis";
import { showToast } from "@/utils/showToast";

const Forms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [filterOption, setFilterOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const launchesPerPage = 16;
  const [tabValue, setTabValue] = useState("forms");
  const [alljob, setAllJob] = useState(null);
  useEffect(() => {
    const fetchAllJob = async () => {
      const jobs = await getAllJob();
      setAllJob(jobs);
      showToast(jobs.message);
      console.log("jobs : ",jobs);
    };

    fetchAllJob();
  }, []);
  return (
    <ScrollArea className='h-[100vh]  pb-10 overflow-auto'>
      <Tabs defaultValue='forms'>
        <div className='flex py-4'>
          <TabsList className='flex gap-1 w-auto  overflow-auto justify-start'>
            <TabsTrigger value='forms' onClick={() => setTabValue("forms")}>
              Forms
            </TabsTrigger>
            <TabsTrigger value='new' onClick={() => setTabValue("new")}>
              Generate Form
            </TabsTrigger>
            <TabsTrigger value='active' onClick={() => setTabValue("active")}>
              Active Form
            </TabsTrigger>
            <TabsTrigger value='close' onClick={() => setTabValue("close")}>
              Closed Form
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='forms'>
          <div className='w-full flex flex-wrap  gap-3'>
            <FormCard /> <FormCard /> <FormCard /> <FormCard />
          </div>
        </TabsContent>
        <TabsContent value='new'>
          <div className='flex flex-wrap  gap-3'>
            <NewJob />
          </div>
        </TabsContent>
        <TabsContent value='active'>
          <div className='flex flex-wrap  gap-3'>Previous forms</div>
        </TabsContent>
        <TabsContent value='close'>
          <div className='flex flex-wrap  gap-3'>Generate new forms</div>
        </TabsContent>
      </Tabs>
    </ScrollArea>
  );
};

export default Forms;
