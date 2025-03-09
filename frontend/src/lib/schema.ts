import { z } from "zod";

export const incidentSchema = z.object({
  date: z.string(),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  officerName: z.string().min(1, "Officer name is required"),
  department: z.string().min(1, "Department is required"),
  status: z.enum(["pending", "verified", "disputed"]).default("pending"),
  sources: z.array(z.object({
    url: z.string().url("Must be a valid URL"),
    title: z.string()
  })).optional(),
});

export type Incident = z.infer<typeof incidentSchema>;
export type InsertIncident = z.input<typeof incidentSchema>;
