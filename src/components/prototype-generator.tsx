
'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Copy, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { generateAppPrototypeAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';

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

  const [state, formAction, isPending] = useActionState(generateAppPrototypeAction, {
    message: '',
    data: undefined,
    error: undefined,
  });

  React.useEffect(() => {
    if (state.message && !state.error) {
      toast({
        title: "Success!",
        description: state.message,
        variant: "default",
      });
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
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          toast({ description: 'Failed to copy code.', variant: 'destructive' });
        });
    }
  };

  const handleExport = () => {
      if (state.data?.prototypeCode) {
           toast({
            title: "Export Started",
            description: "Generating Next.js project files... (This is a placeholder)",
          });
           try {
                const blob = new Blob([state.data.prototypeCode], { type: 'text/plain;charset=utf-8' });
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
          <form action={formAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="appDescription">App Description</Label>
                <Textarea
                  id="appDescription"
                  name="appDescription"
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
                  required
                />
                 {state.error && <p className="text-sm font-medium text-destructive">{state.error}</p>}
              </div>
              <SubmitButton />
            </form>
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
            {isPending ? (
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
