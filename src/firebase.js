// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBrkbET-mlZjH-XawCkwfgeAUcKyD7KoH0",
//   authDomain: "whatsapp-clone-d7deb.firebaseapp.com",
//   projectId: "whatsapp-clone-d7deb",
//   storageBucket: "whatsapp-clone-d7deb.appspot.com",
//   messagingSenderId: "851885637738",
//   appId: "1:851885637738:web:333201c78f893de7f44a13",
//   measurementId: "G-QYRVBF7TKR"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore();
// const analytics = getAnalytics(app);

// export default db;

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBrkbET-mlZjH-XawCkwfgeAUcKyD7KoH0",
  authDomain: "whatsapp-clone-d7deb.firebaseapp.com",
  projectId: "whatsapp-clone-d7deb",
  storageBucket: "whatsapp-clone-d7deb.appspot.com",
  messagingSenderId: "851885637738",
  appId: "1:851885637738:web:333201c78f893de7f44a13",
  measurementId: "G-QYRVBF7TKR"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore(); 
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;