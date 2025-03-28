import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.REACT_APP_FIREBASE_KEY,
    authDomain: "train-booking-system-c040d.firebaseapp.com",
    projectId: "train-booking-system-c040d",
    storageBucket: "train-booking-system-c040d.firebasestorage.app",
    messagingSenderId: "887670347270",
    appId: "1:887670347270:web:3f8ee4032bcab2a81b1587",
    databaseURL: "https://train-booking-system-c040d-default-rtdb.firebaseio.com/",
  };
  
  const app = initializeApp(firebaseConfig);

  export default app;