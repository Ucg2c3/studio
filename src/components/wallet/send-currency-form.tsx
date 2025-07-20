
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { SendIcon, UserIcon, DollarSignIcon, MessageSquareIcon } from 'lucide-react';

const sendCurrencyFormSchema = z.object({
  recipient: z.string().min(3, { message: 'Recipient identifier is required (e.g., email, username, wallet ID).' }),
  amount: z.coerce.number().positive({ message: 'Amount must be positive.' }),
  currency: z.enum(['USD', 'EUR', 'GBP', 'BTC'], { required_error: 'Please select a currency.' }),
  note: z.string().optional(),
});

export type SendCurrencyFormValues = z.infer<typeof sendCurrencyFormSchema>;

interface SendCurrencyFormProps {
  onSendCurrency: (data: SendCurrencyFormValues) => void;
}

export function SendCurrencyForm({ onSendCurrency }: SendCurrencyFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<SendCurrencyFormValues>({
    resolver: zodResolver(sendCurrencyFormSchema),
    defaultValues: {
      recipient: '',
      amount: undefined, 
      note: '',
    },
  });

  async function onSubmit(data: SendCurrencyFormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setIsLoading(false);
    
    onSendCurrency(data);

    toast({
      title: 'Currency Sent',
      description: `Successfully sent ${data.amount} ${data.currency} to ${data.recipient}.`,
      variant: 'default'
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="recipient"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Recipient</FormLabel>
              <FormControl>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Email, username, or wallet ID" {...field} className="pl-10" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Amount</FormLabel>
                <FormControl>
                   <div className="relative">
                    <DollarSignIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="number" placeholder="0.00" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || '')} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Currency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="BTC">BTC</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Note (Optional)</FormLabel>
              <FormControl>
                <div className="relative">
                    <MessageSquareIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea placeholder="Add a note for the recipient" {...field} className="pl-10 min-h-[80px]" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3">
          <SendIcon className="mr-2 h-4 w-4" />
          {isLoading ? 'Sending...' : 'Send Currency'}
        </Button>
        <p className="text-xs text-muted-foreground text-center pt-2">
          All currency transfers are simulated for this prototype.
        </p>
      </form>
    </Form>
  );
}
