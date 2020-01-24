import * as firebase from "firebase/app";
// import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB096eP7jyhIR0hKkS0lm6RMtUuSnsD3xU",
  authDomain: "noble-red-9d387.firebaseapp.com",
  databaseURL: "https://noble-red-9d387.firebaseio.com",
  projectId: "noble-red-9d387",
  storageBucket: "noble-red-9d387.appspot.com",
  messagingSenderId: "189628493533",
  appId: "1:189628493533:web:ec4670117e67c72c157534",
  measurementId: "G-ZZ4J8E5RJ6"
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

var db = firebase.firestore();
var auth = firebase.auth();
var provider = firebase.auth.GoogleAuthProvider;

export default {
  db,
  auth,
  provider
};
