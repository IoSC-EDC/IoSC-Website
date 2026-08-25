"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventByIdSchema = exports.updateEventSchema = exports.createEventSchema = void 0;
const zod_1 = require("zod");
exports.createEventSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3, "Title must be at least 3 characters long").max(200),
        eventType: zod_1.z.string().min(2, "Event type is required (e.g. Hackathon, Workshop)"),
        description: zod_1.z.string().optional(),
        location: zod_1.z.string().min(2, "Location is required (e.g. Online, USAR Campus)"),
        startDate: zod_1.z.string().datetime({ message: "startDate must be a valid ISO timestamp" }),
        endDate: zod_1.z.string().datetime({ message: "endDate must be a valid ISO timestamp" }).optional(),
        registrationLink: zod_1.z.string().url("Must be a valid URL").optional().or(zod_1.z.literal("")),
        accentColor: zod_1.z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid hex color").optional(),
        isArchived: zod_1.z.boolean().optional().default(false),
    }),
});
exports.updateEventSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid("Invalid Event UUID format"),
    }),
    body: zod_1.z.object({
        title: zod_1.z.string().min(3).max(200).optional(),
        eventType: zod_1.z.string().min(2).optional(),
        description: zod_1.z.string().optional(),
        location: zod_1.z.string().min(2).optional(),
        startDate: zod_1.z.string().datetime().optional(),
        endDate: zod_1.z.string().datetime().optional(),
        registrationLink: zod_1.z.string().url().optional().or(zod_1.z.literal("")),
        accentColor: zod_1.z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
        isArchived: zod_1.z.boolean().optional(),
    }),
});
exports.getEventByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid("Invalid Event UUID format"),
    }),
});
