// import { initializeApp } from "firebase/app";
import { initializeApp } from '@react-native-firebase/app';
import { getAuth } from "firebase/auth";
import {Firestore, getFirestore} from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyDcBch7NFWzLPHlaWS3qxeUGlU665M-f1k",
  authDomain: "posease-7d807.firebaseapp.com",
  projectId: "posease-7d807",
  storageBucket: "posease-7d807.appspot.com",
  messagingSenderId: "137454897286",
  appId: "1:137454897286:web:a9dfffd9bc40d77b436907",
  measurementId: "G-B5GK2TJL7M"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const AUTH = getAuth(FIREBASE_APP);
const DB = getFirestore(FIREBASE_APP);

export default{FIREBASE_APP, AUTH, DB};