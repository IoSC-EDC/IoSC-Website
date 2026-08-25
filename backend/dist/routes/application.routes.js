"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const application_controller_1 = require("../controllers/application.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const application_schema_1 = require("../schemas/application.schema");
const router = (0, express_1.Router)();
/**
 * @route   POST /api/v1/applications
 * @desc    Submit a new student membership application
 * @access  Public
 */
router.post("/", (0, validate_middleware_1.validateRequest)(application_schema_1.createApplicationSchema), application_controller_1.ApplicationController.submitApplication);
/**
 * @route   GET /api/v1/applications
 * @desc    Fetch all membership applications (optional ?status=PENDING)
 * @access  Admin / Public
 */
router.get("/", application_controller_1.ApplicationController.getAllApplications);
/**
 * @route   GET /api/v1/applications/:id
 * @desc    Fetch single application details by ID
 * @access  Admin / Public
 */
router.get("/:id", application_controller_1.ApplicationController.getApplicationById);
/**
 * @route   PATCH /api/v1/applications/:id/status
 * @desc    Update application review status (PENDING, UNDER_REVIEW, ACCEPTED, REJECTED)
 * @access  Admin
 */
router.patch("/:id/status", (0, validate_middleware_1.validateRequest)(application_schema_1.updateApplicationStatusSchema), application_controller_1.ApplicationController.updateStatus);
/**
 * @route   DELETE /api/v1/applications/:id
 * @desc    Delete an application
 * @access  Admin
 */
router.delete("/:id", application_controller_1.ApplicationController.deleteApplication);
exports.default = router;
