import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createApplicant } from "./utils/apis.js";
import { showToast } from "@/utils/showToast";
import uploadDoc from "@/utils/DocUpload.js";
import { Label } from "@/components/ui/label";
import { Card } from "../ui/card.jsx";
import { FaMapMarkerAlt, FaCalendarAlt, FaBriefcase } from "react-icons/fa";

const ddata = {
  fullName: "Shubham Gaikwad",
  email: "shubham.gaikwad@matoshri.edu.in",
  phone: "7083418824",
  address: "Pimpalgaon(B),Niphad,Nashik 422209",
  summary: "as a Java full stack dev, I enjoy dev. and data Science",
  skills:
    "React-Nodejs-ElectronJs-SpringBoot-MongoDB-SQL-JS-Python-Java-C++-AWS",
  experience: [
    {
      company: "Wipro",
      description:
        "worked on two app end-to-end developments of modules and updated 60% of apps",
      endDate: "2024-05-30",
      jobTitle: "Full-stack developer Intern (Java)",
      location: "Mumbai",
      startDate: "2024-01-31",
    },
    {
      company: "Wingiti PLT",
      description:
        "worked on the electron Dot.net app , team lead with updated 70% app, and launched App version 2.0 successfully",
      endDate: "2023-06-29",
      jobTitle: "SDE intern",
      location: "Nashik",
      startDate: "2023-01-27",
    },
  ],
  education: [
    {
      degree: "B.Tech",
      description: "learned new skills and completed 4 year in college",
      endDate: "2024-05-30",
      fieldOfStudy: "CSE",
      grade: "8.2",
      school: "Met college ,Nashik",
      startDate: "2020-10-15",
    },
  ],
  links:
    "https://github.com/kirankuyate2157 | https://kiran-kuyate-portfolio.vercel.app | https://www.linkedin.com/in/kirankuyate",
  resume:
    "https://s3.ap-south-1.amazonaws.com/kktest.dev/Kiran_Kuyate_2024_Resume.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6GBMBD574KILMFWQ%2F20240604%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240604T041238Z&X-Amz-Expires=900&X-Amz-Signature=1ef31ddeeb15950c2730d0a5efb8c6071f1f673bb8371b2bf1512a961dbfb4ec&X-Amz-SignedHeaders=host&x-id=GetObject",
  photo:
    "https://s3.ap-south-1.amazonaws.com/kktest.dev/pf1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6GBMBD574KILMFWQ%2F20240604%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240604T041246Z&X-Amz-Expires=900&X-Amz-Signature=f9a3bb40fe2e835211c8555099ca4ecbc0b93761f5619c66a4d88a8de8ad7b2e&X-Amz-SignedHeaders=host&x-id=GetObject",
  coverLetter: "cover letter not want to do",
  additionalInfo: "",
};
const JobApplication = ({ jobId,job }) => {
  // const [formData, setFormData] = useState({ ...ddata });

  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    skills: "",
    experience: [],
    education: [],
    links: [],
    resume: "",
    photo: "",
    coverLetter: "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    const blobUrl = URL.createObjectURL(file);
    const url = await uploadDoc(file);
    showToast(name + "  Uploaded ✅");
    setFormData({
      ...formData,
      [name]: url ?? blobUrl,
    });
  };

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          school: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          grade: "",
          description: "",
        },
      ],
    });
  };

  const handleExperienceChange = (index, e) => {
    const updatedExperience = formData.experience.map((exp, i) =>
      i === index ? { ...exp, [e.target.name]: e.target.value } : exp
    );
    setFormData({ ...formData, experience: updatedExperience });
  };

  const handleEducationChange = (index, e) => {
    const updatedEducation = formData.education.map((edu, i) =>
      i === index ? { ...edu, [e.target.name]: e.target.value } : edu
    );
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createApplicant({ ...formData, jobId });
    showToast(res?.message);
    setFormData({
      fullName: "",
      title: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
      skills: "",
      experience: [],
      education: [],
      links: [],
      resume: "",
      photo: "",
      coverLetter: "",
      additionalInfo: "",
    });
  };
  return (
    <div className='container max-w-[700px] mx-auto pb-20 px-4 sm:px-6 lg:px-8'>
      
      <Card className="w-full h-auto p-6 my-6  border-gray-700 text-white">
        <h2 className="text-2xl font-bold mb-4">{job?.title}</h2>
        <p className="text-gray-300 text-left mb-4">{job?.description}</p>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-lg" />
            <span>{job?.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBriefcase className="text-lg" />
            <span>{job?.experienceLevel}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-lg" />
            <span>Deadline: {new Date(job?.applicationDeadline)?.toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-bold">Skills Required</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {job?.skills?.map((skill, index) => (
              <span key={index} className="p-1 px-2 text-sm bg-pink-900 rounded-lg">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Card>
      <h2 className='text-2xl font-bold pb-8'>Job Application</h2>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <Input
          type='text'
          id='fullName'
          name='fullName'
          value={formData.fullName}
          onChange={handleChange}
          placeholder='Full Name'
          required
        />
        <div className='flex flex-col md:flex-row w-full gap-3'>
          <Input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
            required
          />
          <Input
            type='text'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            placeholder='Phone'
            required
          />
        </div>
        <Input
          type='text'
          id='address'
          name='address'
          value={formData.address}
          onChange={handleChange}
          placeholder='Address'
          required
        />
        <Input
          type='text'
          id='title'
          name='title'
          value={formData.title}
          onChange={handleChange}
          placeholder='Title or Tagline (e.g., full stack developer)'
          required
        />
        <Textarea
          id='summary'
          name='summary'
          value={formData.summary}
          onChange={handleChange}
          placeholder='Summary'
          rows='5'
          className='rounded-md p-2 w-full'
        />
        <Input
          type='text'
          id='skills'
          name='skills'
          value={formData.skills}
          onChange={handleChange}
          placeholder='Skills separate by " - "'
          required
        />
        <div className='w-full flex flex-col items-start gap-6'>
          <h3 className='text-lg font-bold '>Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className='w-full space-y-3'>
              <Input
                type='text'
                name='jobTitle'
                value={exp.jobTitle}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder='Job Title'
                required
              />
              <Input
                type='text'
                name='company'
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder='Company'
                required
              />
              <Input
                type='text'
                name='location'
                value={exp.location}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder='Location'
                required
              />
              <div className='flex flex-col md:flex-row w-full gap-3'>
                <Input
                  type='date'
                  name='startDate'
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(index, e)}
                  placeholder='Start Date'
                  required
                />
                <Input
                  type='date'
                  name='endDate'
                  value={exp.endDate}
                  onChange={(e) => handleExperienceChange(index, e)}
                  placeholder='End Date'
                />
              </div>
              <Textarea
                name='description'
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder='Description'
                rows='3'
              />
            </div>
          ))}
          <div className='w-full flex justify-center'>
            <Button onClick={handleAddExperience} className='my-3 h-7 w-auto'>
              Add Experience
            </Button>
          </div>
        </div>
        <div className='w-full flex flex-col items-start gap-6'>
          <h3 className='text-lg font-bold'>Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className='w-full space-y-3'>
              <Input
                type='text'
                name='school'
                value={edu.school}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder='School'
                required
              />
              <div className='flex flex-col md:flex-row w-full gap-3'>
                <Input
                  type='text'
                  name='degree'
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, e)}
                  placeholder='Degree'
                  required
                />
                <Input
                  type='text'
                  name='fieldOfStudy'
                  value={edu.fieldOfStudy}
                  onChange={(e) => handleEducationChange(index, e)}
                  placeholder='Field of Study'
                  required
                />
              </div>
              <div className='flex flex-col md:flex-row w-full gap-3'>
                <Input
                  type='date'
                  name='startDate'
                  value={edu.startDate}
                  onChange={(e) => handleEducationChange(index, e)}
                  placeholder='Start Date'
                  required
                />
                <Input
                  type='date'
                  name='endDate'
                  value={edu.endDate}
                  onChange={(e) => handleEducationChange(index, e)}
                  placeholder='End Date'
                />
              </div>
              <Input
                type='text'
                name='grade'
                value={edu.grade}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder='Grade'
              />
              <Textarea
                name='description'
                value={edu.description}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder='Description'
                rows='3'
              />
            </div>
          ))}
          <div className='w-full flex justify-center'>
            <Button onClick={handleAddEducation} className='my-3 h-7 w-auto'>
              Add Education
            </Button>
          </div>
        </div>
        <div className='flex flex-col items-start gap-6'>
          <h3 className='text-lg font-bold'>Additional Links</h3>
          <Input
            type='text'
            name='links'
            value={formData.links}
            onChange={handleChange}
            placeholder='Links (e.g., LinkedIn, GitHub) separate by " | "'
          />
        </div>
        <div className='flex flex-col gap-4'>
          <Label htmlFor='resume' className='text-left leading-4'>
            Resume/CV*
          </Label>
          <Input
            type='file'
            id='resume'
            name='resume'
            onChange={handleFileChange}
            placeholder='Upload Resume'
            required
          />
        </div>
        <div className='flex flex-col gap-4'>
          <Label htmlFor='resume' className='text-left leading-4'>
            Photo
          </Label>
          <Input
            type='file'
            id='photo'
            name='photo'
            onChange={handleFileChange}
            placeholder='Upload photo'
          />
        </div>
        <Textarea
          id='coverLetter'
          name='coverLetter'
          value={formData.coverLetter}
          onChange={handleChange}
          placeholder='Cover Letter'
          rows='5'
        />
        <Textarea
          id='additionalInfo'
          name='additionalInfo'
          value={formData.additionalInfo}
          onChange={handleChange}
          placeholder='Additional Information'
          rows='5'
        />
        <div className='flex justify-end'>
          <Button type='submit'>Submit Application</Button>
        </div>
      </form>
    </div>
  );
};

export default JobApplication;
