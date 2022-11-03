// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2jmxgYUB19ZWhGfcSYC_xAch0dJ5R8A4",
  authDomain: "outmailer-dev.firebaseapp.com",
  databaseURL: "https://outmailer-dev-default-rtdb.firebaseio.com",
  projectId: "outmailer-dev",
  storageBucket: "outmailer-dev.appspot.com",
  messagingSenderId: "549100058173",
  appId: "1:549100058173:web:eced133777c1f7c25e1c54",
  measurementId: "G-W0VVWN0SC2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
