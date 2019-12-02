import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDrKI9bSj2le2h_FzsUHkrzsm-B7wDS4Rs",
  authDomain: "example-d711a.firebaseapp.com",
  databaseURL: "https://example-d711a.firebaseio.com",
  projectId: "example-d711a",
  storageBucket: "example-d711a.appspot.com",
  messagingSenderId: "1007139402003",
  appId: "1:1007139402003:web:64ce6f665967e9a4026ae6",
  measurementId: "G-6M5N5FLKS0"
};

const firebase = app.initializeApp(config);

export default firebase;