// Firestore Cloud Database 
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { ref } from "firebase/database"
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAZ1F9yhkw2NzMgIyJJ6Bw4Thvwraf8TSw",
//   authDomain: "quizappassignment-1a086.firebaseapp.com",
//   projectId: "quizappassignment-1a086",
//   storageBucket: "quizappassignment-1a086.appspot.com",
//   messagingSenderId: "113412359915",
//   appId: "1:113412359915:web:35c605406fab7a233f20ae"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);


// Realtime Database
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ1F9yhkw2NzMgIyJJ6Bw4Thvwraf8TSw",
  authDomain: "quizappassignment-1a086.firebaseapp.com",
  databaseURL: "https://quizappassignment-1a086-default-rtdb.firebaseio.com",
  projectId: "quizappassignment-1a086",
  storageBucket: "quizappassignment-1a086.appspot.com",
  messagingSenderId: "113412359915",
  appId: "1:113412359915:web:35c605406fab7a233f20ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase();