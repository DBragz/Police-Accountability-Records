import { pgTable, text, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const incidents = pgTable("incidents", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  officerName: text("officer_name").notNull(),
  department: text("department").notNull(),
  status: text("status").notNull(),
});

export const insertIncidentSchema = createInsertSchema(incidents, {
  date: z.string().transform(str => new Date(str)),
}).omit({ 
  id: true 
});

export type InsertIncident = z.infer<typeof insertIncidentSchema>;
export type Incident = typeof incidents.$inferSelect;

export const searchParamsSchema = z.object({
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  department: z.string().optional(),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;