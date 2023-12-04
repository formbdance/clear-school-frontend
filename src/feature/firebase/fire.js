import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAJt5-_jJQq0aNj4UZxVFATw1ZT-7KI85c",
  authDomain: "reactauth-4e52f.firebaseapp.com",
  projectId: "reactauth-4e52f",
  storageBucket: "reactauth-4e52f.appspot.com",
  messagingSenderId: "689601901707",
  appId: "1:689601901707:web:c7358b46aa2ca175fad08e",
  measurementId: "G-L8H5X2CK2F"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);


  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  export { auth, db };