
import { WalletDashboard } from '@/components/wallet/wallet-dashboard';
import { WalletIcon } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wallet & Finance - CloudGenius',
  description: 'Manage your bank accounts, virtual cards, and send currency with CloudGenius.',
};

export default function WalletPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-10">
        <div className="inline-flex items-center justify-center bg-primary/10 p-3 rounded-full mb-4">
          <WalletIcon className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Financial Hub</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Securely manage your financial instruments. Link bank accounts, issue virtual cards, and transfer funds—all in one place (mock functionality).
        </p>
      </header>
      <WalletDashboard />
    </div>
  );
}
