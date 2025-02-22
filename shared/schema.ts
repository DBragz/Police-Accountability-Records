import { pgTable, text, serial, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const incidents = pgTable("incidents", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  officerName: text("officer_name").notNull(),
  department: text("department").notNull(),
  sources: jsonb("sources").$type<{url: string, title: string}[]>().notNull(),
  status: text("status").notNull(),
});

export const insertIncidentSchema = createInsertSchema(incidents).omit({ 
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
