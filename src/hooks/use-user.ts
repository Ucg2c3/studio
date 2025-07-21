
'use client';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useFirebase } from '@/lib/firebase-client';

interface AuthUser {
  uid: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
}

export function useUser() {
  const { auth } = useFirebase();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for a mock user from a cookie or session storage as a fallback
    // This part is for client-side display consistency with the mock server session
    const mockUserCookie = document.cookie.split('; ').find(row => row.startsWith('session='));
    if (mockUserCookie && !auth?.currentUser) {
         // A more reliable check would be to decode the session cookie on the client,
         // but that's complex. For this mock, we can just assume if a session cookie exists,
         // and firebase auth hasn't loaded a user, we might be the mock user.
         // A better approach is to rely on onAuthStateChanged.
    }


    if (!auth) {
        setLoading(false);
        return;
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        // For the mock user, displayName might not be set in the same way.
        // Let's handle the mock user case specifically if needed.
        if (firebaseUser.uid === 'mock-user-uid' && !firebaseUser.displayName) {
             setUser({
              uid: firebaseUser.uid,
              email: 'demo@user.com',
              name: 'Demo User',
              photoURL: null,
            });
        } else {
             setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
            });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return { user, loading };
}
