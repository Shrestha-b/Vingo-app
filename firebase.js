// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYJRm2SIZaj5HKrNqRPW57UQLNHIG_j3Q",
  authDomain: "vingo-ab4ba.firebaseapp.com",
  projectId: "vingo-ab4ba",
  storageBucket: "vingo-ab4ba.firebasestorage.app",
  messagingSenderId: "244004235614",
  appId: "1:244004235614:web:e81cd2b6bf31e7151f07cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {app, auth}