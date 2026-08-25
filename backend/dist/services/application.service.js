"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationService = void 0;
const application_model_1 = require("../models/application.model");
const event_model_1 = require("../models/event.model");
const email_service_1 = require("./email.service");
const ApiError_1 = require("../utils/ApiError");
class ApplicationService {
    static async submitApplication(input) {
        console.log(`[Registration] Registration received for email: ${input.email}`);
        console.log(`[Registration] Saving registration to PostgreSQL database...`);
        // 1. Save application to PostgreSQL database
        const application = await application_model_1.ApplicationModel.create(input);
        console.log(`[Registration] Registration saved successfully. ID: ${application.id}`);
        // 2. Fetch event details if eventId is provided, or use default IoSC club event data
        let eventTitle = "Intel oneAPI Student Club Interview";
        let eventDate = "08/09/2026";
        let venue = "USAR, GGSIPU East Delhi Campus";
        if (input.eventId) {
            console.log(`[Registration] Fetching event details for eventId: ${input.eventId}...`);
            try {
                const dbEvent = await event_model_1.EventModel.findById(input.eventId);
                if (dbEvent) {
                    eventTitle = dbEvent.title;
                    venue = dbEvent.location;
                    eventDate = dbEvent.start_date
                        ? new Date(dbEvent.start_date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })
                        : undefined;
                    console.log(`[Registration] Event details fetched: ${eventTitle} at ${venue}`);
                }
            }
            catch (err) {
                console.warn("[Registration] Failed to query event details for email, using default event details:", err);
            }
        }
        // 3. Trigger reusable EmailService confirmation via Gmail SMTP
        let emailSent = false;
        try {
            emailSent = await email_service_1.EmailService.sendRegistrationConfirmation({
                user: {
                    name: application.full_name,
                    email: application.email,
                },
                event: {
                    title: eventTitle,
                    date: eventDate,
                    venue: venue,
                    emailSubject: `Registration Confirmed: ${eventTitle}`,
                    emailBody: `Hello {{name}},\n\nThank you for registering for {{event_name}} with the Intel oneAPI Student Club (GGSIPU EDC). Your registration has been received and confirmed.\n\nDate: {{event_date}}\nVenue: {{venue}}`,
                },
            });
        }
        catch (err) {
            console.error("[Registration] Error during sendRegistrationConfirmation:", err);
        }
        console.log(`[Registration] Workflow completed. Email sent status: ${emailSent}`);
        return {
            ...application,
            emailSent,
        };
    }
    static async getAllApplications(statusFilter) {
        return await application_model_1.ApplicationModel.findAll(statusFilter);
    }
    static async getApplicationById(id) {
        const app = await application_model_1.ApplicationModel.findById(id);
        if (!app) {
            throw new ApiError_1.ApiError(404, `Application with ID '${id}' not found`);
        }
        return app;
    }
    static async updateStatus(id, status) {
        const updated = await application_model_1.ApplicationModel.updateStatus(id, status);
        if (!updated) {
            throw new ApiError_1.ApiError(404, `Application with ID '${id}' not found`);
        }
        return updated;
    }
    static async deleteApplication(id) {
        const deleted = await application_model_1.ApplicationModel.delete(id);
        if (!deleted) {
            throw new ApiError_1.ApiError(404, `Application with ID '${id}' not found`);
        }
    }
}
exports.ApplicationService = ApplicationService;
