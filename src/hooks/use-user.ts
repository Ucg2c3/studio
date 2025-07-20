
'use client';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import { app } from '@/lib/firebase'; // Ensure you have firebase client initialized

interface AuthUser {
  uid: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
}

export function useUser() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
