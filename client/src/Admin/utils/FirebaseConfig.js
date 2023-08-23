// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzyitq8UtbflJd3mkeOjBPgOd_DcNF6EM",
  authDomain: "e-commerce-website-d321b.firebaseapp.com",
  projectId: "e-commerce-website-d321b",
  storageBucket: "e-commerce-website-d321b.appspot.com",
  messagingSenderId: "164534527867",
  appId: "1:164534527867:web:00f2a975bf908c15b13fde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)