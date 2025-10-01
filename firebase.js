// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzH6gqMdbxKhoZwkWwfJuuopElNRU2JsU",
  authDomain: "alotebi-3500c.firebaseapp.com",
  projectId: "alotebi-3500c",
  storageBucket: "alotebi-3500c.firebasestorage.app",
  messagingSenderId: "99457641243",
  appId: "1:99457641243:web:b9e86295f64e4f652b81be",
  measurementId: "G-HQF5V5FY2L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
