import { z } from "zod";

export const createApplicationSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
    email: z.string().email("Must be a valid email address"),
    enrollmentNumber: z.string().optional(),
    yearOfStudy: z.number().int().min(1, "Year of study must be between 1 and 5").max(5),
    department: z.string().min(2, "Department is required (e.g. USAR - AI & DS)"),
    interests: z.array(z.string()).min(1, "Select at least one area of interest"),
    githubUrl: z.string().url("Must be a valid GitHub URL").optional().or(z.literal("")),
    linkedinUrl: z.string().url("Must be a valid LinkedIn URL").optional().or(z.literal("")),
    statementOfPurpose: z.string().min(10, "Please provide a brief statement of purpose (at least 10 characters)").optional(),
    eventId: z.string().uuid("Invalid Event UUID format").optional(),
  }),
});

export const updateApplicationStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid Application UUID format"),
  }),
  body: z.object({
    status: z.enum(["PENDING", "UNDER_REVIEW", "ACCEPTED", "REJECTED"]),
  }),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>["body"];
export type UpdateApplicationStatusInput = z.infer<typeof updateApplicationStatusSchema>["body"];
