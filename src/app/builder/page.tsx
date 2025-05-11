import { BuilderForm } from '@/components/builder/builder-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website Builder - CloudGenius',
  description: 'Describe and build website prototypes with AI.',
};

export default function BuilderPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-10">
        <div className="inline-flex items-center justify-center bg-primary/10 p-3 rounded-full mb-4">
          <Palette className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">AI Website Builder</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Bring your website ideas to life. Describe your vision, and let our AI generate a foundational prototype for you.
        </p>
      </header>
      
      <Card className="max-w-3xl mx-auto shadow-xl rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Let's Build Your Website</CardTitle>
          <CardDescription>
            Provide a detailed description of the website you envision. Include its purpose, desired style, key sections, and any specific features.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <BuilderForm />
        </CardContent>
      </Card>
    </div>
  );
}
