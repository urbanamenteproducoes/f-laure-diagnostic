// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1vS4dYyureCezg06HxRO3qEpX-5NxxUM",
  authDomain: "f-laure-pro.firebaseapp.com",
  projectId: "f-laure-pro",
  storageBucket: "f-laure-pro.firebasestorage.app",
  messagingSenderId: "1091614292795",
  appId: "1:1091614292795:web:d06d2c849ded016a19151e",
  measurementId: "G-D6LEX07W62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export { signInWithEmailAndPassword };
