import { z } from "zod";

export interface Source {
  url: string;
  title: string;
}

export interface Incident {
  id: number;
  date: Date;
  location: string;
  description: string;
  officerName: string;
  department: string;
  status: string;
  sources?: Source[];
}

export const sourceSchema = z.object({
  url: z.string().url("Must be a valid URL"),
  title: z.string().min(1, "Title is required")
});

export const insertIncidentSchema = z.object({
  date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  officerName: z.string().min(1, "Officer name is required"),
  department: z.string().min(1, "Department is required"),
  status: z.string().min(1, "Status is required"),
  sources: z.array(sourceSchema).optional()
});

export type InsertIncident = z.infer<typeof insertIncidentSchema>;

export const searchParamsSchema = z.object({
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  department: z.string().optional(),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;