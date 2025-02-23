import { useQuery } from '@tanstack/react-query';
import { getIncidents } from '@/lib/localStore';
import type { Incident } from '@shared/schema';

export function IncidentsList() {
  const { data: incidents, isLoading } = useQuery({
    queryKey: ['incidents'],
    queryFn: async () => {
      // Get local data first
      const localIncidents = await getIncidents();
      
      try {
        // Then fetch from server and merge
        const response = await fetch('/api/incidents');
        if (!response.ok) throw new Error('Failed to fetch');
        const serverIncidents: Incident[] = await response.json();
        
        // Merge and deduplicate by ID
        const merged = [...localIncidents, ...serverIncidents];
        const unique = merged.filter((incident, index, self) =>
          index === self.findIndex((t) => t.id === incident.id)
        );
        
        return unique;
      } catch (error) {
        // If server fetch fails, return local data
        console.warn('Failed to fetch from server, using local data:', error);
        return localIncidents;
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {incidents?.map((incident) => (
        <div
          key={incident.id}
          className="p-4 rounded-lg border border-border bg-card text-card-foreground"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">
                {incident.location}
              </h3>
              <p className="text-sm text-muted-foreground">
                {new Date(incident.date).toLocaleDateString()}
              </p>
            </div>
            <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
              {incident.status}
            </span>
          </div>
          <p className="mt-2">{incident.description}</p>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Officer: {incident.officerName}</p>
            <p>Department: {incident.department}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
