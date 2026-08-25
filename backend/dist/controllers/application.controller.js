"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationController = void 0;
const application_service_1 = require("../services/application.service");
const ApiResponse_1 = require("../utils/ApiResponse");
class ApplicationController {
    static async submitApplication(req, res, next) {
        try {
            const result = await application_service_1.ApplicationService.submitApplication(req.body);
            const emailSent = result.emailSent;
            const msg = emailSent
                ? "Application submitted successfully! A confirmation email has been sent to your inbox."
                : "Application submitted successfully! (Note: Confirmation email could not be sent)";
            res.status(201).json(new ApiResponse_1.ApiResponse(201, msg, result));
        }
        catch (error) {
            next(error);
        }
    }
    static async getAllApplications(req, res, next) {
        try {
            const status = req.query.status;
            const applications = await application_service_1.ApplicationService.getAllApplications(status);
            res.status(200).json(new ApiResponse_1.ApiResponse(200, "Applications retrieved successfully", applications));
        }
        catch (error) {
            next(error);
        }
    }
    static async getApplicationById(req, res, next) {
        try {
            const id = req.params.id;
            const application = await application_service_1.ApplicationService.getApplicationById(id);
            res.status(200).json(new ApiResponse_1.ApiResponse(200, "Application retrieved successfully", application));
        }
        catch (error) {
            next(error);
        }
    }
    static async updateStatus(req, res, next) {
        try {
            const id = req.params.id;
            const { status } = req.body;
            const application = await application_service_1.ApplicationService.updateStatus(id, status);
            res.status(200).json(new ApiResponse_1.ApiResponse(200, "Application status updated successfully", application));
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteApplication(req, res, next) {
        try {
            const id = req.params.id;
            await application_service_1.ApplicationService.deleteApplication(id);
            res.status(200).json(new ApiResponse_1.ApiResponse(200, "Application deleted successfully", null));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ApplicationController = ApplicationController;
