
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogInIcon, UserPlusIcon, LogOutIcon, UserCircle2Icon } from 'lucide-react';
import * as React from 'react'; // Import React for state

export function AuthSection() {
  // In a real app, you'd use a hook to get authentication state:
  // const { isAuthenticated, user, logout } = useAuth(); 
  const [isAuthenticated, setIsAuthenticated] = React.useState(false); // Mock state
  const mockUserName = "Demo User"; // Mock user name

  // Mock login/logout functions for demonstration
  const handleMockLogin = () => setIsAuthenticated(true);
  const handleMockLogout = () => setIsAuthenticated(false);

  // This is still a mock. In a real app, login form submission would trigger this.
  // For now, we can add a temporary button inside this component to toggle state for testing,
  // or assume login page sets some local storage that this component could read in useEffect.
  // For simplicity, we'll keep it as is; user navigates to /login, "logs in" (mock), then state would ideally update.

  return (
    <div className="p-2 space-y-2">
      {isAuthenticated ? (
        <>
          <div className="px-2 py-1">
            <p className="text-sm font-medium text-foreground">Welcome, {mockUserName}!</p>
            <p className="text-xs text-muted-foreground">Manage your account and settings.</p>
          </div>
          <Button variant="ghost" className="w-full justify-start text-sm" size="sm" onClick={handleMockLogout}>
            <LogOutIcon className="mr-2 h-4 w-4" /> Log Out
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
       {/* Temp button to simulate login for dev, remove later */}
       {!isAuthenticated && process.env.NODE_ENV === 'development' && (
          <Button onClick={handleMockLogin} size="sm" variant="outline" className="w-full mt-1 text-xs">
            (Dev: Mock Login)
          </Button>
       )}
    </div>
  );
}
