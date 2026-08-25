"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const event_service_1 = require("../services/event.service");
const ApiResponse_1 = require("../utils/ApiResponse");
class EventController {
    static async getAllEvents(req, res, next) {
        try {
            const archived = req.query.archived;
            const events = await event_service_1.EventService.getAllEvents(archived);
            res.status(200).json(new ApiResponse_1.ApiResponse(200, "Events retrieved successfully", events));
        }
        catch (error) {
            next(error);
        }
    }
    static async getEventById(req, res, next) {
        try {
            const id = req.params.id;
            const event = await event_service_1.EventService.getEventById(id);
            res.status(200).json(new ApiResponse_1.ApiResponse(200, "Event retrieved successfully", event));
        }
        catch (error) {
            next(error);
        }
    }
    static async createEvent(req, res, next) {
        try {
            const event = await event_service_1.EventService.createEvent(req.body);
            res.status(201).json(new ApiResponse_1.ApiResponse(201, "Event created successfully", event));
        }
        catch (error) {
            next(error);
        }
    }
    static async updateEvent(req, res, next) {
        try {
            const id = req.params.id;
            const event = await event_service_1.EventService.updateEvent(id, req.body);
            res.status(200).json(new ApiResponse_1.ApiResponse(200, "Event updated successfully", event));
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteEvent(req, res, next) {
        try {
            const id = req.params.id;
            await event_service_1.EventService.deleteEvent(id);
            res.status(200).json(new ApiResponse_1.ApiResponse(200, "Event deleted successfully", null));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.EventController = EventController;
