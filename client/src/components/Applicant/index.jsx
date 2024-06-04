import React, { useEffect, useState } from "react";
import JobApplication from "./JobApplication";
import { useParams } from "react-router";
import { getJobStatus } from "./utils/apis";
import { showToast } from "@/utils/showToast";
import { TbLoader2 } from "react-icons/tb";

const Applicant = () => {
  const [jobStatus, setJobStatus] = useState(null);
  const [loader, setLoader] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchJobStatus = async () => {
      if (id && !jobStatus) {
        setLoader(true);
        const status = await getJobStatus(id);
        setLoader(false);
        console.log("jb status :", status);
        showToast(status.message || status?.data?.message);
        setJobStatus(status?.data?.data);
      }
    };
    console.log("fetch job :");
    fetchJobStatus();
  });

  return (
    <div className='w-full h-[100vh] py-10 pb-24 overflow-auto'>
      {!loader ? (
        <>
          {!jobStatus?.response ? (
            <h2 className='h-[30vh] flex justify-center items-center'>
              application form with Job ID{" "}
              <span className='bg-gray-800 rounded-md px-2  mx-2'>{id}</span> is{" "}
              {jobStatus?.message || "Not Found "}
            </h2>
          ) : (
            <JobApplication jobId={id} job={jobStatus?._doc} />
          )}
        </>
      ) : (
        <div className='flex justify-center items-center gap-3 text-white'>
          <TbLoader2 className='animate-spin' />{" "}
          <p className='animate-pulse'>Loading ...</p>
        </div>
      )}
    </div>
  );
};

export default Applicant;
