import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Building2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Incident } from "@shared/schema";
import { ipfsService } from "@/lib/ipfs";

export default function IncidentDetail() {
  const { id } = useParams();

  const { data: incident, isLoading, error } = useQuery<Incident>({
    queryKey: [`incidents`, id],
    queryFn: () => ipfsService.getIncident(id!),
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
                <p>Failed to load incident details from IPFS</p>
              </div>
              <Link to="/search">
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

  // Rest of the component remains the same
  // ... (keeping existing loading, empty states, and render logic)
}
