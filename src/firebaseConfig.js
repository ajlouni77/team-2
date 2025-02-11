// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeyC9wj45JuW6xaCoIPRyRZKFGGr-GiOs",
  authDomain: "react-team-project-e3fab.firebaseapp.com",
  projectId: "react-team-project-e3fab",
  storageBucket: "react-team-project-e3fab.firebasestorage.app",
  messagingSenderId: "1065554260522",
  appId: "1:1065554260522:web:464a1284cc066136008953",
  databaseURL: 'https://react-team-project-e3fab-default-rtdb.firebaseio.com'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app, firebaseConfig };
