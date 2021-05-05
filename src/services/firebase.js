

//TODO: Import the firebase core module
import firebase from 'firebase/app';
//TODO: import the auth package from firebase
import 'firebase/auth';



const firebaseConfig = {
       apiKey: "AIzaSyAVLKNFBvFb1O3RMvIqWZu7aOF-1F8hIVk",
    authDomain: "imageclassification-6698b.firebaseapp.com",
    projectId: "imageclassification-6698b",
    storageBucket: "imageclassification-6698b.appspot.com",
    messagingSenderId: "436502805769",
    appId: "1:436502805769:web:255ad02e50008f693ea7d8",
    measurementId: "G-F7KNTYYQZT"
  };



//TODO: initialize the firebase app
firebase.initializeApp(firebaseConfig);

//TODO: set up a firebase provider
const provider = new firebase.auth.GoogleAuthProvider();

//TODO: configure the firebase provider
const auth = firebase.auth();

//TODO: set up auth actions i.e. login, logout

function login () {
    auth.signInWithPopup(provider);
}

function logout() {
    auth.signOut();
}

//TODO: Export our actions
export { 
    auth,
    login,
    logout,
}