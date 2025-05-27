
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { PlusCircleIcon, BitcoinIcon, CaseSensitiveIcon } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

const bitcoinWalletFormSchema = z.object({
  walletName: z.string().min(3, { message: 'Wallet name must be at least 3 characters.' }),
  walletAddress: z.string().regex(/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[ac-hj-np-z02-9]{11,71}$/i, { 
    message: 'Enter a valid Bitcoin address (Legacy, SegWit, or Taproot - mock validation).',
  }),
  isPrimary: z.boolean().default(false),
});

type BitcoinWalletFormValues = z.infer<typeof bitcoinWalletFormSchema>;

interface LinkBitcoinWalletFormProps {
  onBitcoinWalletLinked: (wallet: { id: string; walletName: string; walletAddress: string; isPrimary: boolean }) => void;
}

export function LinkBitcoinWalletForm({ onBitcoinWalletLinked }: LinkBitcoinWalletFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<BitcoinWalletFormValues>({
    resolver: zodResolver(bitcoinWalletFormSchema),
    defaultValues: {
      walletName: '',
      walletAddress: '',
      isPrimary: false,
    },
  });

  async function onSubmit(data: BitcoinWalletFormValues) {
    setIsLoading(true);
    // Simulate API call for linking Bitcoin wallet
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    const newWallet = {
      id: `btc-${Math.random().toString(36).substring(7)}`, // mock id
      walletName: data.walletName,
      walletAddress: data.walletAddress,
      isPrimary: data.isPrimary,
    };
    onBitcoinWalletLinked(newWallet);

    toast({
      title: 'Bitcoin Wallet Linked (Mock)',
      description: `Successfully linked ${data.walletName}.`,
      variant: 'default'
    });
    form.reset();
  }

  return (
    <div className="mt-6 border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Link New Bitcoin Wallet</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="walletName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Wallet Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <CaseSensitiveIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="e.g., My Cold Storage" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="walletAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Bitcoin Wallet Address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <BitcoinIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="text" placeholder="Enter Bitcoin address" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="isPrimary"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 shadow-sm">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm">
                    Set as primary Bitcoin wallet
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            {isLoading ? 'Linking Wallet...' : 'Link Bitcoin Wallet'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
