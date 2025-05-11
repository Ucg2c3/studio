'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Zap, Accessibility, Search, ShieldCheck, PackageOpen, Settings2 } from 'lucide-react'; // Using Accessibility for its direct meaning

interface MetricCardProps {
  title: string;
  score: number;
  description: string;
  icon: React.ReactNode;
}

function MetricCard({ title, score, description, icon }: MetricCardProps) {
  let progressBarColorClass = 'bg-primary'; // Default to primary
  if (score < 50) progressBarColorClass = 'bg-destructive';
  else if (score < 80) progressBarColorClass = 'bg-yellow-500';


  return (
    <Card className="shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <span className="text-primary">{icon}</span>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-3xl font-bold text-foreground">{score}<span className="text-sm text-muted-foreground">/100</span></div>
        <Progress value={score} className={`h-2.5 [&>div]:${progressBarColorClass} rounded-full`} aria-label={`${title} score: ${score} out of 100`} />
        <p className="text-sm text-muted-foreground pt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

export function AnalysisDisplay() {
  const [analysisData, setAnalysisData] = React.useState({
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0,
    security: 0,
    bundleOptimization: 0,
  });

  React.useEffect(() => {
    // Simulate fetching data and initial animation
    const initialScores = {
      performance: 92,
      accessibility: 85,
      bestPractices: 95,
      seo: 78,
      security: 90,
      bundleOptimization: 75,
    };

    let currentScores = { ...analysisData };
    const increments = Object.keys(initialScores).reduce((acc, key) => {
      acc[key as keyof typeof initialScores] = initialScores[key as keyof typeof initialScores] / 50; // 50 steps for animation
      return acc;
    }, {} as Record<keyof typeof initialScores, number>);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      currentScores = Object.keys(initialScores).reduce((acc, keyStr) => {
        const key = keyStr as keyof typeof initialScores;
        acc[key] = Math.min(initialScores[key], currentScores[key] + increments[key]);
        return acc;
      }, {} as typeof initialScores);
      
      setAnalysisData(currentScores);

      if (step >= 50) {
        clearInterval(interval);
         setAnalysisData(initialScores); // Ensure final scores are exact
      }
    }, 20); // Animation speed

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Performance"
          score={Math.round(analysisData.performance)}
          description="Overall application speed, load times, and responsiveness."
          icon={<Zap className="h-6 w-6" />}
        />
        <MetricCard
          title="Accessibility"
          score={Math.round(analysisData.accessibility)}
          description="Ensures usability for people with diverse abilities."
          icon={<Accessibility className="h-6 w-6" />}
        />
        <MetricCard
          title="Best Practices"
          score={Math.round(analysisData.bestPractices)}
          description="Adherence to modern web development standards and security."
          icon={<Settings2 className="h-6 w-6" />}
        />
        <MetricCard
          title="SEO"
          score={Math.round(analysisData.seo)}
          description="Optimized for search engine visibility and ranking."
          icon={<Search className="h-6 w-6" />}
        />
        <MetricCard
          title="Security Audit"
          score={Math.round(analysisData.security)}
          description="Vulnerability assessment and secure coding practices."
          icon={<ShieldCheck className="h-6 w-6" />}
        />
        <MetricCard
          title="Bundle Optimization"
          score={Math.round(analysisData.bundleOptimization)}
          description="Efficiency of JavaScript/CSS bundles and asset delivery."
          icon={<PackageOpen className="h-6 w-6" />}
        />
      </div>
       <Card className="shadow-lg rounded-lg">
            <CardHeader>
                <CardTitle className="text-xl">Detailed Analysis Report</CardTitle>
                <CardDescription>
                    This is a mock Lighthouse-style development analysis. Scores are illustrative and update dynamically on load.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    In a real-world scenario, this section would provide an in-depth breakdown of each metric, highlighting specific areas for improvement, 
                    passed audits, and actionable diagnostics. For example, performance metrics might detail First Contentful Paint (FCP), 
                    Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS). Accessibility would list specific ARIA compliance issues,
                    and SEO might point out missing meta tags or structured data opportunities.
                </p>
                <Button variant="outline" className="mt-4">
                    View Full Report (Coming Soon)
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
