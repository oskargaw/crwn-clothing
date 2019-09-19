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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionsAndDocuments = async (
  collectionsKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionsKey);

  // in firestore, we can do just one set operation at a time, so to do bigger operations at once
  // we get it all into a batch and then send to firestore
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    // if we do ".doc()" without any arguments, it will set us dynamically a unique id
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  // this returns a promise
  return await batch.commit();
};

export const convertSnapshotCollectionsToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
