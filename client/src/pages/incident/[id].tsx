import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { ArrowLeft, Calendar, MapPin, Building2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Incident } from "@shared/schema";
import { Link } from "wouter";

export default function IncidentDetail() {
  const { id } = useParams();

  const { data: incident, isLoading, error } = useQuery<Incident>({
    queryKey: [`/api/incidents/${id}`],
    enabled: !!id,
  });

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow container mx-auto px-4 py-10 max-w-7xl">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-destructive mb-4">
                <AlertCircle className="h-5 w-5" />
                <p>Failed to load incident details</p>
              </div>
              <Link href="/search">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Search
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow container mx-auto px-4 py-10 max-w-7xl">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <Skeleton className="h-8 w-[300px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-20 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[180px]" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow container mx-auto px-4 py-10 max-w-7xl">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Incident Not Found</h2>
              <p className="text-muted-foreground mb-4">
                The requested incident record could not be found.
              </p>
              <Link href="/search">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Search
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-10 max-w-7xl">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="flex flex-col gap-4">
            <Link href="/search">
              <Button variant="ghost" className="flex items-center gap-2 w-fit -ml-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Search
              </Button>
            </Link>
            <div>
              <Badge variant="outline" className="mb-2">
                {incident.status}
              </Badge>
              <CardTitle className="text-2xl">
                Incident Report - {incident.department}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(incident.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{incident.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{incident.department}</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Officer Information</h3>
              <p className="text-muted-foreground">{incident.officerName}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {incident.description}
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-4">Sources & Citations</h3>
              <ul className="space-y-2">
                {incident.sources?.map((source, index) => (
                  <li key={index}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-2"
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}