"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const event_schema_1 = require("../schemas/event.schema");
const router = (0, express_1.Router)();
/**
 * @route   GET /api/v1/events
 * @desc    Fetch all events (supports ?archived=true/false)
 * @access  Public
 */
router.get("/", event_controller_1.EventController.getAllEvents);
/**
 * @route   GET /api/v1/events/:id
 * @desc    Fetch single event details by UUID
 * @access  Public
 */
router.get("/:id", (0, validate_middleware_1.validateRequest)(event_schema_1.getEventByIdSchema), event_controller_1.EventController.getEventById);
/**
 * @route   POST /api/v1/events
 * @desc    Create a new event
 * @access  Public / Admin
 */
router.post("/", (0, validate_middleware_1.validateRequest)(event_schema_1.createEventSchema), event_controller_1.EventController.createEvent);
/**
 * @route   PUT /api/v1/events/:id
 * @desc    Update existing event details
 * @access  Public / Admin
 */
router.put("/:id", (0, validate_middleware_1.validateRequest)(event_schema_1.updateEventSchema), event_controller_1.EventController.updateEvent);
/**
 * @route   DELETE /api/v1/events/:id
 * @desc    Delete event by UUID
 * @access  Public / Admin
 */
router.delete("/:id", (0, validate_middleware_1.validateRequest)(event_schema_1.getEventByIdSchema), event_controller_1.EventController.deleteEvent);
exports.default = router;
