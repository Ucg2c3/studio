
'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom'; // Still needed for SubmitButton
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

  // useActionState hook manages state updates from server actions
  // Destructure isPending (the third item) from useActionState
  const [actionState, formAction, isActionPending] = useActionState(generateAppPrototypeAction, {
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
    // Use actionState for messages and errors
    if (actionState.message && !actionState.error) {
      toast({
        title: "Success!",
        description: actionState.message,
        variant: "default",
      });
    } else if (actionState.error) {
      toast({
        title: 'Error',
        description: actionState.error,
        variant: 'destructive',
      });
    }
  }, [actionState, toast]);

  const handleCopy = () => {
    if (actionState.data?.prototypeCode) {
      navigator.clipboard.writeText(actionState.data.prototypeCode)
        .then(() => {
          setCopied(true);
          toast({ description: 'Code copied to clipboard!' });
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          toast({ description: 'Failed to copy code.', variant: 'destructive' });
        });
    }
  };

  const handleExport = () => {
      if (actionState.data?.prototypeCode) {
           toast({
            title: "Export Started",
            description: "Generating Next.js project files... (This is a placeholder)",
          });
           try {
                const blob = new Blob([actionState.data.prototypeCode], { type: 'text/plain;charset=utf-8' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'prototype-app.tsx';
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
                        placeholder={`An agentic AI platform designed to securely connect different cloud services and tech company APIs.  The core features include:

1.  Autonomous Agent Management:  The AI should be able to create, manage, and deploy autonomous agents, each responsible for a specific integration task.  These agents operate independently but can communicate with each other.

2.  Secure Network:  Emphasize that the platform operates on its own secure, private network, isolated from the public internet.  It should demonstrate secure communication protocols and data encryption methods.

3.  Cloud Connector Modules:  The AI should have pre-built connector modules for popular cloud platforms like AWS, Azure, and Google Cloud, and be able to connect with tech company APIs like Salesforce, Zendesk, and Stripe.

4.  Data Transformation and Routing:  The AI can transform data formats and route data between different systems.

5.  Monitoring and Logging: The AI should have monitoring and logging capabilities to track agent performance and network activity.

The prototype should demonstrate a user interface where users can:

*   Create and configure agents.
*   Define data mappings between cloud services.
*   Monitor agent activity and network status.
*   View logs and reports.`}
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
            {/* Use isActionPending from useActionState for skeleton display */}
            {isActionPending ? (
                <div className="space-y-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-10 w-24" />
                </div>
            ) : actionState.data ? ( // Use actionState.data to check for results
             <div className="space-y-4">
                <div>
                    <h3 className="font-semibold mb-2">Layout Description:</h3>
                    <p className="text-sm text-muted-foreground">{actionState.data.layoutDescription}</p>
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
                        <code>{actionState.data.prototypeCode}</code>
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
