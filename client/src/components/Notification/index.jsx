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
    <ScrollArea className='h-[90vh] overflow-auto'>
     

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
            <Button>Mark All read</Button>
          <Dropdown
            name='Filter'
            options={filterOptions}
            selectedOption={filterOption}
            setSelectedOption={setFilterOption}
          />
           <Dropdown
            name='Sort'
            options={["Recent", "Unread","Read","Time"]}
            selectedOption={sortOrder}
            setSelectedOption={setSortOrder}
          />
        </div>
     
      </div>
      <div className='flex flex-wrap justify-start items-start gap-2'>
        <Card className='border-gray-700 w-auto p-2 px-4 flex gap-2 items-center'>
          {read ? (
            <MdOutlineMarkChatUnread className='text-green-500' />
          ) : (
            <MdOutlineMarkChatRead className='text-gray-500' />
          )}
          <p className='text-start'>
            Application to dood sended adbd djhbdjs csccs sbsjsdfsfsfsbfs
            bsdjgdjgbjdgjdbjgdjgbddhgjhdgdgdbgjdbjdgdjgbdjgbdjg !
          </p>
        </Card>
        <Card className='border-gray-700 p-2 px-4 flex gap-2 items-center'>
          {read ? (
            <MdOutlineMarkChatUnread className='text-green-500' />
          ) : (
            <MdOutlineMarkChatRead className='text-gray-500' />
          )}
          <p>Application to dood sended !</p>
        </Card>
        <Card className='border-gray-700 p-2 px-4 flex gap-2 items-center'>
          {read ? (
            <MdOutlineMarkChatUnread className='text-green-500' />
          ) : (
            <MdOutlineMarkChatRead className='text-gray-500' />
          )}
          <p>Application to dood sended !</p>
        </Card>
        <Card className='border-gray-700 p-2 px-4 flex gap-2 items-center'>
          {read ? (
            <MdOutlineMarkChatUnread className='text-green-500' />
          ) : (
            <MdOutlineMarkChatRead className='text-gray-500' />
          )}
          <p>Application to dood sended ggvhgwdwvhdwhvwv  dwd !</p>
        </Card>
        <Card className='border-gray-700 p-2 px-4 flex gap-2 items-center'>
          {read ? (
            <MdOutlineMarkChatUnread className='text-green-500' />
          ) : (
            <MdOutlineMarkChatRead className='text-gray-500' />
          )}
          <p>Application to dood sended !</p>
        </Card>
        <Card className='border-gray-700 p-2 px-4 flex gap-2 items-center'>
          {read ? (
            <MdOutlineMarkChatUnread className='text-green-500' />
          ) : (
            <MdOutlineMarkChatRead className='text-gray-500' />
          )}
          <p>Application to dood sended  jfvsf jhsbfuebfebf fbfbded !</p>
        </Card>
        <Card className='border-gray-700 p-2 px-4 flex gap-2 items-center'>
          {read ? (
            <MdOutlineMarkChatUnread className='text-green-500' />
          ) : (
            <MdOutlineMarkChatRead className='text-gray-500' />
          )}
          <p>Application to dood sended !</p>
        </Card>
        <Card className='border-gray-700 p-2 px-4 flex gap-2 items-center'>
          {read ? (
            <MdOutlineMarkChatUnread className='text-green-500' />
          ) : (
            <MdOutlineMarkChatRead className='text-gray-500' />
          )}
          <p>Application to dood sended  dood have you see that ...!!</p>
        </Card>
        <Card className='border-gray-700 p-2 px-4 flex gap-2 items-center'>
          {read ? (
            <MdOutlineMarkChatUnread className='text-green-500' />
          ) : (
            <MdOutlineMarkChatRead className='text-gray-500' />
          )}
          <p>Application to dood sended !!</p>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default Notification;
