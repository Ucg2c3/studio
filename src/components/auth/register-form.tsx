
'use client';

import * as React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlusIcon, Mail, Lock, UserCircle2Icon } from 'lucide-react';
import { registerAction } from '@/app/auth/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? (
        'Creating Account...'
      ) : (
        <>
          <UserPlusIcon className="mr-2 h-4 w-4" /> Create Account
        </>
      )}
    </Button>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [state, formAction] = useFormState(registerAction, null);

  React.useEffect(() => {
    if (state?.success) {
      toast({
        title: 'Registration Successful',
        description: state.message || 'You can now sign in.',
      });
      router.push('/login');
    } else if (state?.error) {
       const errorMessages = Object.values(state.error).flat().join(' ');
      toast({
        title: 'Registration Failed',
        description: errorMessages || 'An unknown error occurred.',
        variant: 'destructive',
      });
    }
  }, [state, toast, router]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="fullName">Full Name</label>
        <div className="relative">
          <UserCircle2Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="fullName" name="fullName" placeholder="Your full name" required className="pl-10" />
        </div>
        {state?.error?.fullName && <p className="text-sm font-medium text-destructive">{state.error.fullName}</p>}
      </div>
      <div className="space-y-2">
        <label htmlFor="email">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="email" name="email" type="email" placeholder="name@example.com" required className="pl-10" />
        </div>
        {state?.error?.email && <p className="text-sm font-medium text-destructive">{state.error.email}</p>}
      </div>
      <div className="space-y-2">
        <label htmlFor="password">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="password" name="password" type="password" placeholder="••••••••" required className="pl-10" />
        </div>
        {state?.error?.password && <p className="text-sm font-medium text-destructive">{state.error.password}</p>}
      </div>
      <div className="space-y-2">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" required className="pl-10" />
        </div>
         {state?.error?.confirmPassword && <p className="text-sm font-medium text-destructive">{state.error.confirmPassword}</p>}
      </div>
      <SubmitButton />
      {state?.error?.form && <p className="text-sm font-medium text-destructive text-center">{state.error.form}</p>}
    </form>
  );
}
