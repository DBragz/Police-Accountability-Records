import { incidents, type Incident, type InsertIncident, type SearchParams } from "@shared/schema";

export interface IStorage {
  getIncident(id: number): Promise<Incident | undefined>;
  searchIncidents(params: SearchParams): Promise<Incident[]>;
  createIncident(incident: InsertIncident): Promise<Incident>;
}

export class MemStorage implements IStorage {
  private incidents: Map<number, Incident>;
  private currentId: number;

  constructor() {
    this.incidents = new Map();
    this.currentId = 1;
  }

  async getIncident(id: number): Promise<Incident | undefined> {
    return this.incidents.get(id);
  }

  async searchIncidents(params: SearchParams): Promise<Incident[]> {
    let results = Array.from(this.incidents.values());

    if (params.location) {
      results = results.filter(incident => 
        incident.location.toLowerCase().includes(params.location!.toLowerCase())
      );
    }

    if (params.department) {
      results = results.filter(incident =>
        incident.department.toLowerCase().includes(params.department!.toLowerCase())
      );
    }

    if (params.startDate) {
      const start = new Date(params.startDate);
      results = results.filter(incident => new Date(incident.date) >= start);
    }

    if (params.endDate) {
      const end = new Date(params.endDate);
      results = results.filter(incident => new Date(incident.date) <= end);
    }

    return results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async createIncident(incident: InsertIncident): Promise<Incident> {
    const id = this.currentId++;
    const newIncident = { ...incident, id } as Incident;
    this.incidents.set(id, newIncident);
    return newIncident;
  }
}

export const storage = new MemStorage();
