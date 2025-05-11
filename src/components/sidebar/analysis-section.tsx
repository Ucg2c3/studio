'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchCodeIcon } from 'lucide-react';

export function AnalysisSection() {
  return (
    <div className="p-2">
      <Link href="/analysis" passHref legacyBehavior>
        <Button variant="ghost" className="w-full justify-start text-sm font-medium" size="sm">
          <SearchCodeIcon className="mr-2 h-4 w-4 text-primary" /> Dev Analysis Tool
        </Button>
      </Link>
       <p className="text-xs text-muted-foreground px-2 pt-1">
        App performance & quality insights.
      </p>
    </div>
  );
}
