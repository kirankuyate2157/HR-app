import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createJob,
  getJobById,
  getAllJobs,
  updateJobById,
  deleteJobById,
  searchJobs,
  getJobsByUser,
  applyForJob,
} from "../controllers/job.controller.js";

const router = Router();

/**
 * @route   POST /
 * @desc    Create a new job
 * @access  Private
 */
router.route("/").post(verifyJWT, createJob);

/**
 * @route   GET /:id
 * @desc    Get a job by ID
 * @access  Public
 */
router.route("/:id").get(getJobById);

/**
 * @route   GET /
 * @desc    Get all jobs with pagination
 * @access  Public
 */
router.route("/").get(getAllJobs);

/**
 * @route   PATCH /:id
 * @desc    Update a job by ID
 * @access  Private
 */
router.route("/:id").patch(verifyJWT, updateJobById);

/**
 * @route   DELETE /:id
 * @desc    Delete a job by ID
 * @access  Private
 */
router.route("/:id").delete(verifyJWT, deleteJobById);

/**
 * @route   GET /search
 * @desc    Search for jobs
 * @access  Public
 */
router.route("/search").get(searchJobs);

/**
 * @route   GET /user
 * @desc    List jobs posted by a specific user
 * @access  Private
 */
router.route("/user").get(verifyJWT, getJobsByUser);

/**
 * @route   POST /:id/apply
 * @desc    Apply for a job
 * @access  Private
 */
router.route("/:id/apply").post(verifyJWT, applyForJob);

export default router;
