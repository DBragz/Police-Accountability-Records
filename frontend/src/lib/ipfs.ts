import { create } from '@pinata/sdk';

// Initialize Pinata client with environment variables
const pinata = create({
  pinataApiKey: import.meta.env.VITE_PINATA_API_KEY as string,
  pinataSecretApiKey: import.meta.env.VITE_PINATA_SECRET_KEY as string
});

export interface IPFSService {
  uploadIncident: (data: any) => Promise<string>;
  getIncident: (cid: string) => Promise<any>;
  listIncidents: () => Promise<any[]>;
}

class PinataService implements IPFSService {
  async uploadIncident(data: any): Promise<string> {
    try {
      const result = await pinata.pinJSONToIPFS(data);
      return result.IpfsHash;
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw error;
    }
  }

  async getIncident(cid: string): Promise<any> {
    try {
      const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
      if (!response.ok) throw new Error('Failed to fetch from IPFS');
      return response.json();
    } catch (error) {
      console.error('Error fetching from IPFS:', error);
      throw error;
    }
  }

  async listIncidents(): Promise<any[]> {
    try {
      const filter = {
        status: 'pinned',
        pageLimit: 20,
        metadata: {
          keyvalues: {
            type: {
              value: 'incident',
              op: 'eq'
            }
          }
        }
      };
      const result = await pinata.pinList(filter);
      return result.rows;
    } catch (error) {
      console.error('Error listing incidents:', error);
      throw error;
    }
  }
}

export const ipfsService = new PinataService();
