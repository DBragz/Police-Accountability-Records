import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchParamsSchema, type SearchParams } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFiltersProps {
  onSearch: (params: SearchParams) => void;
  initialValues?: SearchParams;
}

export function SearchFilters({ onSearch, initialValues }: SearchFiltersProps) {
  const form = useForm<SearchParams>({
    resolver: zodResolver(searchParamsSchema),
    defaultValues: {
      location: initialValues?.location || "",
      startDate: initialValues?.startDate || "",
      endDate: initialValues?.endDate || "",
      department: initialValues?.department || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSearch)} className="space-y-4">
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
                Enter city, state, or both
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Input placeholder="e.g., NYPD" {...field} />
              </FormControl>
              <FormDescription>
                Enter full department name or abbreviation
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Search Records</Button>
      </form>
    </Form>
  );
}