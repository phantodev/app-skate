// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIqDMe_eOZDeK4BHjROy8DSyqgJZ8_7vE",
  authDomain: "app-skate-spot.firebaseapp.com",
  projectId: "app-skate-spot",
  storageBucket: "app-skate-spot.appspot.com",
  messagingSenderId: "911607771420",
  appId: "1:911607771420:web:7d7e735e77a67de0c94ad9",
  measurementId: "G-Z8EVNH50HP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

const storage = getStorage(app);

// const analytics = getAnalytics(app);

export { app, auth, db, storage };
