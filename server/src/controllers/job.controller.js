import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/job.model.js";

// Create a new job
const createJob = asyncHandler(async (req, res) => {
    const { title, description, company, location, salary, jobType, applicationDeadline, skills, experienceLevel } = req.body;

    console.log({ title, description, company, location, salary, jobType, applicationDeadline, skills, experienceLevel })
    if (!title || !description || !company || !location || !jobType || !skills || !experienceLevel) {
        throw new ApiError(400, "All required fields must be provided 🫠");
    }

    const job = new Job({
        userId: req.user.adminId ? req.user.adminId : req.user._id,
        JobBy: req.user._id,
        title,
        description,
        company,
        location,
        salary,
        jobType,
        applicationDeadline,
        skills: skills.split("-"),
        experienceLevel
    });

    const createdJob = await job.save();
    return res.status(201).json(new ApiResponse(201, createdJob, "Job created successfully ✅"));
});

// Get a job by ID
const getJobById = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (!job) {
        throw new ApiError(404, "Job not found 🫠");
    }
    return res.status(200).json(new ApiResponse(200, job, "Job fetched successfully ✅"));
});

// Get all jobs with pagination
const getAllJobs = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    console.log( req?.user?.adminId ?? req?.user?.id )
    // const jobs = await Job.find({ userId: req?.user?.adminId ?? req?.user?.id })
    //     .sort({ createdAt: -1, status: 1 })
    //     .skip((pageNumber - 1) * limitNumber)
    //     .limit(limitNumber);

    const totalJobs = await Job.countDocuments();

    const paginationInfo = {
        totalItems: totalJobs,
        totalPages: Math.ceil(totalJobs / limitNumber),
        currentPage: pageNumber,
        itemsPerPage: limitNumber,
    };

    return res.status(200).json(new ApiResponse(200, { jobs, pagination: paginationInfo }, "Jobs fetched successfully ✅"));
});


// Update a job by ID
const updateJobById = asyncHandler(async (req, res) => {
    // const { title, description, company, location, salary, jobType, applicationDeadline, skills, experienceLevel } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!updatedJob) {
        throw new ApiError(404, "Job not found 🫠");
    }

    return res.status(200).json(new ApiResponse(200, updatedJob, "Job updated successfully ✅"));
});

// Delete a job by ID
const deleteJobById = asyncHandler(async (req, res) => {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
        throw new ApiError(404, "Job not found 🫠");
    }
    return res.status(200).json(new ApiResponse(200, {}, "Job deleted successfully ✅"));
});

//search job
const searchJobs = asyncHandler(async (req, res) => {
    const { query, page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const jobs = await Job.find({
        $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { company: { $regex: query, $options: "i" } },
            { location: { $regex: query, $options: "i" } }
        ]
    })
        .sort({ createdAt: -1, status: 1 }) // Sort by createdAt descending and status ascending
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);

    const totalJobs = await Job.countDocuments({
        $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { company: { $regex: query, $options: "i" } },
            { location: { $regex: query, $options: "i" } }
        ]
    });

    const paginationInfo = {
        totalItems: totalJobs,
        totalPages: Math.ceil(totalJobs / limitNumber),
        currentPage: pageNumber,
        itemsPerPage: limitNumber,
    };

    return res.status(200).json(new ApiResponse(200, { jobs, pagination: paginationInfo }, "Jobs fetched successfully ✅"));
});

// List jobs posted by a specific user
const getJobsByUser = asyncHandler(async (req, res) => {
    const jobs = await Job.find({ JobBy: req.user._id });
    return res.status(200).json(new ApiResponse(200, jobs, "Jobs fetched successfully ✅"));
});

// Apply for a job (assuming an applications subdocument in Job model)
const applyForJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (!job) {
        throw new ApiError(404, "Job not found 🫠");
    }

    // Assuming you have a way to add an application to the job
    job.applications.push({ userId: req.user._id, date: new Date() });
    await job.save();

    return res.status(200).json(new ApiResponse(200, job, "Applied for job successfully ✅"));
});

export {
    createJob,
    getJobById,
    getAllJobs,
    updateJobById,
    deleteJobById,
    searchJobs,
    getJobsByUser,
    applyForJob
};
