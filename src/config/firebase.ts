
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your actual Firebase config
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const firestore = getFirestore(app);

// Uncomment the line below if you want to use the Firestore emulator in development
// if (location.hostname === 'localhost') {
//   connectFirestoreEmulator(firestore, 'localhost', 8080);
// }

console.log('Firebase initialized successfully');
