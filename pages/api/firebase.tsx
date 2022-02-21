import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { getDatabase, ref } from "firebase/database";
import "firebase/firestore";

import {
  collection,
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD81H8nrKqZfIuYitBpn3iIMRzxOOX7j8k",
  authDomain: "simple-spotted-app.firebaseapp.com",
  projectId: "simple-spotted-app",
  storageBucket: "simple-spotted-app.appspot.com",
  messagingSenderId: "789352523350",
  appId: "1:789352523350:web:6335dca9f15ad0291ffdf7",
  measurementId: "G-7WBJSX8ETF",
}; //this is where your firebase app values you copied will go

export const firestore = firebase.initializeApp(firebaseConfig);
export const database = getFirestore(firestore);
export const auth = getAuth();

export const createUser = (login: string, password: string) => {
  createUserWithEmailAndPassword(auth, login, password)
    .then((userCredential) => {
      console.log("Created user!");
      return null;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error code: " + errorCode);
      console.log("Error message: " + errorMessage);
      return errorCode;
    });
};

export const logInUser = (login: string, password: string) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, login, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      return null;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error code: " + errorCode);
      console.log("Error message: " + errorMessage);
      return errorCode;
    });
};

export const resetEmail = (login: string) => {
  sendPasswordResetEmail(auth, login)
    .then(() => {})
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
    });
};

export const sendMessage = async (
  message: string,
  uid: string,
  roomid: string
) => {
  console.log(uid);
  const docRef = await addDoc(
    collection(database, "chat-rooms/" + roomid + "/messages"),
    {
      userID: uid,
      text: message,
      timestamp: serverTimestamp(),
    }
  );
};

export const getRoomPassword = async (id: number) => {
  const docRef = doc(database, "chat-rooms", "1");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};
