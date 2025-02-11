import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database"; 
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCeyC9wj45JuW6xaCoIPRyRZKFGGr-GiOs",
  authDomain: "react-team-project-e3fab.firebaseapp.com",
  databaseURL: "https://react-team-project-e3fab-default-rtdb.firebaseio.com",
  projectId: "react-team-project-e3fab",
  storageBucket: "react-team-project-e3fab.firebasestorage.app",
  messagingSenderId: "1065554260522",
  appId: "1:1065554260522:web:464a1284cc066136008953"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); 
const storage = getStorage(app);

export { app, auth, firebaseConfig, createUserWithEmailAndPassword, signInWithEmailAndPassword, database, onAuthStateChanged, storage };