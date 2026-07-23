import { z } from "zod";

export const createEventSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").max(200),
    eventType: z.string().min(2, "Event type is required (e.g. Hackathon, Workshop)"),
    description: z.string().optional(),
    location: z.string().min(2, "Location is required (e.g. Online, USAR Campus)"),
    startDate: z.string().datetime({ message: "startDate must be a valid ISO timestamp" }),
    endDate: z.string().datetime({ message: "endDate must be a valid ISO timestamp" }).optional(),
    registrationLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    accentColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid hex color").optional(),
    isArchived: z.boolean().optional().default(false),
  }),
});

export const updateEventSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid Event UUID format"),
  }),
  body: z.object({
    title: z.string().min(3).max(200).optional(),
    eventType: z.string().min(2).optional(),
    description: z.string().optional(),
    location: z.string().min(2).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    registrationLink: z.string().url().optional().or(z.literal("")),
    accentColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
    isArchived: z.boolean().optional(),
  }),
});

export const getEventByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid Event UUID format"),
  }),
});

export type CreateEventInput = z.infer<typeof createEventSchema>["body"];
export type UpdateEventInput = z.infer<typeof updateEventSchema>["body"];
