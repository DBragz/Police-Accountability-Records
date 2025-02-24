import { z } from "zod";

export interface Incident {
  id: number;
  date: Date;
  location: string;
  description: string;
  officerName: string;
  department: string;
  status: string;
}

export const insertIncidentSchema = z.object({
  date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  officerName: z.string().min(1, "Officer name is required"),
  department: z.string().min(1, "Department is required"),
  status: z.string().min(1, "Status is required")
});

export type InsertIncident = z.infer<typeof insertIncidentSchema>;

export const searchParamsSchema = z.object({
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  department: z.string().optional(),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;