import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "googole-drive.firebaseapp.com",
  projectId: "googole-drive",
  storageBucket: "googole-drive.appspot.com",
  messagingSenderId: "908592026127",
  appId: "1:908592026127:web:e9333cf5b20a62a60b097a",
  measurementId: "G-GJ97CQW8XM",
};

!getApps().length ? initializeApp(firebaseConfig) : getApp();
const DB = getFirestore();
export { DB };
