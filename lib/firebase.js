import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyC8lAqnujAHCeJDWiywYqvsmOps-ZDbU",
  authDomain: "impetus-6a4fd.firebaseapp.com",
  projectId: "impetus-6a4fd",
  storageBucket: "impetus-6a4fd.appspot.com",
  messagingSenderId: "476877837975",
  appId: "1:476877837975:web:53e17ab13671001902fbd2"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(firebase);
export const googleProvider = new GoogleAuthProvider()

// Initialize Firestore
export const firestore = getFirestore(firebase)