import { Router } from "express";
import { EventController } from "../controllers/event.controller";
import { validateRequest } from "../middlewares/validate.middleware";
import { createEventSchema, updateEventSchema, getEventByIdSchema } from "../schemas/event.schema";

const router = Router();

/**
 * @route   GET /api/v1/events
 * @desc    Fetch all events (supports ?archived=true/false)
 * @access  Public
 */
router.get("/", EventController.getAllEvents);

/**
 * @route   GET /api/v1/events/:id
 * @desc    Fetch single event details by UUID
 * @access  Public
 */
router.get("/:id", validateRequest(getEventByIdSchema), EventController.getEventById);

/**
 * @route   POST /api/v1/events
 * @desc    Create a new event
 * @access  Public / Admin
 */
router.post("/", validateRequest(createEventSchema), EventController.createEvent);

/**
 * @route   PUT /api/v1/events/:id
 * @desc    Update existing event details
 * @access  Public / Admin
 */
router.put("/:id", validateRequest(updateEventSchema), EventController.updateEvent);

/**
 * @route   DELETE /api/v1/events/:id
 * @desc    Delete event by UUID
 * @access  Public / Admin
 */
router.delete("/:id", validateRequest(getEventByIdSchema), EventController.deleteEvent);

export default router;
