import { useQuery } from "@tanstack/react-query";
import { useSearch } from "wouter";
import type { Incident, SearchParams } from "@shared/schema";
import { SearchFilters } from "@/components/search-filters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Search() {
  const [search, setSearch] = useSearch();
  const params = new URLSearchParams(search);

  const { data: incidents, isLoading } = useQuery<Incident[]>({
    queryKey: ["/api/incidents", search],
    enabled: true,
  });

  const handleSearch = (params: SearchParams) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.set(key, value);
    });
    setSearch(searchParams.toString());
  };

  return (
    <div className="container py-10">
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div>
          <SearchFilters onSearch={handleSearch} />
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
                    {incident.department} - {new Date(incident.date).toLocaleDateString()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {incident.location}
                  </p>
                  <p>{incident.description}</p>
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-1">Sources:</h4>
                    <ul className="text-sm text-blue-600">
                      {incident.sources.map((source, i) => (
                        <li key={i}>
                          <a href={source.url} target="_blank" rel="noopener noreferrer">
                            {source.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
