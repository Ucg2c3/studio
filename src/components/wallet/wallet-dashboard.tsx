
'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AddBankAccountForm } from './add-bank-account-form';
import { SendCurrencyForm } from './send-currency-form';
import { VirtualCardDisplay } from './virtual-card-display';
import { LandmarkIcon, CreditCardIcon, SendIcon, ListChecksIcon } from 'lucide-react';

interface BankAccount {
  id: string;
  bankName: string;
  accountType: string;
  lastFour: string;
  isPrimary: boolean;
}

export function WalletDashboard() {
  const [linkedAccounts, setLinkedAccounts] = React.useState<BankAccount[]>([
    { id: '1', bankName: 'Global Union Bank', accountType: 'Checking', lastFour: '1234', isPrimary: true },
    { id: '2', bankName: 'Secure Trust Savings', accountType: 'Savings', lastFour: '5678', isPrimary: false },
  ]);

  const handleAccountAdded = (newAccount: BankAccount) => {
    setLinkedAccounts(prev => [...prev, newAccount]);
  };

  return (
    <Tabs defaultValue="accounts" className="w-full">
      <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
        <TabsTrigger value="accounts" className="py-2.5 text-sm md:text-base">
          <LandmarkIcon className="mr-2 h-4 w-4" /> Bank Accounts
        </TabsTrigger>
        <TabsTrigger value="virtual-card" className="py-2.5 text-sm md:text-base">
          <CreditCardIcon className="mr-2 h-4 w-4" /> Virtual Card
        </TabsTrigger>
        <TabsTrigger value="send-currency" className="py-2.5 text-sm md:text-base">
          <SendIcon className="mr-2 h-4 w-4" /> Send Currency
        </TabsTrigger>
      </TabsList>

      <TabsContent value="accounts">
        <Card className="shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Manage Bank Accounts</CardTitle>
            <CardDescription>Link and manage your bank accounts for seamless transactions (mock).</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center"><ListChecksIcon className="mr-2 h-5 w-5 text-primary"/>Linked Accounts</h3>
              {linkedAccounts.length > 0 ? (
                <ul className="space-y-3">
                  {linkedAccounts.map(acc => (
                    <li key={acc.id} className="flex justify-between items-center p-3 border rounded-md bg-secondary/30">
                      <div>
                        <p className="font-medium text-foreground">{acc.bankName} (...{acc.lastFour})</p>
                        <p className="text-xs text-muted-foreground">{acc.accountType}{acc.isPrimary ? ' - Primary' : ''}</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">Manage</Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No bank accounts linked yet.</p>
              )}
            </div>
            <AddBankAccountForm onAccountAdded={handleAccountAdded} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="virtual-card">
        <Card className="shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Your Virtual Card</CardTitle>
            <CardDescription>Use your secure virtual card for online payments (mock).</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <VirtualCardDisplay />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="send-currency">
        <Card className="shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Send Currency</CardTitle>
            <CardDescription>Transfer funds securely and easily (mock).</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <SendCurrencyForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
