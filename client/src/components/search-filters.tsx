import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchParamsSchema, type SearchParams } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFiltersProps {
  onSearch: (params: SearchParams) => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const form = useForm<SearchParams>({
    resolver: zodResolver(searchParamsSchema),
    defaultValues: {
      location: "",
      startDate: "",
      endDate: "",
      department: "",
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
                <Input placeholder="City, State" {...field} />
              </FormControl>
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
                <Input placeholder="Police Department" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Search Records</Button>
      </form>
    </Form>
  );
}
