import { AnalysisDisplay } from '@/components/analysis/analysis-display';
import { SearchCode } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dev Analysis - CloudGenius',
  description: 'Review application performance and quality metrics (Lighthouse-like).',
};

export default function AnalysisPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-10">
        <div className="inline-flex items-center justify-center bg-primary/10 p-3 rounded-full mb-4">
         <SearchCode className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Development Analysis Dashboard</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Get insights into your application's performance, accessibility, SEO, and more. (Mock Data)
        </p>
      </header>
      <AnalysisDisplay />
    </div>
  );
}
