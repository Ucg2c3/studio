
import * as admin from 'firebase-admin';

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

let app: admin.app.App;

if (admin.apps.length > 0) {
  app = admin.apps[0]!;
} else {
  if (!serviceAccountString) {
    throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Please add it to your .env file.');
  }
  try {
    const serviceAccount = JSON.parse(serviceAccountString);
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    console.error('Error parsing FIREBASE_SERVICE_ACCOUNT_KEY:', error.message);
    throw new Error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY. Make sure it is a valid JSON string.');
  }
}

const getFirebaseAdminApp = () => app;

export { admin, getFirebaseAdminApp };
