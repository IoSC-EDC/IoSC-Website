"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const event_model_1 = require("../models/event.model");
const ApiError_1 = require("../utils/ApiError");
class EventService {
    static async getAllEvents(archivedFilter) {
        let filter = undefined;
        if (archivedFilter === "true")
            filter = true;
        if (archivedFilter === "false")
            filter = false;
        return await event_model_1.EventModel.findAll(filter);
    }
    static async getEventById(id) {
        const event = await event_model_1.EventModel.findById(id);
        if (!event) {
            throw new ApiError_1.ApiError(404, `Event with ID '${id}' not found`);
        }
        return event;
    }
    static async createEvent(input) {
        if (input.endDate && new Date(input.endDate) < new Date(input.startDate)) {
            throw new ApiError_1.ApiError(400, "Event end date cannot be earlier than start date");
        }
        return await event_model_1.EventModel.create(input);
    }
    static async updateEvent(id, input) {
        const existing = await event_model_1.EventModel.findById(id);
        if (!existing) {
            throw new ApiError_1.ApiError(404, `Event with ID '${id}' not found`);
        }
        const startDate = input.startDate || existing.start_date.toISOString();
        const endDate = input.endDate !== undefined ? input.endDate : existing.end_date?.toISOString();
        if (endDate && new Date(endDate) < new Date(startDate)) {
            throw new ApiError_1.ApiError(400, "Event end date cannot be earlier than start date");
        }
        const updated = await event_model_1.EventModel.update(id, input);
        if (!updated) {
            throw new ApiError_1.ApiError(500, "Failed to update event record");
        }
        return updated;
    }
    static async deleteEvent(id) {
        const deleted = await event_model_1.EventModel.delete(id);
        if (!deleted) {
            throw new ApiError_1.ApiError(404, `Event with ID '${id}' not found`);
        }
    }
}
exports.EventService = EventService;
