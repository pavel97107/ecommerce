import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBi4B4SyTKinslyATWUXHF7WmwuG4KYyL8",
  authDomain: "ecommerce-57c95.firebaseapp.com",
  projectId: "ecommerce-57c95",
  storageBucket: "ecommerce-57c95.appspot.com",
  messagingSenderId: "831200733850",
  appId: "1:831200733850:web:328eaed86df96e69bbcd23",
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
