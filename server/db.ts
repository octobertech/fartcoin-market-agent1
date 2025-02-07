import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
const apps = getApps();
if (!apps.length) {
  try {
    const credentialsJson = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || '{}');
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;

    if (!credentialsJson.project_id || !projectId) {
      throw new Error('Missing required Firebase configuration');
    }

    initializeApp({
      credential: cert(credentialsJson),
      projectId: projectId
    });

    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw error;
  }
}

export const db = getFirestore();