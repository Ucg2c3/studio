
import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

let app: FirebaseApp;
let auth: Auth;

function getFirebaseAuth(): Auth {
  if (!auth) {
    // This function will only be called on the client side, so we can safely construct the config here.
    const firebaseConfig: FirebaseOptions = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    if (getApps().length === 0) {
      if (!firebaseConfig.apiKey) {
          // This error will now correctly only be thrown if the key is missing on the client.
          throw new Error('NEXT_PUBLIC_FIREBASE_API_KEY is not set in .env');
      }
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
    auth = getAuth(app);
  }
  return auth;
}


export { getFirebaseAuth };
