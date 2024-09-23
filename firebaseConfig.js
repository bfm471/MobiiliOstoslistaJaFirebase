// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBevVXHTl_AraVm2qTw64hLW2u7BpKYnOQ",
  authDomain: "fireostoslista.firebaseapp.com",
  databaseURL: "https://fireostoslista-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fireostoslista",
  storageBucket: "fireostoslista.appspot.com",
  messagingSenderId: "635523459325",
  appId: "1:635523459325:web:135ec42b13f0ce5e197694"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);