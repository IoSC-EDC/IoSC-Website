import { ApplicationModel, ApplicationEntity } from "../models/application.model";
import { EventModel } from "../models/event.model";
import { CreateApplicationInput } from "../schemas/application.schema";
import { EmailService } from "./email.service";
import { ApiError } from "../utils/ApiError";

export class ApplicationService {
  static async submitApplication(input: CreateApplicationInput): Promise<ApplicationEntity> {
    console.log(`[Registration] Registration received for email: ${input.email}`);
    console.log(`[Registration] Saving registration to PostgreSQL database...`);

    // 1. Save application to PostgreSQL database
    const application = await ApplicationModel.create(input);
    console.log(`[Registration] Registration saved successfully. ID: ${application.id}`);

    // 2. Fetch event details if eventId is provided, or use default IoSC club event data
    let eventTitle = "Intel oneAPI Student Club Interview";
    let eventDate: string | undefined = "08/09/2026";
    let venue: string | undefined = "USAR, GGSIPU East Delhi Campus";

    if (input.eventId) {
      console.log(`[Registration] Fetching event details for eventId: ${input.eventId}...`);
      try {
        const dbEvent = await EventModel.findById(input.eventId);
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
      } catch (err) {
        console.warn("[Registration] Failed to query event details for email, using default event details:", err);
      }
    }

    // 3. Trigger reusable EmailService confirmation via Gmail SMTP
    let emailSent = false;
    try {
      emailSent = await EmailService.sendRegistrationConfirmation({
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
    } catch (err) {
      console.error("[Registration] Error during sendRegistrationConfirmation:", err);
    }

    console.log(`[Registration] Workflow completed. Email sent status: ${emailSent}`);

    return {
      ...application,
      emailSent,
    } as ApplicationEntity & { emailSent: boolean };
  }

  static async getAllApplications(statusFilter?: string): Promise<ApplicationEntity[]> {
    return await ApplicationModel.findAll(statusFilter);
  }

  static async getApplicationById(id: string): Promise<ApplicationEntity> {
    const app = await ApplicationModel.findById(id);
    if (!app) {
      throw new ApiError(404, `Application with ID '${id}' not found`);
    }
    return app;
  }

  static async updateStatus(id: string, status: string): Promise<ApplicationEntity> {
    const updated = await ApplicationModel.updateStatus(id, status);
    if (!updated) {
      throw new ApiError(404, `Application with ID '${id}' not found`);
    }
    return updated;
  }

  static async deleteApplication(id: string): Promise<void> {
    const deleted = await ApplicationModel.delete(id);
    if (!deleted) {
      throw new ApiError(404, `Application with ID '${id}' not found`);
    }
  }
}
