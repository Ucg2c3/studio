
import { SubscriptionForm } from '@/components/billing/subscription-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCardIcon, ShieldCheckIcon } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Billing - CloudGenius',
  description: 'Manage your CloudGenius subscription and payment methods.',
};

export default function BillingPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-10">
        <div className="inline-flex items-center justify-center bg-primary/10 p-3 rounded-full mb-4">
          <CreditCardIcon className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Subscription & Billing</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Manage your plan, update payment details, and view your billing history. All transactions are securely processed (mock).
        </p>
      </header>
      
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl">CloudGenius Pro Plan</CardTitle>
            <CardDescription>
              Unlock premium features including custom domain generation for your tailored web pages, advanced AI capabilities, and priority support.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 p-4 bg-secondary/50 rounded-lg">
              <p className="text-3xl font-bold text-primary">$29.99 <span className="text-base font-normal text-muted-foreground">/ month</span></p>
              <p className="text-sm text-muted-foreground mt-1">Billed monthly. Cancel anytime.</p>
            </div>
            <SubscriptionForm />
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <ShieldCheckIcon className="h-7 w-7 mr-2 text-accent" /> Secure Payments
            </CardTitle>
            <CardDescription>
              Your payment information is handled with the utmost security. (Mock System)
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              We use industry-standard encryption to protect your data. All payment processing is handled by a secure third-party provider (simulated for this prototype).
            </p>
            <div className="flex items-center space-x-2">
              <LockIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">SSL/TLS Encrypted Connection</span>
            </div>
             <div className="flex items-center space-x-2">
              <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">PCI DSS Compliant (Mock)</span>
            </div>
             <p className="text-xs text-muted-foreground">
              For demonstration purposes, no real payment data is collected or stored.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
