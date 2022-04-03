// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLYtu3D1q6YQmiPoId-gYtVZhzjxtbpks",
  authDomain: "pbakery-797e4.firebaseapp.com",
  projectId: "pbakery-797e4",
  storageBucket: "pbakery-797e4.appspot.com",
  messagingSenderId: "615464999499",
  appId: "1:615464999499:web:11e2f9aca9d8c80e348bce",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const storage = getStorage(app);
export { storage , db as default};