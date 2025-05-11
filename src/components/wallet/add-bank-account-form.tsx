
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
import { useToast } from '@/hooks/use-toast';
import { PlusCircleIcon, LandmarkIcon, HashIcon, CaseSensitiveIcon } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

const bankAccountFormSchema = z.object({
  bankName: z.string().min(3, { message: 'Bank name must be at least 3 characters.' }),
  accountNumber: z.string().regex(/^\d{8,12}$/, { message: 'Enter a valid account number (8-12 digits).' }),
  routingNumber: z.string().regex(/^\d{9}$/, { message: 'Enter a valid 9-digit routing number.' }),
  accountType: z.enum(['checking', 'savings'], { required_error: 'Please select an account type.' }),
  accountHolderName: z.string().min(2, {message: "Account holder name is required."}),
  isPrimary: z.boolean().default(false),
});

type BankAccountFormValues = z.infer<typeof bankAccountFormSchema>;

interface AddBankAccountFormProps {
  onAccountAdded: (account: { id: string; bankName: string; accountType: string; lastFour: string; isPrimary: boolean }) => void;
}

export function AddBankAccountForm({ onAccountAdded }: AddBankAccountFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<BankAccountFormValues>({
    resolver: zodResolver(bankAccountFormSchema),
    defaultValues: {
      bankName: '',
      accountNumber: '',
      routingNumber: '',
      accountHolderName: '',
      isPrimary: false,
    },
  });

  async function onSubmit(data: BankAccountFormValues) {
    setIsLoading(true);
    // Simulate API call for adding bank account
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    const newAccount = {
      id: Math.random().toString(36).substring(7), // mock id
      bankName: data.bankName,
      accountType: data.accountType.charAt(0).toUpperCase() + data.accountType.slice(1),
      lastFour: data.accountNumber.slice(-4),
      isPrimary: data.isPrimary,
    };
    onAccountAdded(newAccount);

    toast({
      title: 'Bank Account Linked (Mock)',
      description: `Successfully linked ${data.bankName} account ending in ${data.accountNumber.slice(-4)}.`,
      variant: 'default'
    });
    form.reset();
  }

  return (
    <div className="mt-6 border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Link New Bank Account</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Account Holder Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <CaseSensitiveIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Full Name" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Bank Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <LandmarkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="e.g., Chase, Bank of America" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Account Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <HashIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="text" placeholder="Enter account number" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="routingNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Routing Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <HashIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="text" placeholder="Enter routing number" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Account Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="pl-10">
                       <LandmarkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                  </SelectContent>
                </Select>
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
                    Set as primary account
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            {isLoading ? 'Linking Account...' : 'Link Bank Account'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
