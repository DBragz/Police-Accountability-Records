import PinataClient from "@pinata/sdk";
import type { Incident, InsertIncident } from "@shared/schema";

class IPFSService {
  private pinata: PinataClient;
  private incidents: Map<number, string> = new Map(); // id -> CID mapping

  constructor() {
    this.pinata = new PinataClient(
      import.meta.env.VITE_PINATA_API_KEY,
      import.meta.env.VITE_PINATA_SECRET_KEY
    );
  }

  async createIncident(data: InsertIncident): Promise<Incident> {
    const incident: Incident = {
      id: Date.now(), // Use timestamp as ID for simplicity
      ...data,
      date: new Date(data.date),
    };

    const result = await this.pinata.pinJSONToIPFS(incident, {
      pinataMetadata: {
        name: `incident-${incident.id}`,
      },
    });

    this.incidents.set(incident.id, result.IpfsHash);
    return incident;
  }

  async getIncident(id: number): Promise<Incident | null> {
    const cid = this.incidents.get(id);
    if (!cid) return null;

    const gateway = `https://gateway.pinata.cloud/ipfs/${cid}`;
    const response = await fetch(gateway);
    if (!response.ok) {
      throw new Error(`Failed to fetch from IPFS: ${response.statusText}`);
    }
    return response.json();
  }

  async searchIncidents(params: {
    location?: string;
    startDate?: string;
    endDate?: string;
    department?: string;
  }): Promise<Incident[]> {
    // For now, return all incidents since we're using a simple in-memory map
    const incidents: Incident[] = [];
    for (const [id] of this.incidents) {
      const incident = await this.getIncident(id);
      if (incident) incidents.push(incident);
    }
    
    // Filter based on search params
    return incidents.filter(incident => {
      if (params.location && !incident.location.includes(params.location)) return false;
      if (params.department && !incident.department.includes(params.department)) return false;
      if (params.startDate && new Date(incident.date) < new Date(params.startDate)) return false;
      if (params.endDate && new Date(incident.date) > new Date(params.endDate)) return false;
      return true;
    });
  }
}

export const ipfsService = new IPFSService();
