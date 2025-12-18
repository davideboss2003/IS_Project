// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "movie-site-9e835.firebaseapp.com",
  projectId: "movie-site-9e835",
  storageBucket: "movie-site-9e835.firebasestorage.app",
  messagingSenderId: "310511454643",
  appId: "1:310511454643:web:600e64c9cccf13460463c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
