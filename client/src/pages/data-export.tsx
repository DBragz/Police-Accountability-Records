import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BarChart, FileJson, Table } from "lucide-react";

export default function DataExport() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-10 max-w-7xl">
        <div className="max-w-[980px] mx-auto">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] mb-6 text-center">
            Data Export & Analysis
          </h1>
          <p className="text-lg text-muted-foreground mb-8 text-center">
            Access and download our database for research and analysis. All data is provided in multiple formats
            with clear documentation and citation guidelines.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <Card>
              <CardContent className="pt-6">
                <FileJson className="w-12 h-12 mb-4 text-primary mx-auto" />
                <h2 className="text-xl font-bold mb-2 text-center">JSON Format</h2>
                <p className="text-muted-foreground mb-4 text-center">
                  Complete dataset in JSON format, ideal for web applications and data analysis.
                </p>
                <Button variant="outline" className="w-full">
                  Download JSON
                  <Download className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Table className="w-12 h-12 mb-4 text-primary mx-auto" />
                <h2 className="text-xl font-bold mb-2 text-center">CSV Format</h2>
                <p className="text-muted-foreground mb-4 text-center">
                  Spreadsheet-friendly CSV format, perfect for statistical analysis and Excel.
                </p>
                <Button variant="outline" className="w-full">
                  Download CSV
                  <Download className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <BarChart className="w-12 h-12 mb-4 text-primary mx-auto" />
                <h2 className="text-xl font-bold mb-2 text-center">API Access</h2>
                <p className="text-muted-foreground mb-4 text-center">
                  Direct API access for real-time data integration and custom applications.
                </p>
                <Button className="w-full">View API Docs</Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Data Usage Guidelines</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• All data must be cited with proper attribution to this platform</li>
              <li>• Include the date of data retrieval in your citations</li>
              <li>• Check for updated datasets regularly</li>
              <li>• Report any discrepancies or errors in the data</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}