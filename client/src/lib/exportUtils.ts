import { type Incident } from "@shared/schema";

export function downloadJSON(data: Incident[]) {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `police-accountability-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadCSV(data: Incident[]) {
  const headers = ['ID', 'Date', 'Location', 'Description', 'Officer Name', 'Department', 'Status'];
  const rows = data.map(incident => [
    incident.id,
    new Date(incident.date).toISOString().split('T')[0],
    incident.location,
    `"${incident.description.replace(/"/g, '""')}"`, // Escape quotes in CSV
    incident.officerName,
    incident.department,
    incident.status
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `police-accountability-data-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
