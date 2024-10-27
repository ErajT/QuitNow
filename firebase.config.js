// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth}  from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import {getStorage} from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_pAqR48lruJOJE67wsPNBQ2ZXhEwRB7Q",
  authDomain: "quitnow-dbf8c.firebaseapp.com",
  projectId: "quitnow-dbf8c",
  storageBucket: "quitnow-dbf8c.appspot.com",
  messagingSenderId: "1005141008225",
  appId: "1:1005141008225:web:2c9d36d2e3fea9866e6f20",
  measurementId: "G-PZG8G1KBK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { auth, db };