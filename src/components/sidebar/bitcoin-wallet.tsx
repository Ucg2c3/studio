
'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WalletIcon, ArrowUpRightIcon, ArrowDownLeftIcon, PlusCircleIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

interface Transaction {
  id: string;
  type: 'sent' | 'received';
  amount: number;
  date: string;
  address: string;
}

const mockTransactions: Transaction[] = [
  { id: '1', type: 'received', amount: 0.005, date: '2024-05-01 10:30', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
  { id: '2', type: 'sent', amount: 0.002, date: '2024-05-03 15:45', address: '1BoatSLRHtKNngkdXEeobR76b53LETtpyT' },
  { id: '3', type: 'received', amount: 0.010, date: '2024-05-05 09:12', address: '1CounterpartyXXXXXXXXXXXXXXXUWLpVr' },
];

export function BitcoinWallet() {
  const { toast } = useToast();
  const [balance, setBalance] = React.useState(0.512345); // Mock balance in BTC

  const handleSend = () => {
    toast({ title: 'Send Bitcoin', description: 'Send functionality (placeholder).' });
  };

  const handleReceive = () => {
    toast({ title: 'Receive Bitcoin', description: 'Your Bitcoin address: 1YourMockAddress... (placeholder).' });
  };
  
  const handleAddFunds = () => {
    setBalance(prev => prev + (Math.random() * 0.01)); // Add a small random amount
    toast({ title: 'Funds Added (Mock)', description: 'Successfully added mock funds to your wallet.' });
  };

  return (
    <Card className="shadow-none border-none">
      <CardContent className="p-2 space-y-3">
        <div className="space-y-1">
          <Label className="text-sm font-medium flex items-center">
            <WalletIcon className="mr-2 h-4 w-4 text-primary" />
            Current Balance
          </Label>
          <p className="text-lg font-bold">{balance.toFixed(6)} BTC</p>
          <p className="text-xs text-muted-foreground">
            (Approx. ${(balance * 60000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}) {/* Assuming 1 BTC = $60,000 */}
          </p>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={handleSend}>
            <ArrowUpRightIcon className="mr-1 h-4 w-4" /> Send
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={handleReceive}>
            <ArrowDownLeftIcon className="mr-1 h-4 w-4" /> Receive
          </Button>
        </div>
         <Button variant="default" size="sm" className="w-full bg-accent hover:bg-accent/90" onClick={handleAddFunds}>
            <PlusCircleIcon className="mr-1 h-4 w-4" /> Add Mock Funds
        </Button>

        <Separator />

        <div>
          <h4 className="text-xs font-medium mb-2 text-muted-foreground">Recent Transactions</h4>
          <ScrollArea className="h-[120px] w-full">
            <div className="space-y-2 pr-2">
              {mockTransactions.map((tx) => (
                <div key={tx.id} className="p-2 rounded-md border bg-muted/20 text-xs">
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${tx.type === 'sent' ? 'text-destructive' : 'text-accent'}`}>
                      {tx.type === 'sent' ? 'Sent' : 'Received'} {tx.amount} BTC
                    </span>
                    <span className="text-muted-foreground">{tx.date.split(' ')[0]}</span>
                  </div>
                  <p className="truncate text-muted-foreground text-[0.7rem]">
                    {tx.type === 'sent' ? 'To:' : 'From:'} {tx.address}
                  </p>
                </div>
              ))}
              {mockTransactions.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">No transactions yet.</p>
              )}
            </div>
          </ScrollArea>
        </div>
         <p className="text-xs text-muted-foreground pt-1">
          This is a mock wallet for demonstration purposes only.
        </p>
      </CardContent>
    </Card>
  );
}
