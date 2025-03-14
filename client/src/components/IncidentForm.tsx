import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { insertIncidentSchema, type InsertIncident, type Incident } from '@shared/schema';
import { addIncident } from '@/lib/localStore';
import { apiRequest } from '@/lib/queryClient';

export function IncidentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertIncident>({
    resolver: zodResolver(insertIncidentSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      location: '',
      description: '',
      officerName: '',
      department: '',
      status: 'pending',
    },
  });

  const onSubmit = async (data: InsertIncident) => {
    setIsSubmitting(true);
    try {
      // Store locally first and get the ID
      const localId = await addIncident(data);

      // Create the complete incident object
      const newIncident: Incident = {
        id: localId,
        ...data,
        date: new Date(data.date),
      };

      // Then sync with server
      await apiRequest('POST', '/api/incidents', data);

      // Update the UI optimistically
      queryClient.setQueryData<Incident[]>(['incidents'], (old = []) => {
        return [newIncident, ...old];
      });

      // Invalidate queries to trigger a refresh
      await queryClient.invalidateQueries({ queryKey: ['incidents'] });

      // Show success message
      toast({
        title: 'Success',
        description: 'Incident record has been saved.',
      });

      // Reset form
      form.reset();

    } catch (error) {
      console.error('Error saving incident:', error);
      toast({
        title: 'Error',
        description: 'Failed to save incident. It will be synced when connection is restored.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Form.Field
            control={form.control}
            name="date"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Date</Form.Label>
                <Form.Control>
                  <Input type="date" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name="location"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Location</Form.Label>
                <Form.Control>
                  <Input {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name="officerName"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Officer Name</Form.Label>
                <Form.Control>
                  <Input {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name="department"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Department</Form.Label>
                <Form.Control>
                  <Input {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
        </div>

        <Form.Field
          control={form.control}
          name="description"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Description</Form.Label>
              <Form.Control>
                <Input {...field} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Submit Incident'}
        </Button>
      </form>
    </Form>
  );
}