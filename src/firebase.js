// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc,getDoc} from 'firebase/firestore'

// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgCyLIzZhOY_9WmZ6C0ChqVyVyACk_E-U",
  authDomain: "originhealthassignment.firebaseapp.com",
  projectId: "originhealthassignment",
  storageBucket: "originhealthassignment.appspot.com",
  messagingSenderId: "1044603736682",
  appId: "1:1044603736682:web:bd1d353bfff2eac8147013",
  measurementId: "G-CMESYBYDSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a   reference to the service
export const db = getFirestore(app);
// console.log('ddgg',db);
export const auth = getAuth();
// console.log('gg',auth);
export default app;