'use client';

import * as React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Copy, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { generateAppPrototypeAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  appDescription: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? 'Generating...' : 'Generate Prototype'}
    </Button>
  );
}

export function PrototypeGenerator() {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  // useFormState hook manages state updates from server actions
  const [state, formAction] = useFormState(generateAppPrototypeAction, {
    message: '',
    data: undefined,
    error: undefined,
  });

  // useForm for client-side validation and form management
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appDescription: '',
    },
  });

  React.useEffect(() => {
    if (state.message && !state.error) {
      toast({
        title: "Success!",
        description: state.message,
        variant: "default", // Use default for success with accent button
      });
      // Optionally reset form on success
      // form.reset();
    } else if (state.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  const handleCopy = () => {
    if (state.data?.prototypeCode) {
      navigator.clipboard.writeText(state.data.prototypeCode)
        .then(() => {
          setCopied(true);
          toast({ description: 'Code copied to clipboard!' });
          setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          toast({ description: 'Failed to copy code.', variant: 'destructive' });
        });
    }
  };

  const handleExport = () => {
      if (state.data?.prototypeCode) {
          // Placeholder for export functionality
          // In a real app, this would trigger a download or push to a repository
          // For now, we just show a toast
           toast({
            title: "Export Started",
            description: "Generating Next.js project files... (This is a placeholder)",
          });

          // Simulate download (replace with actual file generation and download logic)
           try {
                const blob = new Blob([state.data.prototypeCode], { type: 'text/plain;charset=utf-8' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                // Suggest a filename - might need adjustment based on actual content
                link.download = 'prototype-app.tsx'; // Example filename
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
           } catch (err) {
                console.error('Export failed:', err);
                toast({
                    title: "Export Failed",
                    description: "Could not create download link.",
                    variant: "destructive",
                });
           }

      } else {
          toast({
              description: "No prototype code available to export.",
              variant: "destructive",
          });
      }
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Describe Your App</CardTitle>
          <CardDescription>
            Enter a detailed description of the app you want to prototype.
            Include layout ideas, desired components, and core functionality.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* We pass formAction to the <form> element */}
          <Form {...form}>
            <form action={formAction} className="space-y-6">
              <FormField
                control={form.control}
                name="appDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="appDescription">App Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="appDescription"
                        placeholder="e.g., A simple blog application with a homepage listing posts, individual post pages, and an about page. Use cards for posts..."
                        className="min-h-[150px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The more detail you provide, the better the generated prototype.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* SubmitButton uses useFormStatus to react to form submission state */}
              <SubmitButton />
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Generated Prototype</CardTitle>
          <CardDescription>
             View the generated code and layout description below.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {useFormStatus().pending ? (
                <div className="space-y-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-10 w-24" />
                </div>
            ) : state.data ? (
             <div className="space-y-4">
                <div>
                    <h3 className="font-semibold mb-2">Layout Description:</h3>
                    <p className="text-sm text-muted-foreground">{state.data.layoutDescription}</p>
                </div>
                <div className="relative">
                    <h3 className="font-semibold mb-2">Prototype Code:</h3>
                     <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0 h-7 w-7 text-muted-foreground hover:text-foreground"
                        onClick={handleCopy}
                        aria-label="Copy code"
                    >
                        {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <pre className="bg-secondary p-4 rounded-md overflow-auto text-sm max-h-[400px]">
                        <code>{state.data.prototypeCode}</code>
                    </pre>
                </div>
                 <Button onClick={handleExport} variant="outline" className="w-full md:w-auto">
                    Export as Next.js Project
                </Button>

            </div>
           ) : (
             <p className="text-muted-foreground text-center py-10">
                Your generated prototype will appear here once you submit a description.
             </p>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
