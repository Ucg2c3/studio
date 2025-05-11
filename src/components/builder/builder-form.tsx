'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Wand2 } from 'lucide-react'; 

const builderFormSchema = z.object({
  websiteDescription: z.string().min(30, {
    message: 'Description must be at least 30 characters long to provide enough detail.',
  }),
});

type BuilderFormValues = z.infer<typeof builderFormSchema>;

export function BuilderForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<BuilderFormValues>({
    resolver: zodResolver(builderFormSchema),
    defaultValues: {
      websiteDescription: '',
    },
  });

  async function onSubmit(data: BuilderFormValues) {
    setIsLoading(true);
    // Simulate AI processing for website generation
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsLoading(false);
    toast({
      title: 'Website Build Initialized (Mock)',
      description: `AI is now crafting a prototype for: "${data.websiteDescription.substring(0, 60)}...". This is a mock process.`,
      variant: 'default'
    });
    // In a real application, this would trigger an AI flow.
    // This could involve calling a Genkit flow similar to generatePrototype,
    // but tailored for website structures (HTML/CSS, or specific CMS/framework).
    // form.reset(); // Optionally reset the form
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="websiteDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Describe Your Dream Website</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., A clean and modern e-commerce website for selling handmade ceramics. It should have a product listing page with filters, individual product pages with image galleries, a secure checkout process, and an about page."
                  className="min-h-[150px] resize-y text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full py-3 text-base bg-accent hover:bg-accent/90 text-accent-foreground">
          {isLoading ? (
            'Generating Website...'
          ) : (
            <>
              <Wand2 className="mr-2 h-5 w-5" /> Generate Website Prototype
            </>
          )}
        </Button>
         <p className="text-center text-xs text-muted-foreground pt-2">
          This Website Builder uses AI to generate a conceptual prototype. Full website generation is a complex process; this is a simplified demonstration.
        </p>
      </form>
    </Form>
  );
}
