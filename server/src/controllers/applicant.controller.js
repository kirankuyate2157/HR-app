import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Applicant } from "../models/applicant.model.js";
import { Job } from "../models/job.model.js";
import { resolveContent } from "nodemailer/lib/shared/index.js";

// Create a new applicant and update the job's applications array
const createApplicant = asyncHandler(async (req, res) => {
    console.log("createApplicant : " + req.body);
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
        photo,
        coverLetter,
        additionalInfo
    } = req.body;


    const job = await Job.findOne({ JobId: jobId });
    if (!job) {
        throw new ApiError(404, "Job not found 🫠", res);
    }
    console.log(job)
    console.log({
        jobId: job._id,
        fullName,
        email,
        phone,
        address,
        summary,
        skills: skills?.split('-'),
        experience,
        education,
        links: links?.trim()?.split('|').map(link => ({ type: 'Link', url: link })), // Ensure links are stored as an array of objects
        resume,
        photo,
        coverLetter,
        additionalInfo
    })
    const newApplicant = new Applicant({
        jobId: job._id,
        fullName,
        email,
        phone,
        address,
        summary,
        skills: skills?.split('-'),
        experience,
        education,
        links: links.trim().split('|').map(link => ({ type: 'Link', url: link })), // Ensure links are stored as an array of objects
        resume,
        photo,
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
const getAllApplicantsByJobId = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const skip = (page - 1) * limit;
    const { jobId } = req.params;

    if (!jobId) {
        throw new ApiError(404, "Job ID required 🫠", res);
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

// Get all applicants by job ID with pagination and sorting
const getAllApplicants = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const skip = (page - 1) * limit;


    const applicants = await Applicant.find()
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Applicant.countDocuments();

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
        throw new ApiError(404, "Email required 🫠", res);
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
        throw new ApiError(404, "Applicant not found 🫠", res);
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
        throw new ApiError(404, "Applicant not found 🫠", res);
    }

    return res.status(200).json(new ApiResponse(200, updatedApplicant, "Applicant updated successfully ✅"));
});

// Delete an applicant by ID
const deleteApplicant = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedApplicant = await Applicant.findByIdAndDelete(id);

    if (!deletedApplicant) {
        throw new ApiError(404, "Applicant not found 🫠", res);
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

// Update application status and send email
const updateApplicationStatus = asyncHandler(async (req, res) => {
    const { applicantId, status } = req.body;

    const applicant = await Applicant.findById(applicantId);
    if (!applicant) {
        throw new ApiError(404, "Applicant not found 🫠", res);
    }

    const job = await Job.findById(applicant.jobId);
    if (!job) {
        throw new ApiError(404, "Job not found 🫠", res);
    }

    // Check authorization
    if (req.user._id.toString() !== job.JobBy.toString() && req.user.adminId !== job.JobBy.toString()) {
        throw new ApiError(403, "You are not authorized to update this application status 🫠");
    }

    const statusUpdate = {
        status,
        updatedBy: req.user._id
    };

    applicant.selectionStatus.push(statusUpdate);
    await applicant.save();

    // Send email based on status
    let emailSubject, emailBody;
    switch (status) {
        case 'Accepted':
            emailSubject = 'Application Accepted';
            emailBody = 'Congratulations! Your application has been accepted.';
            break;
        case 'Assessment':
            emailSubject = 'Assessment Scheduled';
            emailBody = 'You have been scheduled for an assessment.';
            break;
        case 'Technical Interview':
            emailSubject = 'Technical Interview Scheduled';
            emailBody = 'You have been scheduled for a technical interview.';
            break;
        case 'HR Round':
            emailSubject = 'HR Round Scheduled';
            emailBody = 'You have been scheduled for an HR round.';
            break;
        case 'Offer':
            emailSubject = 'Job Offer';
            emailBody = 'We are pleased to offer you the position.';
            break;
        default:
            emailSubject = 'Application Status Updated';
            emailBody = `Your application status has been updated to: ${status}`;
    }

    // await sendEmail(applicant.email, emailSubject, emailBody);

    return res.status(200).json(new ApiResponse(200, applicant, "Application status updated successfully ✅"));
});

export {
    createApplicant,
    getAllApplicants,
    getApplicantById,
    updateApplicant,
    deleteApplicant,
    getAllApplicantsByMail,
    searchApplicants,
    getAllApplicantsByJobId
};

