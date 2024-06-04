import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const EmployeeCard = ({ data }) => {
  return (
    <Card className='flex flex-col  w-[10rem] xs:w-[11rem]   sm:w-[15rem] p-3 gap-2 overflow-hidden bg-muted border-gray-600'>
      <div className='h-full flex flex-col gap-2 justify-between'>
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

      <Link to={`/employee/${data?._id}`} className='w-full h-[20%] mb-3 sm:mb-0 flex flex-col justify-center  rounded'>
        <h2 className="text-sm sm:text-lg">{data?.fullName || "Not mentioned"}</h2>
        <div className=' flex flex-col sm:flex-row justify-center text-xs text-gray-300 gap-2 sm:text-sm '>
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
      </Link>
      </div>
    </Card>
  );
};

export default EmployeeCard;
