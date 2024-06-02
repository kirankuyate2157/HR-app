import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Applicant } from "../models/applicant.model.js";
import { Job } from "../models/job.model.js";

// Create a new applicant and update the job's applications array
const createApplicant = asyncHandler(async (req, res) => {
    const {
        jobId,
        fullName,
        email,
        phone,
        address,
        summary,
        skills,
        experience,
        education,
        links,
        resume,
        coverLetter,
        additionalInfo
    } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
        throw new ApiError(404, "Job not found 🫠");
    }

    const newApplicant = new Applicant({
        jobId,
        fullName,
        email,
        phone,
        address,
        summary,
        skills,
        experience,
        education,
        links,
        resume,
        coverLetter,
        additionalInfo
    });

    const savedApplicant = await newApplicant.save();

    // Update job's applications array
    job.applications.push({
        applicantId: savedApplicant._id,
        appliedDate: new Date()
    });
    await job.save();

    return res.status(201).json(new ApiResponse(201, savedApplicant, "Applicant created successfully ✅"));
});

// Get all applicants by job ID with pagination and sorting
const getAllApplicants = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const skip = (page - 1) * limit;
    const { jobId } = req.params;

    if (!jobId) {
        throw new ApiError(404, "Job ID required 🫠");
    }

    const applicants = await Applicant.find({ jobId })
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Applicant.countDocuments({ jobId });

    const paginationInfo = {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit),
    };

    return res.status(200).json(new ApiResponse(200, { applicants, pagination: paginationInfo }, "Applicants fetched successfully ✅"));
});

// Get all applicants by email with pagination and sorting
const getAllApplicantsByMail = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const { email } = req.params;
    const skip = (page - 1) * limit;

    if (!email) {
        throw new ApiError(404, "Email required 🫠");
    }

    const applicants = await Applicant.find({ email })
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Applicant.countDocuments({ email });

    const paginationInfo = {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit),
    };

    return res.status(200).json(new ApiResponse(200, { applicants, pagination: paginationInfo }, "Applicants fetched successfully ✅"));
});

const getApplicantById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const applicant = await Applicant.findById(id);

    if (!applicant) {
        throw new ApiError(404, "Applicant not found 🫠");
    }

    return res.status(200).json(new ApiResponse(200, applicant, "Applicant fetched successfully ✅"));
});

// Update an applicant by ID
const updateApplicant = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const updatedApplicant = await Applicant.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!updatedApplicant) {
        throw new ApiError(404, "Applicant not found 🫠");
    }

    return res.status(200).json(new ApiResponse(200, updatedApplicant, "Applicant updated successfully ✅"));
});

// Delete an applicant by ID
const deleteApplicant = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedApplicant = await Applicant.findByIdAndDelete(id);

    if (!deletedApplicant) {
        throw new ApiError(404, "Applicant not found 🫠");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Applicant deleted successfully ✅"));
});

// Search applicants with pagination and sorting
const searchApplicants = asyncHandler(async (req, res) => {
    const { query, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const skip = (page - 1) * limit;

    const searchCriteria = query ? {
        $or: [
            { fullName: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
            { phone: { $regex: query, $options: "i" } },
            { skills: { $regex: query, $options: "i" } },
            { summary: { $regex: query, $options: "i" } }
        ]
    } : {};

    const applicants = await Applicant.find(searchCriteria)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Applicant.countDocuments(searchCriteria);

    const paginationInfo = {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit),
    };

    return res.status(200).json(new ApiResponse(200, { applicants, pagination: paginationInfo }, "Applicants fetched successfully ✅"));
});

export {
    createApplicant,
    getAllApplicants,
    getApplicantById,
    updateApplicant,
    deleteApplicant,
    getAllApplicantsByMail,
    searchApplicants
};

