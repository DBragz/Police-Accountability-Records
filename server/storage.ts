import { type Incident, type InsertIncident, type SearchParams } from "@shared/schema";
import { uploadToIPFS, getFromIPFS } from "./ipfs";

export class IPFSStorage implements IStorage {
  private cache: Map<number, Incident>;
  private ipfsRefs: Map<number, string>;
  private currentId: number;

  constructor() {
    this.cache = new Map();
    this.ipfsRefs = new Map();
    this.currentId = 1;
  }

  async getIncident(id: number): Promise<Incident | undefined> {
    // First try to get from cache
    const cached = this.cache.get(id);
    if (cached) return cached;

    // If not in cache, try to get from IPFS
    const cid = this.ipfsRefs.get(id);
    if (cid) {
      try {
        const incident = await getFromIPFS(cid);
        // Cache the result
        this.cache.set(id, incident);
        return incident;
      } catch (error) {
        console.error(`Failed to fetch incident ${id} from IPFS:`, error);
        return undefined;
      }
    }

    return undefined;
  }

  async searchIncidents(params: SearchParams): Promise<Incident[]> {
    let results = Array.from(this.cache.values());

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
    // Upload to IPFS first
    const cid = await uploadToIPFS(incident);

    // Create new incident with ID
    const id = this.currentId++;
    const newIncident = {
      ...incident,
      id
    } as Incident;

    // Store in cache and track IPFS reference
    this.cache.set(id, newIncident);
    this.ipfsRefs.set(id, cid);

    return newIncident;
  }
}

export const storage = new IPFSStorage();

export interface IStorage {
  getIncident(id: number): Promise<Incident | undefined>;
  searchIncidents(params: SearchParams): Promise<Incident[]>;
  createIncident(incident: InsertIncident): Promise<Incident>;
}