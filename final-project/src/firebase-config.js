// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore,} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyGjWwl4BqHrIFnffGGp8zzo8dfdWDI-k",
  authDomain: "mesajlasma-uygulamasi-64cb3.firebaseapp.com",
  projectId: "mesajlasma-uygulamasi-64cb3",
  storageBucket: "mesajlasma-uygulamasi-64cb3.appspot.com",
  messagingSenderId: "672178519585",
  appId: "1:672178519585:web:5305578dbadc5d1a7f6d60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
