
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CreditCardIcon } from 'lucide-react';

export function BillingSection() {
  return (
    <div className="p-2">
      <Link href="/billing" passHref legacyBehavior>
        <Button variant="ghost" className="w-full justify-start text-sm font-medium" size="sm">
          <CreditCardIcon className="mr-2 h-4 w-4 text-primary" /> Manage Subscription
        </Button>
      </Link>
       <p className="text-xs text-muted-foreground px-2 pt-1">
        View plans and payment details.
      </p>
    </div>
  );
}
