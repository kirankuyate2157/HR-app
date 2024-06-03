import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Employee } from "../models/employee.model.js";
import { Applicant } from "../models/applicant.model.js";
import { Job } from "../models/job.model.js";

// Create a new Employee
const createEmployee = asyncHandler(async (req, res) => {
    const { applicantId, company, role, salary, fromDate, toDate, benefits, reviews, experience, recommendations } = req.body;

    const applicant = await Applicant.findById(applicantId);
    if (!applicant) {
        throw new ApiError(404, "Applicant not found 🫠");
    }

    const job = await Job.findById(applicant.jobId);
    if (!job) {
        throw new ApiError(404, "Job not found 🫠");
    }

    const employee = new Employee({
        company,
        role,
        salary,
        fromDate,
        toDate,
        benefits,
        reviews,
        experience,
        recommendations,
        applicantId,
        selectedBy: req.user._id,
    });

    const createdEmployee = await employee.save();
    return res.status(201).json(new ApiResponse(201, createdEmployee, "Employee created successfully ✅"));
});

// Get Employee by ID
const getEmployeeById = asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id).populate('applicantId').populate('selectedBy');
    if (!employee) {
        throw new ApiError(404, "Employee not found 🫠");
    }
    return res.status(200).json(new ApiResponse(200, employee, "Employee fetched successfully ✅"));
});


// Search employees
const searchEmployees = asyncHandler(async (req, res) => {
    const { query, page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const employees = await Employee.find({
        $or: [
            { company: { $regex: query, $options: "i" } },
            { role: { $regex: query, $options: "i" } },
            { experience: { $regex: query, $options: "i" } },
        ]
    })
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);

    const totalEmployees = await Employee.countDocuments({
        $or: [
            { company: { $regex: query, $options: "i" } },
            { role: { $regex: query, $options: "i" } },
            { experience: { $regex: query, $options: "i" } },
        ]
    });

    const paginationInfo = {
        totalItems: totalEmployees,
        totalPages: Math.ceil(totalEmployees / limitNumber),
        currentPage: pageNumber,
        itemsPerPage: limitNumber,
    };

    return res.status(200).json(new ApiResponse(200, { employees, pagination: paginationInfo }, "Employees fetched successfully ✅"));
});

// Get all employees by company, job ID, or user ID
const getAllEmployees = asyncHandler(async (req, res) => {
    const { company, jobId, userId, page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const filter = {};
    if (company) filter.company = company;
    if (jobId) filter.jobId = jobId;
    if (userId) filter.selectedBy = userId;

    const employees = await Employee.find(filter)
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber)
        .populate('applicantId')
        .populate('selectedBy');

    const totalEmployees = await Employee.countDocuments(filter);

    const paginationInfo = {
        totalItems: totalEmployees,
        totalPages: Math.ceil(totalEmployees / limitNumber),
        currentPage: pageNumber,
        itemsPerPage: limitNumber,
    };

    return res.status(200).json(new ApiResponse(200, { employees, pagination: paginationInfo }, "Employees fetched successfully ✅"));
});

export {
    createEmployee,
    getEmployeeById,
    getAllEmployees,
    searchEmployees
};
