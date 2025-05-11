
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboardIcon } from 'lucide-react';

export function DashboardSection() {
  // In a real app, this link might be conditionally rendered based on auth state
  return (
    <div className="p-2">
      <Link href="/dashboard" passHref legacyBehavior>
        <Button variant="ghost" className="w-full justify-start text-sm font-medium" size="sm">
          <LayoutDashboardIcon className="mr-2 h-4 w-4 text-primary" /> My Dashboard
        </Button>
      </Link>
       <p className="text-xs text-muted-foreground px-2 pt-1">
        View your activity and earnings.
      </p>
    </div>
  );
}
