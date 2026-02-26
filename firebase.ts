import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const getFirebaseConfig = () => {
  const config = {
    apiKey: localStorage.getItem('VITE_FIREBASE_API_KEY') || import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: localStorage.getItem('VITE_FIREBASE_AUTH_DOMAIN') || import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: localStorage.getItem('VITE_FIREBASE_PROJECT_ID') || import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: localStorage.getItem('VITE_FIREBASE_STORAGE_BUCKET') || import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: localStorage.getItem('VITE_FIREBASE_MESSAGING_SENDER_ID') || import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: localStorage.getItem('VITE_FIREBASE_APP_ID') || import.meta.env.VITE_FIREBASE_APP_ID
  };

  // If no config found, return a dummy one to prevent crash
  if (!config.apiKey) {
    return {
      apiKey: "mock-api-key",
      authDomain: "mock-auth-domain",
      projectId: "mock-project-id",
      storageBucket: "mock-storage-bucket",
      messagingSenderId: "mock-sender-id",
      appId: "mock-app-id"
    };
  }
  return config;
};

const app = initializeApp(getFirebaseConfig());
export const db = getFirestore(app);
export const auth = getAuth(app);
