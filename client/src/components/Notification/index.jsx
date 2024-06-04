import React, { useState } from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { MdOutlineMarkChatUnread, MdOutlineMarkChatRead } from "react-icons/md";
import { RiSearch2Line } from "react-icons/ri";
import Dropdown from "../Employee/Dropdown";
import { Button } from "../ui/button";

const Notification = ({ read = true }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [filterOption, setFilterOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const launchesPerPage = 16;

  let filterOptions = ["fresher", "Student", "1yr Exp", "2yr Exp", "3yr Exp"];

  return (
    <ScrollArea className="h-[100vh] pb-24 overflow-auto">
      <div className="flex flex-col sm:flex-row w-full items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 mt-2 mb-4">
        <div className="w-full sm:w-80 bg-white shadow-md p-1 px-2 flex items-center gap-3 border border-gray-200 rounded-lg">
          <div className="flex w-full text-black items-center gap-2">
            <RiSearch2Line className="text-lg" />
            <input
              type="search"
              placeholder="Search.."
              className="w-full bg-transparent focus:outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button>Mark All read</Button>
          <Dropdown
            name="Filter"
            options={filterOptions}
            selectedOption={filterOption}
            setSelectedOption={setFilterOption}
          />
          <Dropdown
            name="Sort"
            options={["Recent", "Unread", "Read", "Time"]}
            selectedOption={sortOrder}
            setSelectedOption={setSortOrder}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-start gap-2 overflow-hidden">
        {Array.from({ length: 9 }).map((_, index) => (
          <Card
            key={index}
            className="border-gray-700 w-full h-full sm:w-auto p-2 px-4 flex flex-col sm:flex-row gap-2 items-start sm:items-center"
          >
            {read ? (
              <MdOutlineMarkChatUnread className="text-green-500 text-2xl sm:text-lg" />
            ) : (
              <MdOutlineMarkChatRead className="text-gray-500 text-2xl sm:text-lg" />
            )}
            <p className="text-start flex flex-wrap text-wrap text-sm sm:text-base">
              Application to dood sended adbd djhbdjs csccs sbsjsdfsfsfsbfs
              bsdjgdjgbjdgjdbjgdjgbdd   hgjhdgdgdbgjdbjdgdjgbdjgbdjg!
            </p>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Notification;
