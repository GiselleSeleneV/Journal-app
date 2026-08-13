import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
    apiKey: "AIzaSyCy6Gqq0cKOycI-pUpf2WpgoYN47SUJGTE",
    authDomain: "react-curso-7eab7.firebaseapp.com",
    projectId: "react-curso-7eab7",
    storageBucket: "react-curso-7eab7.firebasestorage.app",
    messagingSenderId: "518889905406",
    appId: "1:518889905406:web:6ed4dd12dc3678300a99af"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
