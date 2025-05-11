
import { DashboardDisplay } from '@/components/dashboard/dashboard-display';
import { LayoutDashboardIcon } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - CloudGenius',
  description: 'View your activity summary, simulated earnings, and manage your CloudGenius account.',
};

export default function DashboardPage() {
  // In a real app, you would protect this route and fetch user-specific data.
  // For this prototype, we assume the user is "authenticated" by navigating here.
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-10">
        <div className="inline-flex items-center justify-center bg-primary/10 p-3 rounded-full mb-4">
         <LayoutDashboardIcon className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Your Dashboard</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Welcome back! Here&apos;s an overview of your activity and simulated earnings.
        </p>
      </header>
      <DashboardDisplay />
    </div>
  );
}
