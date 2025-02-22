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

    // Add sample data
    const sampleIncidents: InsertIncident[] = [
      {
        date: new Date("2024-01-15"),
        location: "New York, NY",
        description: "Officer involved in excessive force complaint during arrest",
        officerName: "John Smith",
        department: "NYPD",
        sources: [
          { url: "https://example.com/news1", title: "Local News Report" },
          { url: "https://example.com/doc1", title: "Official Police Report" }
        ],
        status: "Under Investigation"
      },
      {
        date: new Date("2024-02-01"),
        location: "Los Angeles, CA",
        description: "Unauthorized use of force during traffic stop",
        officerName: "Michael Johnson",
        department: "LAPD",
        sources: [
          { url: "https://example.com/news2", title: "LA Times Report" }
        ],
        status: "Pending Review"
      },
      {
        date: new Date("2023-12-10"),
        location: "Chicago, IL",
        description: "Misconduct allegations during protest response",
        officerName: "Robert Wilson",
        department: "Chicago Police Department",
        sources: [
          { url: "https://example.com/news3", title: "Chicago Tribune Report" },
          { url: "https://example.com/doc3", title: "Internal Affairs Report" }
        ],
        status: "Closed"
      }
    ];

    // Insert sample incidents
    sampleIncidents.forEach(incident => {
      const newIncident = { ...incident, id: this.currentId++ } as Incident;
      this.incidents.set(newIncident.id, newIncident);
    });
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
      results = results.filter(incident => incident.date >= start);
    }

    if (params.endDate) {
      const end = new Date(params.endDate);
      results = results.filter(incident => incident.date <= end);
    }

    return results.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async createIncident(incident: InsertIncident): Promise<Incident> {
    const id = this.currentId++;
    const newIncident = { ...incident, id } as Incident;
    this.incidents.set(id, newIncident);
    return newIncident;
  }
}

export const storage = new MemStorage();