import React, { useState, useRef, useEffect } from "react";
import { Card } from "../ui/card";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar"; // Adjust the path as needed
import { format } from "date-fns";
import LinesEllipsis from "react-lines-ellipsis";

const FormCard = () => {
  const [response, setResponse] = useState(true);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(),
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const handleSelect = (date) => {
    console.log("date slected : ", date);
    // if (!dateRange.from || (dateRange.from && dateRange.to)) {
    //   setDateRange({ from: date, to: null });
    // } else if (dateRange.from && !dateRange.to) {
    //   if (date < dateRange.from) {
    //     setDateRange({ from: date, to: dateRange.from });
    //   } else {
    //     setDateRange({ ...dateRange, to: date });
    //   }
    //   setShowCalendar(false); // Close calendar after selecting end date
    // }
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

  return (
    <Card className='p-2 w-full sm:max-w-[48%] rounded-md bg-slate-900 border-gray-700'>
      <div className='w-full flex flex-col gap-3 p-2 items-from '>
        <div className='w-full flex items-center justify-between gap-2'>
          <h2 className='w-full flex flex-wrap text-start'>
            <LinesEllipsis
              text={`Hiring SDE role (Fresher)`}
              maxLine={1}
              ellipsis='...'
              trimRight
              basedOn='words'
            />
          </h2>
          <p>:::</p>
        </div>
        <p className='w-full text-sm flex flex-wrap text-start'>
          <LinesEllipsis
            text={`I have created portfolio to Increase my work online better presence so i can get more outputs.. try now I have created portfolio to Increase my work online better presence so i can get more outputs.. try now `}
            maxLine={2}
            ellipsis='...'
            trimRight
            basedOn='words'
          />
        </p>
        <div className='w-full flex justify-between items-center'>
          <h6 onClick={toggleCalendar} className='cursor-pointer'>
            {formatDateRange(dateRange.from, dateRange.to)}
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
              onCheckedChange={() => setResponse(!response)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FormCard;
