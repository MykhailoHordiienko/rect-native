// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBft_C1C5eYMWT8-OD5ngOQVwJ_FK47iDI",
  authDomain: "reactnative-f60ab.firebaseapp.com",
  projectId: "reactnative-f60ab",
  storageBucket: "reactnative-f60ab.appspot.com",
  messagingSenderId: "620135176627",
  appId: "1:620135176627:web:8f9658ba9764b92bc713c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const cloudFireStore = getFirestore(app);
