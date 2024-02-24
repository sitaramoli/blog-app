import {initializeApp} from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-84730.firebaseapp.com",
  projectId: "blog-app-84730",
  storageBucket: "blog-app-84730.appspot.com",
  messagingSenderId: "980810866507",
  appId: "1:980810866507:web:5eddf31dd0b12ca75a92ce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);