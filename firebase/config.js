// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import Constants from "expo-constants";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClayM41XbZ5eH1dIk7YGdMMB0rZc_33Og",
  authDomain: "realtimechat-60041.firebaseapp.com",
  projectId: "realtimechat-60041",
  storageBucket: "realtimechat-60041.appspot.com",
  messagingSenderId: "785029170010",
  appId: "1:785029170010:web:45d45f7b4704b72e0ee963",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();