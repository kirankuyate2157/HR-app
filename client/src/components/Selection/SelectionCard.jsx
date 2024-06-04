import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { MdOutlineDone } from "react-icons/md";
import { MdOutgoingMail } from "react-icons/md";
import EditMail from "./EditMail";
import { useState } from "react";
const SelectionCard = ({ tab,data }) => {
  const [edit, setEdit] = useState(false);
  return (
    <Card className='flex flex-col w-[11rem]   sm:w-[15rem] p-3 gap-2 overflow-hidden bg-muted border-gray-600'>
      <EditMail open={edit} setOpen={() => setEdit(false)} />
      <div className='flex justify-center h-full min-h-[50%] max-h-[75%]   '>
        <img
          src={
            data?.photo?.split("?")[0] ||
            "https://avatars.githubusercontent.com/u/84271800?v=4"
          }
          alt='images'
          className='w-full object-cover  bg-slate-700 max-w-64 rounded-lg'
        />
      </div>
      <div className='w-full   rounded'>
      <h2 className="text-sm sm:text-lg">{data?.fullName || "Not mentioned"}</h2>
        <div className=' text-xs flex  flex-col sm:flex-row justify-center  text-gray-300 gap-2 sm:text-sm '>
        <p>{data?.title || "Full stack developer"}</p>
          <p>
            <span className='bg-green-800 rounded-md px-2 p-[2px]  items-center text-center text-xs'>
            {data?.experience?.length >= 3
                ? "Fresher"
                : data?.experience?.length <= 2
                ? "Jr level"
                : "Fresher"}
            </span>
          </p>
        </div>
        {tab === "application" ? (
          <div className='flex  gap-2 justify-end mt-2'>
            <Select>
              <SelectTrigger className='h-8 bg-background w-[150px]'>
                <SelectValue placeholder='Select Role' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='light'>SDE 1</SelectItem>
                <SelectItem value='dark'>Data analyst</SelectItem>
                <SelectItem value='system'>Full Stack Dev</SelectItem>
              </SelectContent>
            </Select>
            <Button className='text-xl h-8 bg-background text-white hover:bg-gray-900 dark:hover:text-gray-400 font-bold p-0 px-2 '>
              <MdOutlineDone />
            </Button>
          </div>
        ) : (
          <div className='flex  gap-2 justify-end mt-2'>
            <Button
              className='bg-background text-xs sm:text-sm text-white hover:bg-gray-900 dark:hover:text-gray-400 font-bold p-0 px-2 h-8'
              onClick={() => setEdit(true)}
            >
              Edit mail
            </Button>
            <Button className=' text-xl bg-background text-white hover:bg-gray-900 dark:hover:text-gray-400 font-bold p-0 px-2 h-8'>
              <MdOutgoingMail />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SelectionCard;
