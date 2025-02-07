
import { initializeApp, getApp, cert } from 'firebase-admin/app';

// Initialize Firebase Admin if not already initialized
let firebaseApp;
try {
  firebaseApp = getApp();
} catch {
  const credentialsJson = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || '{}');
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;

  if (!credentialsJson.project_id || !projectId) {
    throw new Error('Missing required Firebase configuration');
  }

  firebaseApp = initializeApp({
    credential: cert(credentialsJson),
    projectId: projectId
  });
}