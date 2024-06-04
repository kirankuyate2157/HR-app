import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const EmployeeCard = ({ data }) => {
  return (
    <Card className='flex flex-col w-[10rem] xs:w-[11rem]   sm:w-[15rem] p-3 gap-2 overflow-hidden bg-muted border-gray-600'>
      <div className='flex justify-center min-h-[50%]   '>
        <img
          src={
            data?.photo ||
            "https://avatars.githubusercontent.com/u/84271800?v=4"
          }
          alt='images'
          className='w-full object-cover  bg-slate-700 max-w-64 rounded-lg'
        />
      </div>

      <Link to={`/employee/${data?._id}`} className='w-full  rounded'>
        <h2>{data?.fullName || "Not mentioned"}</h2>
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
    </Card>
  );
};

export default EmployeeCard;
