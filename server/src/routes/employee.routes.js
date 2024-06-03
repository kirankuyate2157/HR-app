import { Router } from "express";
import {
    createEmployee,
    getEmployeeById,
    searchEmployees,
    getAllEmployees
} from "../controllers/employee.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @route POST /
 * @desc Create a new employee from an applicant
 * @access Private
 * @Body  employee data like applicantId*, company, role, salary, fromDate and more..
 */
router.route("/").post(verifyJWT, createEmployee);

/**
 * @route GET /:id
 * @desc Get an employee by ID
 * @access Private
 */
router.route("/:id").get(verifyJWT, getEmployeeById);

/**
 * @route GET /search
 * @desc Search employees by company, role, or experience
 * @access Private
 */
router.route("/search").get(verifyJWT, searchEmployees);

/**
 * @route GET /
 * @desc Get all employees by company, job ID, or user ID
 * @access Private
 */
router.route("/").get(verifyJWT, getAllEmployees);

export default router;
