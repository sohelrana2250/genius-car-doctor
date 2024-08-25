// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// apiKey: process.env.REACT_APP_apiKey,
// authDomain: process.env.REACT_APP_authDomain,
// projectId: process.env.REACT_APP_projectId,
// storageBucket: process.env.REACT_APP_storageBucket,
// messagingSenderId: process.env.REACT_APP_messagingSenderId,
// appId: process.env.REACT_APP_appId,
// apiKey: "AIzaSyDEPRFgqNQ1KBbblurFNH47AJG_vcKsg6o",
//   authDomain: "geniuscar-d9a27.firebaseapp.com",
//   projectId: "geniuscar-d9a27",
//   storageBucket: "geniuscar-d9a27.appspot.com",
//   messagingSenderId: "171459479507",
//   appId: "1:171459479507:web:0ce2d16359b68d4f2ad126"
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
