import { Request, Response, NextFunction } from "express";
import { EventService } from "../services/event.service";
import { ApiResponse } from "../utils/ApiResponse";

export class EventController {
  static async getAllEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const archived = req.query.archived as string | undefined;
      const events = await EventService.getAllEvents(archived);
      res.status(200).json(new ApiResponse(200, "Events retrieved successfully", events));
    } catch (error) {
      next(error);
    }
  }

  static async getEventById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const event = await EventService.getEventById(id);
      res.status(200).json(new ApiResponse(200, "Event retrieved successfully", event));
    } catch (error) {
      next(error);
    }
  }

  static async createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const event = await EventService.createEvent(req.body);
      res.status(201).json(new ApiResponse(201, "Event created successfully", event));
    } catch (error) {
      next(error);
    }
  }

  static async updateEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const event = await EventService.updateEvent(id, req.body);
      res.status(200).json(new ApiResponse(200, "Event updated successfully", event));
    } catch (error) {
      next(error);
    }
  }

  static async deleteEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      await EventService.deleteEvent(id);
      res.status(200).json(new ApiResponse(200, "Event deleted successfully", null));
    } catch (error) {
      next(error);
    }
  }
}
