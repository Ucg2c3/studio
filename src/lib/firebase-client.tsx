
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

const FirebaseContext = createContext<{ app: FirebaseApp | null, auth: Auth | null }>({ app: null, auth: null });

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    // Define the config object inside useEffect to ensure it runs only on the client
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
    
    // Check if the API key is actually available.
    if (firebaseConfig.apiKey) {
      const initializedApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
      const initializedAuth = getAuth(initializedApp);
      setApp(initializedApp);
      setAuth(initializedAuth);
    } else {
        console.error("Firebase API Key is missing. Please check your .env file and ensure it's prefixed with NEXT_PUBLIC_");
    }

  }, []);

  return (
    <FirebaseContext.Provider value={{ app, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
