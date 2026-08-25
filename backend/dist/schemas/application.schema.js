"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplicationStatusSchema = exports.createApplicationSchema = void 0;
const zod_1 = require("zod");
exports.createApplicationSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string().min(2, "Full name must be at least 2 characters").max(100),
        email: zod_1.z.string().email("Must be a valid email address"),
        enrollmentNumber: zod_1.z.string().optional(),
        yearOfStudy: zod_1.z.number().int().min(1, "Year of study must be between 1 and 5").max(5),
        department: zod_1.z.string().min(2, "Department is required (e.g. USAR - AI & DS)"),
        interests: zod_1.z.array(zod_1.z.string()).min(1, "Select at least one area of interest"),
        githubUrl: zod_1.z.string().url("Must be a valid GitHub URL").optional().or(zod_1.z.literal("")),
        linkedinUrl: zod_1.z.string().url("Must be a valid LinkedIn URL").optional().or(zod_1.z.literal("")),
        statementOfPurpose: zod_1.z.string().min(10, "Please provide a brief statement of purpose (at least 10 characters)").optional(),
        eventId: zod_1.z.string().uuid("Invalid Event UUID format").optional(),
    }),
});
exports.updateApplicationStatusSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid("Invalid Application UUID format"),
    }),
    body: zod_1.z.object({
        status: zod_1.z.enum(["PENDING", "UNDER_REVIEW", "ACCEPTED", "REJECTED"]),
    }),
});
