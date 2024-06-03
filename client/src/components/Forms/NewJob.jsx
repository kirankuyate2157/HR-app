import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createJob } from "./utils/apis";
import { showToast } from "@/utils/showToast";
const NewJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full-time", // Default value
    applicationDeadline: "",
    skills: "",
    experienceLevel: "Entry", // Default value
  });

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleExperienceLevelChange = (value) => {
    setFormData({
      ...formData,
      experienceLevel: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createJob(formData);
    console.log("respo : ", res);
    showToast(res?.message);
    setFormData({
      title: "",
      description: "",
      company: "",
      location: "",
      salary: "",
      jobType: "Full-time", // Default value
      applicationDeadline: "",
      skills: "",
      experienceLevel: "Entry", // Default value
    });
    console.log(formData);
    // Call your API to create a new job with formData
  };

  return (
    <div className='container max-w-[700px] mx-auto pb-20 px-4 sm:px-6 lg:px-8'>
      <h2 className='text-2xl font-bold pb-8'>Create a New Job</h2>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <Input
          type='text'
          id='title'
          name='title'
          value={formData.title}
          onChange={handleChange}
          placeholder='Title'
          required
        />
        <Textarea
          id='description'
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='Description'
          rows='5'
          required
          className='border border-gray-300 rounded-md p-2 w-full'
        />
        <div className='flex flex-col md:flex-row w-full gap-6'>
          <Input
            type='text'
            id='company'
            name='company'
            value={formData.company}
            onChange={handleChange}
            placeholder='Company'
            required
          />
          <Input
            type='text'
            id='location'
            name='location'
            value={formData.location}
            onChange={handleChange}
            placeholder='Location'
            required
          />
        </div>
        <div className='flex flex-col md:flex-row w-full gap-6'>
          <Input
            type='text'
            id='salary'
            name='salary'
            value={formData.salary}
            onChange={handleChange}
            placeholder='Salary'
          />
          <Select
            id='jobType'
            defaultValue={formData.experienceLevel}
            onChange={(value) => handleExperienceLevelChange(value, "jobType")}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder='Select a prefix' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Full-time'>Full-time</SelectItem>
              <SelectItem value='Part-time'>Part-time</SelectItem>
              <SelectItem value='Contract'>Contract</SelectItem>
              <SelectItem value='Temporary'>Temporary</SelectItem>
              <SelectItem value='Internship'>Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-col md:flex-row w-full gap-6'>
          <Select
            id='experienceLevel'
            defaultValue={formData.experienceLevel}
            onChange={(value) =>
              handleExperienceLevelChange(value, "experienceLevel")
            }
            required
          >
            <SelectTrigger>
              <SelectValue placeholder='Select an experience level' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Entry'>Entry</SelectItem>
              <SelectItem value='Mid'>Mid</SelectItem>
              <SelectItem value='Senior'>Senior</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type='date'
            id='applicationDeadline'
            name='applicationDeadline'
            value={formData.applicationDeadline}
            onChange={handleChange}
            placeholder='Application Deadline'
            required
          />
        </div>
        <Input
          type='text'
          id='skills'
          name='skills'
          value={formData.skills}
          onChange={handleChange}
          placeholder='Skills separate by " - "'
          required
        />
        <div className='flex justify-end'>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default NewJob;
