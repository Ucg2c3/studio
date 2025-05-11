import { LoginForm } from '@/components/auth/login-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - CloudGenius',
  description: 'Sign in to your CloudGenius account.',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-var(--header-height,4rem)-1px)] flex-1 flex-col items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-xl rounded-lg">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back</CardTitle>
          <CardDescription>Sign in to access your CloudGenius dashboard</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
