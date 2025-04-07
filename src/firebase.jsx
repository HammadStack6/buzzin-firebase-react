// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIEu0qLux9TJBuSgW2hcVAa689SpsaBTU",
  authDomain: "buzzin11.firebaseapp.com",
  projectId: "buzzin11",
  storageBucket: "buzzin11.firebasestorage.app",
  messagingSenderId: "290020985589",
  appId: "1:290020985589:web:2298bcff333801547953bc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export { auth };
