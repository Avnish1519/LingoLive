
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD7bLOTNFclVoyhCt9qjrHOmYXEt9EMbws",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "lingolive-c98a2.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "lingolive-c98a2",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "lingolive-c98a2.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1091546521669",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1091546521669:web:d63fccae36bda39809c32c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const firestore = getFirestore(app);

// Development emulator (commented out for production)
// if (location.hostname === 'localhost') {
//   connectFirestoreEmulator(firestore, 'localhost', 8080);
// }

console.log('Firebase initialized successfully');
