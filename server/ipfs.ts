import PinataClient from '@pinata/sdk';
import { Buffer } from 'buffer';

let pinata: typeof PinataClient | null = null;

// Initialize Pinata client
export async function initializePinata() {
  if (!process.env.PINATA_API_KEY || !process.env.PINATA_SECRET_KEY) {
    throw new Error('Pinata credentials not found');
  }

  pinata = new PinataClient(
    process.env.PINATA_API_KEY,
    process.env.PINATA_SECRET_KEY
  );
}

// Function to upload data to IPFS via Pinata
export async function uploadToIPFS(data: any): Promise<string> {
  if (!pinata) await initializePinata();

  const buffer = Buffer.from(JSON.stringify(data));
  const result = await pinata!.pinJSONToIPFS(data, {
    pinataMetadata: {
      name: `incident-${Date.now()}`
    }
  });

  return result.IpfsHash;
}

// Function to retrieve data from IPFS
export async function getFromIPFS(cid: string): Promise<any> {
  const gateway = `https://gateway.pinata.cloud/ipfs/${cid}`;
  const response = await fetch(gateway);
  if (!response.ok) {
    throw new Error(`Failed to fetch from IPFS: ${response.statusText}`);
  }
  return response.json();
}