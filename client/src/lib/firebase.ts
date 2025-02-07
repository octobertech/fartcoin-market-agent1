import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

let firebaseConfig;
try {
  firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG || '{}');
  if (!firebaseConfig.projectId) {
    throw new Error('Firebase config is missing or invalid');
  }
} catch (error) {
  console.error('Failed to parse Firebase config:', error);
  throw error;
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);