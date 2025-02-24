import { useQuery } from "@tanstack/react-query";
import { useSearchParams, Link } from "react-router-dom";
import type { Incident, SearchParams } from "@shared/schema";
import { SearchFilters } from "@/components/search-filters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentParams = {
    location: searchParams.get("location") || undefined,
    startDate: searchParams.get("startDate") || undefined,
    endDate: searchParams.get("endDate") || undefined,
    department: searchParams.get("department") || undefined,
  };

  const { data: incidents, isLoading } = useQuery<Incident[]>({
    queryKey: ["/api/incidents", currentParams],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(currentParams).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const response = await fetch(`/api/incidents?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch incidents');
      return response.json();
    },
  });

  const handleSearch = (params: SearchParams) => {
    const updatedParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) updatedParams.set(key, value);
    });
    setSearchParams(updatedParams);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-10 max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[300px_1fr] max-w-[1200px] mx-auto">
          <div className="md:sticky md:top-20">
            <SearchFilters 
              onSearch={handleSearch}
              initialValues={currentParams}
            />
          </div>
          <div className="space-y-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-[250px]" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-[450px] mb-2" />
                    <Skeleton className="h-4 w-[400px]" />
                  </CardContent>
                </Card>
              ))
            ) : incidents?.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No records found matching your search criteria
                </CardContent>
              </Card>
            ) : (
              incidents?.map((incident) => (
                <Card key={incident.id}>
                  <CardHeader>
                    <CardTitle>
                      <Link to={`/incident/${incident.id}`} className="hover:underline">
                        {incident.department} - {new Date(incident.date).toLocaleDateString()}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      {incident.location}
                    </p>
                    <p className="line-clamp-2">{incident.description}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}