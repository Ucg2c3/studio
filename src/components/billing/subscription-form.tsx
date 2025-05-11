
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
import { CreditCard, CalendarIcon, LockIcon, UserCircle } from 'lucide-react';

const subscriptionFormSchema = z.object({
  cardName: z.string().min(2, { message: 'Name on card is required.' }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: 'Enter a valid 16-digit card number.' }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Enter MM/YY format.' }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: 'Enter a valid CVC.' }),
});

type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

export function SubscriptionForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  });

  async function onSubmit(data: SubscriptionFormValues) {
    setIsLoading(true);
    // Simulate API call for subscription
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    toast({
      title: 'Subscription Successful (Mock)',
      description: `Thank you, ${data.cardName}! Your subscription to CloudGenius Pro is now active.`,
      variant: 'default'
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="cardName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Name on Card</FormLabel>
              <FormControl>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="John M. Doe" {...field} className="pl-10" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Card Number</FormLabel>
              <FormControl>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="•••• •••• •••• ••••" {...field} className="pl-10" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Expiry Date</FormLabel>
                <FormControl>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="MM/YY" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cvc"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">CVC</FormLabel>
                <FormControl>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="•••" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3">
          {isLoading ? 'Processing Payment...' : 'Subscribe to Pro Plan'}
        </Button>
        <p className="text-xs text-muted-foreground text-center pt-2">
          By clicking "Subscribe", you agree to our (mock) Terms of Service and Privacy Policy. This is a simulated payment.
        </p>
      </form>
    </Form>
  );
}
