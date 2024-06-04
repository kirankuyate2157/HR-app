import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();
import {
  createApplicant,
  getAllApplicants,
  getApplicantById,
  updateApplicant,
  deleteApplicant,
  getAllApplicantsByMail,
  searchApplicants,
  getAllApplicantsByJobId,
} from "../controllers/applicant.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @route   POST /applicants
 * @desc    Create a new applicant
 * @access  Private
 * @body    jobId, fullName, email, phone, address, summary, skills, experience, education, links, resume, coverLetter, additionalInfo
 */
router.route("/").post( createApplicant);

/**
 * @route   GET /applicants/
 * @desc    Get all applicants for a specific job with pagination and sorting
 * @access  Private
 * @query   page, limit, sortBy, sortOrder
 * @param   jobId
 */
router.route("/").get(verifyJWT, getAllApplicants);

/**
 * @route   GET /applicants/job/:jobId
 * @desc    Get all applicants for a specific job with pagination and sorting
 * @access  Private
 * @query   page, limit, sortBy, sortOrder
 * @param   jobId
 */
router.route("/job/:jobId").get(verifyJWT, getAllApplicantsByJobId);

/**
 * @route   GET /applicants/email/:email
 * @desc    Get all applicants by email with pagination and sorting
 * @access  Private
 * @query   page, limit, sortBy, sortOrder
 * @param   email
 */
router.route("/email/:email").get(verifyJWT, getAllApplicantsByMail);

/**
 * @route   GET /applicants/search
 * @desc    Search for applicants with pagination and sorting
 * @access  Private
 * @query   query, page, limit, sortBy, sortOrder
 */
router.route("/search").get(verifyJWT, searchApplicants);

/**
 * @route   GET /applicants/:id
 * @desc    Get a single applicant by ID
 * @access  Private
 * @param   id
 */
router.route("/:id").get( getApplicantById);

/**
 * @route   PATCH /applicants/:id
 * @desc    Update an applicant by ID
 * @access  Private
 * @param   id
 * @body    Any applicant fields to update
 */
router.route("/:id").patch(verifyJWT, updateApplicant);

/**
 * @route   DELETE /applicants/:id
 * @desc    Delete an applicant by ID
 * @access  Private
 * @param   id
 */
router.route("/:id").delete(verifyJWT, deleteApplicant);

export default router;
