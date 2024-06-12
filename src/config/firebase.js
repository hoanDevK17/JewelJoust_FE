// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// just change config below to start
const firebaseConfig = {
  apiKey: "AIzaSyBgddcANG0Ak2i7NC578-l9h0vP3-4jm9Y",
  authDomain: "jeweljoust-c9e11.firebaseapp.com",
  projectId: "jeweljoust-c9e11",
  storageBucket: "jeweljoust-c9e11.appspot.com",
  messagingSenderId: "469105945405",
  appId: "1:469105945405:web:51a01e498079e015e23354",
  measurementId: "G-40PKPFT3KM"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const provider = new GoogleAuthProvider();


