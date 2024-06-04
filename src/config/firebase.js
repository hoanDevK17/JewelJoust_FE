// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// just change config below to start
const firebaseConfig = {
    apiKey: "AIzaSyDPnlLBDzBumaCoeFEn9u7WWAgezUUnus4",
    authDomain: "jeweljoust.firebaseapp.com",
    projectId: "jeweljoust",
    storageBucket: "jeweljoust.appspot.com",
    messagingSenderId: "437114918759",
    appId: "1:437114918759:web:fd8f8fb4e9399e28d0c1c2",
    measurementId: "G-ZRY8BGXMJH"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const provider = new GoogleAuthProvider();
