import { Request, Response, NextFunction } from "express";
import { ApplicationService } from "../services/application.service";
import { ApiResponse } from "../utils/ApiResponse";

export class ApplicationController {
  static async submitApplication(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await ApplicationService.submitApplication(req.body);
      const emailSent = (result as any).emailSent;
      const msg = emailSent
        ? "Application submitted successfully! A confirmation email has been sent to your inbox."
        : "Application submitted successfully! (Note: Confirmation email could not be sent)";
      res.status(201).json(new ApiResponse(201, msg, result));
    } catch (error) {
      next(error);
    }
  }

  static async getAllApplications(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const status = req.query.status as string | undefined;
      const applications = await ApplicationService.getAllApplications(status);
      res.status(200).json(new ApiResponse(200, "Applications retrieved successfully", applications));
    } catch (error) {
      next(error);
    }
  }

  static async getApplicationById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const application = await ApplicationService.getApplicationById(id);
      res.status(200).json(new ApiResponse(200, "Application retrieved successfully", application));
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const { status } = req.body;
      const application = await ApplicationService.updateStatus(id, status);
      res.status(200).json(new ApiResponse(200, "Application status updated successfully", application));
    } catch (error) {
      next(error);
    }
  }

  static async deleteApplication(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      await ApplicationService.deleteApplication(id);
      res.status(200).json(new ApiResponse(200, "Application deleted successfully", null));
    } catch (error) {
      next(error);
    }
  }
}
