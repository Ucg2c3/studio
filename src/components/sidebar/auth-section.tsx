
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogInIcon, UserPlusIcon, LogOutIcon } from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export function AuthSection() {
  const { user, loading } = useUser();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    startTransition(async () => {
      const response = await fetch('/api/auth/logout', {
          method: 'POST',
      });

      if (response.ok) {
          toast({
            title: 'Logged Out',
            description: 'You have been successfully logged out.',
          });
          router.push('/login');
          router.refresh();
      } else {
          toast({
              title: 'Logout Failed',
              description: 'Something went wrong. Please try again.',
              variant: 'destructive'
          })
      }
    });
  };

  if (loading) {
      return (
          <div className="p-2 space-y-2">
              <div className="h-9 w-full rounded-md bg-muted animate-pulse" />
              <div className="h-9 w-full rounded-md bg-muted animate-pulse" />
          </div>
      )
  }

  return (
    <div className="p-2 space-y-2">
      {user ? (
        <>
          <div className="px-2 py-1">
            <p className="text-sm font-medium text-foreground truncate">Welcome, {user.name || user.email}!</p>
            <p className="text-xs text-muted-foreground">Manage your account and settings.</p>
          </div>
          <Button variant="ghost" className="w-full justify-start text-sm" size="sm" onClick={handleLogout} disabled={isPending}>
            <LogOutIcon className="mr-2 h-4 w-4" /> 
            {isPending ? 'Logging out...' : 'Log Out'}
          </Button>
        </>
      ) : (
        <>
          <Link href="/login" passHref legacyBehavior>
            <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="sm">
              <LogInIcon className="mr-2 h-4 w-4" /> Sign In
            </Button>
          </Link>
          <Link href="/register" passHref legacyBehavior>
            <Button variant="outline" className="w-full" size="sm">
              <UserPlusIcon className="mr-2 h-4 w-4" /> Register
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground px-2 pt-1">
            Access your dashboard and features.
          </p>
        </>
      )}
    </div>
  );
}
