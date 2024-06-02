import React, { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import FormCard from "./FormCard";

const Forms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [filterOption, setFilterOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const launchesPerPage = 16;
  const [tabValue, setTabValue] = useState("forms");
  return (
    <ScrollArea className='h-[90vh] overflow-auto'>
      <Tabs defaultValue='forms'>
        <div className='flex mb-4'>
          <TabsList className='flex gap-1 w-auto  justify-start'>
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
          <div className='flex flex-wrap  gap-3'>Generate new forms</div>
        </TabsContent>
        <TabsContent value='active'>
          <div className='flex flex-wrap  gap-3'>Previous forms</div>
        </TabsContent>
        <TabsContent value='new'>
          <div className='flex flex-wrap  gap-3'>Generate new forms</div>
        </TabsContent>
      </Tabs>
    </ScrollArea>
  );
};

export default Forms;
