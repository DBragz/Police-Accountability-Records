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
      const start = new Date(params.startDate).getTime();
      results = results.filter(incident => new Date(incident.date).getTime() >= start);
    }

    if (params.endDate) {
      const end = new Date(params.endDate).getTime();
      results = results.filter(incident => new Date(incident.date).getTime() <= end);
    }

    return results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async createIncident(incident: InsertIncident): Promise<Incident> {
    const id = this.currentId++;
    const newIncident = {
      ...incident,
      id,
      date: new Date(incident.date)
    } as Incident;

    // Upload to IPFS
    try {
      const cid = await uploadToIPFS(newIncident);
      this.ipfsRefs.set(id, cid);
    } catch (error) {
      console.error('Failed to upload to IPFS:', error);
    }

    // Store in cache
    this.cache.set(id, newIncident);
    return newIncident;
  }

  // Clear all data
  clear() {
    this.cache.clear();
    this.ipfsRefs.clear();
    this.currentId = 1;
  }
}

// Create a new instance of the storage
export const storage = new IPFSStorage();

export interface IStorage {
  getIncident(id: number): Promise<Incident | undefined>;
  searchIncidents(params: SearchParams): Promise<Incident[]>;
  createIncident(incident: InsertIncident): Promise<Incident>;
}