
import { RegisterForm } from '@/components/auth/register-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Register - CloudGenius',
  description: 'Create your CloudGenius account.',
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-var(--header-height,4rem)-1px)] flex-1 flex-col items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-xl rounded-lg">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Create an Account</CardTitle>
          <CardDescription>Join CloudGenius to start building prototypes with AI.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <RegisterForm />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
