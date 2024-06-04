import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { showToast } from "@/utils/showToast";
import { getApplicationsDetails } from "./utils/apis";
import { useParams } from "react-router";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaLaptopCode,
} from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa6";
import PdfPreview from "../PdfPreview";
const Details = () => {
  const [applicant, setApplicant] = useState({});
  const [loader, setLoader] = useState(false);
  const [viewResume, setViewResume] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchApplications = async () => {
      setLoader(true);
      const applicationData = await getApplicationsDetails(id);
      setLoader(false);
      showToast(applicationData.message || applicationData?.data?.message);
      setApplicant(applicationData);
    };
    fetchApplications();
  }, [id]);
  return (
  
    <ScrollArea className='p-4 pb-10 w-full h-[100vh] overflow-auto bg-gray-800 rounded'>
      <PdfPreview
        setIsOpen={() => setViewResume(!viewResume)}
        modalIsOpen={viewResume}
        url={applicant?.resume?.split("?")[0]}
      />
      <div className='relative'>
        <div className='flex w-full h-48 max-h-48'>
          <img
            src='https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='placeholder'
            className='object-cover w-full'
          />
        </div>
        <div className='flex h-full pb-2 flex-col justify-end items-center min-h-[11rem] w-full relative'>
          <img
            src={
              applicant?.photo?.split("?")[0] ||
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt='profile'
            className='w-48 h-48 rounded-full absolute -top-24'
          />
          <h2 className='mt-[4rem] text-2xl font-bold text-white'>
            {applicant.fullName || "Not mentioned"}
          </h2>
          <div className='flex justify-center text-gray-300 gap-2 text-sm'>
            <p>Full stack developer</p>
            <p>
              <span className='bg-green-800 rounded-md px-2 p-[2px] items-center text-center text-xs'>
                {applicant.experience?.length >= 3
                  ? "Fresher"
                  : applicant.experience?.length <= 2
                  ? "Jr level"
                  : "Fresher"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className='flex flex-col gap-4 lg:flex-row justify-between py-6'>
        <div className='flex flex-wrap w-full md:w-[70%] justify-start gap-2'>
          <h2 className='font-bold mt-1 text-white'>Experience</h2>
          {applicant.experience?.map((exp) => (
            <Card
              key={exp._id}
              className='w-full ml-3 p-4 border-gray-600 text-start'
            >
              <h3 className='font-bold text-white'>
                {exp.jobTitle} at {exp.company}
              </h3>
              <p className='text-gray-400'>
                {exp.startDate.split("T")[0]} - {exp.endDate.split("T")[0]}
              </p>
              <p className='text-gray-300'>{exp.description}</p>
            </Card>
          ))}
          <h2 className='font-bold mt-1 text-white'>About me</h2>
          <p className='w-full ml-3 text-start text-gray-300'>
            {applicant.summary}
          </p>
          <h2 className='font-bold mt-1 text-white'>Skills</h2>
          <div className='w-full ml-3 text-start flex flex-wrap gap-2'>
            {applicant.skills?.map((skill, index) => (
              <span
                key={index}
                className='p-1 px-2 mx-2 text-sm bg-pink-900 rounded-lg text-white'
              >
                {skill}
              </span>
            ))}
          </div>
          <h2 className='font-bold mt-1 text-white'>Education</h2>
          {applicant.education?.map((edu) => (
            <Card
              key={edu._id}
              className='w-full ml-3 p-4 border-gray-600 text-start'
            >
              <h3 className='font-bold text-white'>
                {edu.degree} in {edu.fieldOfStudy}
              </h3>
              <p className='text-gray-400'>{edu.school}</p>
              <p className='text-gray-300'>
                {edu.startDate.split("T")[0]} - {edu.endDate.split("T")[0]}
              </p>
              <p className='text-gray-300'>Grade: {edu.grade}</p>
            </Card>
          ))}
          <h2 className='font-bold mt-1 text-white'>Projects</h2>
          {/* Add project details here */}
          <h2 className='font-bold mt-1 text-white'>Performance review</h2>
          {/* Add performance review here */}
        </div>
        <div className='w-full md:w-[30%] flex flex-col'>
          <Card className='w-full h-auto mr-2 gap-2 border-gray-700 text-sm p-3 flex flex-col items-start justify-start text-white'>
            <h2 className='font-bold'>Contact Information</h2>
            {applicant?.resume?.split("?")[0]?.length > 0 && (
              <div
                className='flex items-center gap-2'
                onClick={() => setViewResume(true)}
              >
                <FaAddressCard className='text-xl' />
                <span>Resume</span>
              </div>
            )}
            <div className='flex items-center gap-2'>
              <FaGithub className='text-xl' />
              <a
                href={applicant.links
                  ?.find(
                    (link) =>
                      link.type === "Link" && link.url.includes("github")
                  )
                  ?.url.trim()}
                target='_blank'
                rel='noopener noreferrer'
              >
                Github
              </a>
            </div>
            <div className='flex items-center gap-2'>
              <FaLinkedin className='text-xl' />
              <a
                href={applicant.links
                  ?.find(
                    (link) =>
                      link.type === "Link" && link.url.includes("linkedin")
                  )
                  ?.url.trim()}
                target='_blank'
                rel='noopener noreferrer'
              >
                LinkedIn
              </a>
            </div>
            <div className='flex items-center gap-2'>
              <FaEnvelope className='text-xl' />
              <a
                href={`mailto:${applicant.email}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {applicant.email}
              </a>
            </div>
            <div className='flex items-center gap-2'>
              <FaPhone className='text-xl' />
              <span>{applicant.phone}</span>
            </div>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Details;
