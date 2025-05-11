
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WalletIcon } from 'lucide-react';

export function WalletSection() {
  return (
    <div className="p-2">
      <Link href="/wallet" passHref legacyBehavior>
        <Button variant="ghost" className="w-full justify-start text-sm font-medium" size="sm">
          <WalletIcon className="mr-2 h-4 w-4 text-primary" /> Financial Hub
        </Button>
      </Link>
       <p className="text-xs text-muted-foreground px-2 pt-1">
        Bank accounts, virtual cards, send currency.
      </p>
    </div>
  );
}
