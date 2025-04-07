// firebase.tsx

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDa8oO4Ss5pDxZ71QHBZXp_eSGt-zb0AnI",
    authDomain: "esdteam3g7-73a7b.firebaseapp.com",
    databaseURL:
      "https://esdteam3g7-73a7b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "esdteam3g7-73a7b",
    storageBucket: "esdteam3g7-73a7b.firebasestorage.app",
    messagingSenderId: "132129905025",
    appId: "1:132129905025:web:3e68a56fd3630195e5f080",
    measurementId: "G-WGSLJ2N47M",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  
  export { auth, googleProvider };
