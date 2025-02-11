// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // لإضافة قاعدة البيانات

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeyC9wj45JuW6xaCoIPRyRZKFGGr-GiOs",
  authDomain: "react-team-project-e3fab.firebaseapp.com",
  databaseURL: "https://react-team-project-e3fab-default-rtdb.firebaseio.com/", // أضف رابط قاعدة البيانات
  projectId: "react-team-project-e3fab",
  storageBucket: "react-team-project-e3fab.appspot.com",
  messagingSenderId: "1065554260522",
  appId: "1:1065554260522:web:464a1284cc066136008953",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

// Export initialized app and database
export { app, database };
