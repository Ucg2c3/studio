
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';

export function HomeSection() {
  return (
    <div className="p-2">
      <Link href="/" passHref legacyBehavior>
        <Button variant="ghost" className="w-full justify-start text-sm font-medium" size="sm">
          <HomeIcon className="mr-2 h-4 w-4 text-primary" /> Go to Homepage
        </Button>
      </Link>
       <p className="text-xs text-muted-foreground px-2 pt-1">
        Navigate to the main application page.
      </p>
    </div>
  );
}
