
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { LogInIcon, Mail, Lock, Shield } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFirebase } from '@/lib/firebase-client';

export function LoginForm() {
  const router = useRouter();
  const { auth } = useFirebase();
  const { toast } = useToast();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [mockLoading, setMockLoading] = React.useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!auth) {
        toast({ title: 'Auth service not available', description: 'Please try again later.', variant: 'destructive'});
        return;
    }
    setLoading(true);
    setError(null);
    
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // Send the ID token to our API route to set the session cookie
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        toast({
          title: 'Login Successful',
          description: 'Welcome back!',
        });
        router.push('/dashboard');
        router.refresh(); // This ensures the new cookie is picked up by the server and middleware re-evaluates
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create session.');
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      let errorMessage = 'An unexpected error occurred.';
      if (error.code) {
        switch (error.code) {
          case 'auth/invalid-credential':
          case 'auth/wrong-password':
          case 'auth/user-not-found':
          case 'auth/invalid-email':
            errorMessage = 'Invalid email or password. Please try again.';
            break;
          default:
            errorMessage = 'Failed to sign in. Please check your credentials.';
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      toast({
        title: 'Login Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMockLogin = async () => {
    setMockLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: 'mock-token' }), // Send a special mock token
      });

      if (response.ok) {
        toast({
          title: 'Mock Login Successful',
          description: 'Welcome, Demo User!',
        });
        router.push('/dashboard');
        router.refresh();
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create mock session.');
      }
    } catch (error: any) {
       setError(error.message);
       toast({
        title: 'Mock Login Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setMockLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" name="email" type="email" placeholder="name@example.com" required className="pl-10" />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="password" name="password" type="password" placeholder="••••••••" required className="pl-10" />
          </div>
        </div>
        <Button type="submit" disabled={loading || !auth} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          {loading ? 'Signing In...' : (
            <>
              <LogInIcon className="mr-2 h-4 w-4" /> Sign In
            </>
          )}
        </Button>
        {error && <p className="text-sm font-medium text-destructive text-center">{error}</p>}
      </form>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="secondary" onClick={handleMockLogin} disabled={mockLoading || loading} className="w-full">
        {mockLoading ? 'Signing In...' : (
          <>
            <Shield className="mr-2 h-4 w-4" /> Mock Sign In
          </>
        )}
      </Button>
    </>
  );
}
