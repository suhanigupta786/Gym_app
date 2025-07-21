import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB7DD2JarzOKRFUT2CEdYksEE9CXl84fTQ",
  authDomain: "gymapp-ebd0b.firebaseapp.com",
  projectId: "gymapp-ebd0b",
  storageBucket: "gymapp-ebd0b.firebasestorage.app",
  messagingSenderId: "461473182104",
  appId: "1:461473182104:web:8e2e3552affb803ce1fbed",
  measurementId: "G-EX8QF1JHXW"
};

const app = initializeApp(firebaseConfig);

// Initialize Database and Auth instances
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };