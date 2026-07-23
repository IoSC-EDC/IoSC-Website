import { EventModel, EventEntity } from "../models/event.model";
import { CreateEventInput, UpdateEventInput } from "../schemas/event.schema";
import { ApiError } from "../utils/ApiError";

export class EventService {
  static async getAllEvents(archivedFilter?: string): Promise<EventEntity[]> {
    let filter: boolean | undefined = undefined;
    if (archivedFilter === "true") filter = true;
    if (archivedFilter === "false") filter = false;

    return await EventModel.findAll(filter);
  }

  static async getEventById(id: string): Promise<EventEntity> {
    const event = await EventModel.findById(id);
    if (!event) {
      throw new ApiError(404, `Event with ID '${id}' not found`);
    }
    return event;
  }

  static async createEvent(input: CreateEventInput): Promise<EventEntity> {
    if (input.endDate && new Date(input.endDate) < new Date(input.startDate)) {
      throw new ApiError(400, "Event end date cannot be earlier than start date");
    }

    return await EventModel.create(input);
  }

  static async updateEvent(id: string, input: UpdateEventInput): Promise<EventEntity> {
    const existing = await EventModel.findById(id);
    if (!existing) {
      throw new ApiError(404, `Event with ID '${id}' not found`);
    }

    const startDate = input.startDate || existing.start_date.toISOString();
    const endDate = input.endDate !== undefined ? input.endDate : existing.end_date?.toISOString();

    if (endDate && new Date(endDate) < new Date(startDate)) {
      throw new ApiError(400, "Event end date cannot be earlier than start date");
    }

    const updated = await EventModel.update(id, input);
    if (!updated) {
      throw new ApiError(500, "Failed to update event record");
    }
    return updated;
  }

  static async deleteEvent(id: string): Promise<void> {
    const deleted = await EventModel.delete(id);
    if (!deleted) {
      throw new ApiError(404, `Event with ID '${id}' not found`);
    }
  }
}
