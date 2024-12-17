import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJH3g_kDzcdTsYyBfYnWN9Vu0NVHQr1Wk",
  authDomain: "my-portfolio-page-4ceda.firebaseapp.com",
  projectId: "my-portfolio-page-4ceda",
  storageBucket: "my-portfolio-page-4ceda.appspot.com",
  messagingSenderId: "835759719339",
  appId: "1:835759719339:web:03a12d09572082289608ee",
  measurementId: "G-V5690YXT75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);