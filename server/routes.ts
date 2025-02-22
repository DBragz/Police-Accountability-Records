import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { searchParamsSchema, insertIncidentSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/incidents/:id", async (req, res) => {
    const incident = await storage.getIncident(parseInt(req.params.id));
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }
    res.json(incident);
  });

  app.get("/api/incidents", async (req, res) => {
    const parseResult = searchParamsSchema.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({ message: "Invalid search parameters" });
    }
    const incidents = await storage.searchIncidents(parseResult.data);
    res.json(incidents);
  });

  app.post("/api/incidents", async (req, res) => {
    const parseResult = insertIncidentSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ message: "Invalid incident data" });
    }
    const incident = await storage.createIncident(parseResult.data);
    res.status(201).json(incident);
  });

  // Add route to clear storage
  app.post("/api/clear", (_req, res) => {
    (storage as any).clear(); //Added any type assertion for compilation.  The original code does not specify the type of storage.clear().
    res.json({ message: "Storage cleared successfully" });
  });

  return createServer(app);
}