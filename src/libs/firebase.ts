import { initializeApp, getApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// NOTE:firebase vite deploy＞https://ja.vitejs.dev/guide/static-deploy.html#google-firebase

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectFunctions = getFunctions(getApp());
const projectFirestore = getFirestore();
const projectAuth = getAuth();

export { projectFunctions, projectFirestore, projectAuth };
