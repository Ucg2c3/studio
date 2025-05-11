'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PaletteIcon } from 'lucide-react';

export function BuilderSection() {
  return (
    <div className="p-2">
      <Link href="/builder" passHref legacyBehavior>
        <Button variant="ghost" className="w-full justify-start text-sm font-medium" size="sm">
          <PaletteIcon className="mr-2 h-4 w-4 text-primary" /> AI Website Builder
        </Button>
      </Link>
       <p className="text-xs text-muted-foreground px-2 pt-1">
        Describe and generate website prototypes.
      </p>
    </div>
  );
}
