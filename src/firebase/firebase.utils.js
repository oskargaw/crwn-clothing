import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDVWXiSm6JS7uHlWCGaybyQAd0rypbxf8E",
  authDomain: "crwn-db-4c6ec.firebaseapp.com",
  databaseURL: "https://crwn-db-4c6ec.firebaseio.com",
  projectId: "crwn-db-4c6ec",
  storageBucket: "",
  messagingSenderId: "1017192533150",
  appId: "1:1017192533150:web:b392d17f4e31112e"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
