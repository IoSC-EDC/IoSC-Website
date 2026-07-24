import { Router } from "express";
import { ApplicationController } from "../controllers/application.controller";
import { validateRequest } from "../middlewares/validate.middleware";
import { createApplicationSchema, updateApplicationStatusSchema } from "../schemas/application.schema";

const router = Router();

/**
 * @route   POST /api/v1/applications
 * @desc    Submit a new student membership application
 * @access  Public
 */
router.post("/", validateRequest(createApplicationSchema), ApplicationController.submitApplication);

/**
 * @route   GET /api/v1/applications
 * @desc    Fetch all membership applications (optional ?status=PENDING)
 * @access  Admin / Public
 */
router.get("/", ApplicationController.getAllApplications);

/**
 * @route   GET /api/v1/applications/:id
 * @desc    Fetch single application details by ID
 * @access  Admin / Public
 */
router.get("/:id", ApplicationController.getApplicationById);

/**
 * @route   PATCH /api/v1/applications/:id/status
 * @desc    Update application review status (PENDING, UNDER_REVIEW, ACCEPTED, REJECTED)
 * @access  Admin
 */
router.patch("/:id/status", validateRequest(updateApplicationStatusSchema), ApplicationController.updateStatus);

/**
 * @route   DELETE /api/v1/applications/:id
 * @desc    Delete an application
 * @access  Admin
 */
router.delete("/:id", ApplicationController.deleteApplication);

export default router;
