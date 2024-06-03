import React, { useState, useRef, useEffect } from "react";
import { Card } from "../ui/card";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar"; // Adjust the path as needed
import { format } from "date-fns";
import LinesEllipsis from "react-lines-ellipsis";
import { updateJob } from "./utils/apis";
import { showToast } from "@/utils/showToast";
import { MdDone } from "react-icons/md";

const FormCard = ({ data }) => {
  
  const [response, setResponse] = useState(
    data?.status == "Active" ? true : false
  );
  const [dateRange, setDateRange] = useState({
    from: data?.createdAt || new Date.now(),
    to: data?.applicationDeadline || new Date.now(),
  });
  const [dateUpdated, setDateUpdated] = useState(false);

  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const updateResponse = async (newResponse) => {
    if (new Date(dateRange?.to).toISOString() < data?.applicationDeadline) {
      showToast("Form expired !");
      return;
    }
    setResponse(newResponse);

    const res = await updateJob(data?._id, {
      status: newResponse ? "Active" : "Closed",
    });
    if (res) showToast(`${data?.JobId} ${res?.message}` || "daedline updated");
  };
  const updatedLine = async () => {
    const date = new Date(dateRange?.to);
    // Convert to ISO 8601 string
    let isoDate = date.toISOString();

    if (data?.createdAt >= isoDate) {
      setDateRange({ ...dateRange, to: data.applicationDeadline });
      return;
    }

    console.log(
      "updating date range from ",
      data.applicationDeadline,
      " to: ",
      isoDate
    );
    const updatedDate = await updateJob(data?._id, {
      applicationDeadline: isoDate,
    });
    if (updatedDate) {
      setDateUpdated(false);
      console.log(updatedDate);
      setDateRange({
        ...dateRange,
        to: updatedDate?.data?.applicationDeadline,
      });
      showToast(`${data?.JobId} ${updatedDate.message}` || "daedline updated");
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDateRange = (from, to) => {
    if (!from) return "Select Date Range";
    if (from && !to) return `${format(from, "MMM dd")}`;
    return `${format(from, "MMM dd")} - ${format(to, "MMM dd")}`;
  };
  useEffect(() => {
    if (new Date(dateRange?.to).toISOString() != data?.applicationDeadline)
      setDateUpdated(() => true);
    else setDateUpdated(false);
  }, [showCalendar]);



  return (
    <Card className='p-2 w-full sm:max-w-[48%] rounded-md bg-slate-900 border-gray-700'>
      <div className='w-full flex flex-col gap-3 p-2 items-from '>
        <div className='w-full flex items-center justify-between gap-2'>
          <h2 className='w-full flex flex-wrap text-start'>
            <LinesEllipsis
              text={data?.title || "title not specified"}
              maxLine={1}
              ellipsis='...'
              trimRight
              basedOn='words'
            />
          </h2>
          <div className='flex gap-2 justify-end items-center'>
            <p className='p-1  rounded text-xs bg-slate-700'>{data?.JobId}</p>
            <p>:::</p>
          </div>
        </div>
        <p className='w-full text-sm flex flex-wrap text-start'>
          <LinesEllipsis
            text={data?.description || "description not specified"}
            maxLine={2}
            ellipsis='...'
            trimRight
            basedOn='words'
          />
        </p>
        <div className='w-full flex justify-between items-center'>
          <h6 className='cursor-pointer flex items-center gap-2'>
            <span onClick={toggleCalendar}>
              {formatDateRange(dateRange.from, dateRange.to)}
            </span>{" "}
            {dateUpdated && (
              <MdDone
                onClick={updatedLine}
                className='text-lg bg-orange-900 rounded-lg'
              />
            )}
          </h6>
          {showCalendar && (
            <div
              ref={calendarRef}
              className='absolute bg-slate-900 top-60 z-10 rounded-md'
            >
              <Calendar
                mode='range'
                selected={dateRange}
                onSelect={(date) => setDateRange(date)}
                className='rounded-md border border-gray-800'
              />
            </div>
          )}
          <div className='flex gap-2 justify-end'>
            <h6>{`${response ? "active" : "close"}`}</h6>
            <Switch
              className='bg-red-500'
              checked={response}
              onCheckedChange={() => {
                updateResponse(!response);
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FormCard;
