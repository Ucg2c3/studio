
'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AddBankAccountForm } from './add-bank-account-form';
import { SendCurrencyForm, SendCurrencyFormValues } from './send-currency-form';
import { VirtualCardDisplay } from './virtual-card-display';
import { LinkBitcoinWalletForm } from './link-bitcoin-wallet-form';
import { LandmarkIcon, CreditCardIcon, SendIcon, ListChecksIcon, BitcoinIcon, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { format } from 'date-fns';

interface BankAccount {
  id: string;
  bankName: string;
  accountType: string;
  lastFour: string;
  isPrimary: boolean;
}

interface BitcoinWallet {
  id: string;
  walletName:string;
  walletAddress: string;
  isPrimary: boolean;
}

export type Transaction = {
    id: string;
    type: 'debit' | 'credit' | 'system';
    amount: number;
    currency: string;
    description: string;
    date: Date;
    status: 'completed' | 'pending' | 'failed';
};

export function WalletDashboard() {
  const [balance, setBalance] = React.useState(5250.75);
  const [transactions, setTransactions] = React.useState<Transaction[]>([
      { id: 'tx1', type: 'credit', amount: 300.00, currency: 'USD', description: 'Client Payment', date: new Date('2024-07-19T10:00:00Z'), status: 'completed' },
      { id: 'tx2', type: 'debit', amount: 29.99, currency: 'USD', description: 'CloudGenius Pro Subscription', date: new Date('2024-07-18T14:30:00Z'), status: 'completed' },
      { id: 'tx3', type: 'debit', amount: 9.98, currency: 'USD', description: '5G Network Add-on', date: new Date('2024-07-18T14:30:00Z'), status: 'completed' },
      { id: 'tx4', type: 'system', amount: 0, currency: 'N/A', description: 'Virtual Card Created', date: new Date('2024-07-15T11:00:00Z'), status: 'completed' },
  ]);

  const [linkedAccounts, setLinkedAccounts] = React.useState<BankAccount[]>([
    { id: '1', bankName: 'Global Union Bank', accountType: 'Checking', lastFour: '1234', isPrimary: true },
    { id: '2', bankName: 'Secure Trust Savings', accountType: 'Savings', lastFour: '5678', isPrimary: false },
  ]);

  const [linkedBitcoinWallets, setLinkedBitcoinWallets] = React.useState<BitcoinWallet[]>([
    { id: 'btc1', walletName: 'My Main Bitcoin Wallet', walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', isPrimary: true },
  ]);

  const handleAccountAdded = (newAccount: BankAccount) => {
    setLinkedAccounts(prev => {
      const updatedAccounts = newAccount.isPrimary 
        ? prev.map(acc => ({ ...acc, isPrimary: false })) 
        : prev;
      return [...updatedAccounts, newAccount];
    });
    setTransactions(prev => [
        { id: `tx_${Date.now()}`, type: 'system', amount: 0, currency: 'N/A', description: `Linked ${newAccount.bankName} (...${newAccount.lastFour})`, date: new Date(), status: 'completed' },
        ...prev
    ]);
  };

  const handleBitcoinWalletLinked = (newWallet: BitcoinWallet) => {
    setLinkedBitcoinWallets(prev => {
      const updatedWallets = newWallet.isPrimary
        ? prev.map(w => ({ ...w, isPrimary: false }))
        : prev;
      return [...updatedWallets, newWallet];
    });
     setTransactions(prev => [
        { id: `tx_${Date.now()}`, type: 'system', amount: 0, currency: 'N/A', description: `Linked Bitcoin Wallet: ${newWallet.walletName}`, date: new Date(), status: 'completed' },
        ...prev
    ]);
  };

  const handleSendCurrency = (data: SendCurrencyFormValues) => {
    const newTransaction: Transaction = {
        id: `tx_${Date.now()}`,
        type: 'debit',
        amount: data.amount,
        currency: data.currency,
        description: `Sent to ${data.recipient}${data.note ? `: ${data.note}` : ''}`,
        date: new Date(),
        status: 'completed', // Mock as completed
    };
    setTransactions(prev => [newTransaction, ...prev]);

    if (data.currency === 'USD') {
        setBalance(prev => prev - data.amount);
    }
  };

  const TransactionItem = ({ tx }: { tx: Transaction }) => {
    const isDebit = tx.type === 'debit';
    const amountColor = isDebit ? 'text-destructive' : 'text-accent';
    const sign = isDebit ? '-' : '+';

    return (
        <li className="flex items-center justify-between py-3 border-b last:border-none">
            <div className="flex-1 pr-4">
                <p className="font-medium text-sm text-foreground">{tx.description}</p>
                <p className="text-xs text-muted-foreground">{format(tx.date, 'MMM d, yyyy HH:mm')}</p>
            </div>
            <div className="text-right">
                 {tx.type !== 'system' && (
                    <p className={`text-sm font-semibold ${amountColor}`}>
                        {sign} ${tx.amount.toFixed(2)} <span className="text-xs text-muted-foreground">{tx.currency}</span>
                    </p>
                )}
                 <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'} className="mt-1 text-xs">
                    {tx.status}
                </Badge>
            </div>
        </li>
    );
  };


  return (
    <Tabs defaultValue="accounts" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
        <TabsTrigger value="accounts" className="py-2.5 text-sm md:text-base">
          <LandmarkIcon className="mr-2 h-4 w-4" /> Bank Accounts
        </TabsTrigger>
        <TabsTrigger value="bitcoin-wallets" className="py-2.5 text-sm md:text-base">
          <BitcoinIcon className="mr-2 h-4 w-4" /> Bitcoin Wallets
        </TabsTrigger>
        <TabsTrigger value="virtual-card" className="py-2.5 text-sm md:text-base">
          <CreditCardIcon className="mr-2 h-4 w-4" /> Virtual Card
        </TabsTrigger>
        <TabsTrigger value="send-currency" className="py-2.5 text-sm md:text-base">
          <SendIcon className="mr-2 h-4 w-4" /> Send Currency
        </TabsTrigger>
        <TabsTrigger value="history" className="py-2.5 text-sm md:text-base">
          <History className="mr-2 h-4 w-4" /> History
        </TabsTrigger>
      </TabsList>

      <TabsContent value="accounts">
        <Card className="shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Manage Bank Accounts</CardTitle>
            <CardDescription>Link and manage your bank accounts for seamless transactions.</CardDescription>
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
                <p className="text-sm text-muted-foreground text-center py-4">No bank accounts linked yet.</p>
              )}
            </div>
            <AddBankAccountForm onAccountAdded={handleAccountAdded} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="bitcoin-wallets">
        <Card className="shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Manage Bitcoin Wallets</CardTitle>
            <CardDescription>Link and manage your Bitcoin wallets.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center"><ListChecksIcon className="mr-2 h-5 w-5 text-primary"/>Linked Bitcoin Wallets</h3>
              {linkedBitcoinWallets.length > 0 ? (
                <ul className="space-y-3">
                  {linkedBitcoinWallets.map((wallet) => (
                    <li key={wallet.id} className="flex justify-between items-center p-3 border rounded-md bg-secondary/30">
                      <div>
                        <p className="font-medium text-foreground">{wallet.walletName}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-xs md:max-w-sm" title={wallet.walletAddress}>
                          {wallet.walletAddress}
                        </p>
                        {wallet.isPrimary && <p className="text-xs text-accent font-semibold">Primary Wallet</p>}
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">Manage</Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No Bitcoin wallets linked yet.</p>
              )}
            </div>
            <LinkBitcoinWalletForm onBitcoinWalletLinked={handleBitcoinWalletLinked} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="virtual-card">
        <Card className="shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Your Virtual Card</CardTitle>
            <CardDescription>Use your secure virtual card for online payments.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <VirtualCardDisplay onNewCard={() => setTransactions(prev => [{id: `tx_${Date.now()}`, type: 'system', amount: 0, currency: 'N/A', description: 'Generated new virtual card', date: new Date(), status: 'completed'}, ...prev])} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="send-currency">
        <Card className="shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Send Currency</CardTitle>
            <CardDescription>
              Transfer funds securely. Current balance: <span className="font-bold text-primary">${balance.toFixed(2)}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <SendCurrencyForm onSendCurrency={handleSendCurrency} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history">
        <Card className="shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Transaction History</CardTitle>
            <CardDescription>Review your recent financial activities.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ScrollArea className="h-[400px] w-full">
              {transactions.length > 0 ? (
                <ul className="pr-4">
                  {transactions.map(tx => <TransactionItem key={tx.id} tx={tx} />)}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-10">No transactions yet.</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
