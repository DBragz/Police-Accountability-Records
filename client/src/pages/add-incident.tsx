import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertIncidentSchema, type InsertIncident } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function AddIncident() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<InsertIncident>({
    resolver: zodResolver(insertIncidentSchema),
    defaultValues: {
      date: new Date(),
      location: "",
      description: "",
      officerName: "",
      department: "",
      sources: [],
      status: "Under Investigation"
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertIncident) => {
      await apiRequest('POST', '/api/incidents', data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Incident record has been created",
      });
      setLocation('/search');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="container py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Incident Record</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Incident</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field}
                        value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., New York, NY" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter city and state
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., NYPD" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="officerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Officer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Officer's full name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Detailed description of the incident"
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Under Investigation"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sources"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>Sources</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter sources in format: url,title;url,title"
                        className="min-h-[100px]"
                        value={value.map(source => `${source.url},${source.title}`).join(';')}
                        onChange={(e) => {
                          const sourcesText = e.target.value;
                          const sources = sourcesText.split(';')
                            .map(source => {
                              const [url, title] = source.split(',');
                              return url && title ? { url: url.trim(), title: title.trim() } : null;
                            })
                            .filter((source): source is {url: string, title: string} => source !== null);
                          onChange(sources);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter each source as "URL,Title" separated by semicolons
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Adding..." : "Add Incident"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}