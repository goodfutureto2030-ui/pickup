// firebase-config.js — PICKUP

const firebaseConfig = {
  apiKey:            "AIzaSyA4-UyB_klzOw_ac9P-3-IG_TxfgB3pmdU",
  authDomain:        "pickup-68e11.firebaseapp.com",
  projectId:         "pickup-68e11",
  storageBucket:     "pickup-68e11.firebasestorage.app",
  messagingSenderId: "30223645932",
  appId:             "1:30223645932:web:228ac1ab5bc0d8a2dfb9c9",
  measurementId:     "G-XWRS32DFY5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Shortcuts used throughout the app
const auth = firebase.auth();
const db   = firebase.firestore();