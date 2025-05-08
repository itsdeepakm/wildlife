// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi5DDVOvqC1tXYu-7-gDBEXDY7MaR4fG8",
  authDomain: "wildlife-96c6c.firebaseapp.com",
  projectId: "wildlife-96c6c",
  storageBucket: "wildlife-96c6c.firebasestorage.app",
  messagingSenderId: "208929292455",
  appId: "1:208929292455:web:b24b151a6ef478bb4c5b82",
  measurementId: "G-M4WR251Z9F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
