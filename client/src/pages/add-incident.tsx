import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import { Plus, X } from "lucide-react";

export default function AddIncident() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<InsertIncident>({
    resolver: zodResolver(insertIncidentSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      location: "",
      description: "",
      officerName: "",
      department: "",
      status: "Under Investigation",
      sources: []
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertIncident) => {
      const formattedData = {
        ...data,
        date: new Date(data.date).toISOString(),
      };
      await apiRequest('POST', '/api/incidents', formattedData);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Incident record has been created",
      });
      navigate('/search');
    },
    onError: (error) => {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const addSource = () => {
    const sources = form.getValues("sources") || [];
    form.setValue("sources", [...sources, { url: "", title: "" }]);
  };

  const removeSource = (index: number) => {
    const sources = form.getValues("sources") || [];
    form.setValue("sources", sources.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold leading-tight tracking-tighter">Add New Incident Record</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
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
              </div>

              <div className="grid gap-4 md:grid-cols-2">
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
              </div>

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

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <FormLabel>Sources & Citations</FormLabel>
                  <Button type="button" variant="outline" size="sm" onClick={addSource}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Source
                  </Button>
                </div>
                {form.watch("sources")?.map((source, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Source {index + 1}</FormLabel>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSource(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`sources.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Source title" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`sources.${index}.url`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://..." {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-6">
                <Button 
                  type="submit" 
                  className="w-full max-w-md"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Adding..." : "Add Incident"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}