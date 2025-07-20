
import * as admin from 'firebase-admin';

let app: admin.app.App;

function getFirebaseAdminApp() {
  if (app) {
    return app;
  }

  if (admin.apps.length > 0) {
    app = admin.apps[0]!;
    return app;
  }

  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountString) {
    throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Please add it to your .env file.');
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountString);
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    return app;
  } catch (error: any) {
    console.error('Error parsing FIREBASE_SERVICE_ACCOUNT_KEY:', error.message);
    throw new Error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY. Make sure it is a valid JSON string.');
  }
}

// Export a getter for the admin object to ensure it's accessed after initialization
const adminAuth = () => {
    getFirebaseAdminApp();
    return admin.auth();
};

const adminDb = () => {
    getFirebaseAdminApp();
    return admin.firestore();
}

export { admin, getFirebaseAdminApp, adminAuth, adminDb };
