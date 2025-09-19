// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDB93ti-MEzF-z_EFyIvYYpm-ImMKYmN-4",
  authDomain: "mockinterviewprep-22f61.firebaseapp.com",
  projectId: "mockinterviewprep-22f61",
  storageBucket: "mockinterviewprep-22f61.firebasestorage.app",
  messagingSenderId: "384170535495",
  appId: "1:384170535495:web:6a4868255865731c231f62",
  measurementId: "G-79TMCW4RJJ",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
