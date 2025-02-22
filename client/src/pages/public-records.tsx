import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink } from "lucide-react";

export default function PublicRecords() {
  return (
    <div className="container py-10">
      <div className="max-w-[980px] mx-auto">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] mb-6">
          Public Records Access
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Learn how to request public records and contribute verified data to our database.
          All submissions undergo thorough verification to maintain data integrity.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <FileText className="w-12 h-12 mb-4 text-primary" />
              <h2 className="text-xl font-bold mb-2">Making a Request</h2>
              <p className="text-muted-foreground mb-4">
                Learn about your rights under the Freedom of Information Act (FOIA) and how to submit effective records requests.
              </p>
              <Button className="w-full" variant="outline">
                Request Guidelines
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Download className="w-12 h-12 mb-4 text-primary" />
              <h2 className="text-xl font-bold mb-2">Submit Records</h2>
              <p className="text-muted-foreground mb-4">
                Contribute to transparency by submitting verified public records. All submissions require proper documentation and citations.
              </p>
              <Button className="w-full">
                Start Submission
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What records can I request?</h3>
              <p className="text-muted-foreground">
                You can request various types of police records including incident reports, disciplinary records, and department policies. Each jurisdiction may have different rules about what information is publicly available.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How long does the process take?</h3>
              <p className="text-muted-foreground">
                The time to receive records varies by jurisdiction and request complexity. Agencies typically have 20-30 business days to respond to initial requests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
