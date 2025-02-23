import { openDB, type DBSchema } from 'idb';
import type { Incident } from '@shared/schema';

interface IncidentsDB extends DBSchema {
  incidents: {
    key: number;
    value: Incident;
    indexes: { 'by-date': Date };
  };
}

const DB_NAME = 'police-accountability-db';
const STORE_NAME = 'incidents';

export async function initDB() {
  return openDB<IncidentsDB>(DB_NAME, 1, {
    upgrade(db) {
      const store = db.createObjectStore(STORE_NAME, {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('by-date', 'date');
    },
  });
}

export async function addIncident(incident: Omit<Incident, 'id'>): Promise<number> {
  const db = await initDB();
  return db.add(STORE_NAME, {
    ...incident,
    date: new Date(incident.date), // Ensure date is a Date object
  } as Incident);
}

export async function getIncidents(): Promise<Incident[]> {
  const db = await initDB();
  return db.getAllFromIndex(STORE_NAME, 'by-date');
}

export async function updateIncident(incident: Incident) {
  const db = await initDB();
  return db.put(STORE_NAME, incident);
}

export async function deleteIncident(id: number) {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
}