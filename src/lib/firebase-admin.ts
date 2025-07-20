
import * as admin from 'firebase-admin';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

let app: admin.app.App;

if (admin.apps.length > 0) {
  app = admin.apps[0]!;
} else {
  if (!serviceAccount) {
    throw new Error('Firebase service account key is not set in environment variables.');
  }
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const getFirebaseAdminApp = () => app;

export { admin, getFirebaseAdminApp };
