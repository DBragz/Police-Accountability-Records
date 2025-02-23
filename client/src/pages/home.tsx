import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, FileText, Database } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-10 max-w-7xl">
        <div className="max-w-[980px] mx-auto text-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Police Accountability Records
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Access and search public records of police accountability. All information is sourced from
            publicly available data with clear citations.
          </p>
        </div>

        <div className="grid gap-6 mt-12 md:grid-cols-3 max-w-[980px] mx-auto">
          <Card>
            <CardContent className="pt-6">
              <FileText className="w-12 h-12 mb-4 text-primary" />
              <h2 className="text-xl font-bold mb-2">Add Record</h2>
              <p className="text-muted-foreground mb-4">
                Submit verified police accountability records with proper documentation.
              </p>
              <Link to="/add">
                <Button className="w-full">Add New Record</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Search className="w-12 h-12 mb-4 text-primary" />
              <h2 className="text-xl font-bold mb-2">Search Records</h2>
              <p className="text-muted-foreground mb-4">
                Search through verified records by location, date, and department.
              </p>
              <Link to="/search">
                <Button variant="outline" className="w-full">Search Now</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Database className="w-12 h-12 mb-4 text-primary" />
              <h2 className="text-xl font-bold mb-2">Data Export</h2>
              <p className="text-muted-foreground mb-4">
                Export and download data for research and analysis.
              </p>
              <Link to="/data-export">
                <Button variant="outline" className="w-full">Export Data</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}