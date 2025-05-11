
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
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Wand2, GlobeIcon, CheckCircle2Icon } from 'lucide-react'; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const builderFormSchema = z.object({
  websiteDescription: z.string().min(30, {
    message: 'Description must be at least 30 characters long to provide enough detail.',
  }),
  desiredDomain: z.string().optional(),
});

type BuilderFormValues = z.infer<typeof builderFormSchema>;

export function BuilderForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [prototypeGenerated, setPrototypeGenerated] = React.useState(false);
  const [domainRequested, setDomainRequested] = React.useState(false);

  const form = useForm<BuilderFormValues>({
    resolver: zodResolver(builderFormSchema),
    defaultValues: {
      websiteDescription: '',
      desiredDomain: '',
    },
  });

  async function onSubmit(data: BuilderFormValues) {
    setIsLoading(true);
    setPrototypeGenerated(false);
    setDomainRequested(false);

    // Simulate AI processing for website generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: 'Website Prototype Generated (Mock)',
      description: `AI has crafted a prototype for: "${data.websiteDescription.substring(0, 50)}...". This is a mock process.`,
      variant: 'default'
    });
    setPrototypeGenerated(true);
    setIsLoading(false);
  }

  async function handleDomainRequest(data: BuilderFormValues) {
    if (!data.desiredDomain || !data.desiredDomain.includes('.')) {
        toast({
            title: "Invalid Domain",
            description: "Please enter a valid domain name (e.g., myawesome.site).",
            variant: "destructive"
        });
        return;
    }
    setIsLoading(true);
    // Simulate domain registration
    await new Promise(resolve => setTimeout(resolve, 1500));
    setDomainRequested(true);
    toast({
        title: "Domain Request Submitted (Mock)",
        description: `Your request for domain "${data.desiredDomain}" has been submitted. This is a premium feature mock-up.`,
        variant: "default"
    });
    setIsLoading(false);
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
        <Button type="submit" disabled={isLoading || prototypeGenerated} className="w-full py-3 text-base bg-accent hover:bg-accent/90 text-accent-foreground">
          {isLoading && !prototypeGenerated ? (
            'Generating Prototype...'
          ) : prototypeGenerated ? (
             <>
              <CheckCircle2Icon className="mr-2 h-5 w-5" /> Prototype Generated!
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-5 w-5" /> Generate Website Prototype
            </>
          )}
        </Button>
         <p className="text-center text-xs text-muted-foreground pt-2">
          This Website Builder uses AI to generate a conceptual prototype. Full website generation is a complex process; this is a simplified demonstration.
        </p>

        {prototypeGenerated && !domainRequested && (
          <Card className="mt-8 bg-secondary/30 border-primary/30">
            <CardHeader>
              <CardTitle className="text-xl flex items-center"><GlobeIcon className="mr-2 h-6 w-6 text-primary"/>Get Your Custom Domain</CardTitle>
              <CardDescription>
                Publish your generated website with a custom domain. This is a premium feature (mock-up).
                Enter your desired domain name below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="desiredDomain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Desired Domain Name</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input 
                            placeholder="e.g., myawesomeceramics.com" 
                            {...field} 
                            className="flex-grow"
                            disabled={isLoading}
                        />
                        <Button 
                            type="button" 
                            onClick={form.handleSubmit(handleDomainRequest)} 
                            disabled={isLoading}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          {isLoading ? 'Requesting...' : 'Request Domain'}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}
         {domainRequested && (
            <div className="mt-6 p-4 border border-accent/50 rounded-md bg-accent/10 text-center">
                <CheckCircle2Icon className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="font-semibold text-accent-foreground">Domain "{form.getValues("desiredDomain")}" Requested!</p>
                <p className="text-sm text-muted-foreground">In a real application, this would start the domain registration and site publishing process.</p>
            </div>
        )}
      </form>
    </Form>
  );
}
