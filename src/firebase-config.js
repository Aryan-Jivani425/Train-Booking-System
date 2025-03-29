import {initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: "train-booking-system-c040d.firebaseapp.com",
    projectId: "train-booking-system-c040d",
    storageBucket: "train-booking-system-c040d.firebasestorage.app",
    messagingSenderId: "887670347270",
    appId: "1:887670347270:web:3f8ee4032bcab2a81b1587",
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage=getStorage(app);
export {auth,db,storage};