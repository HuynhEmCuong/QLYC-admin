importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
firebase.initializeApp({
  apiKey: "AIzaSyBtB3YLd9FuXNxQIJat_a3ubRFvlbm6U6s",
  authDomain: "fmsphuongdongstar.firebaseapp.com",
  databaseURL: "https://fmsphuongdongstar.firebaseio.com",
  projectId: "fmsphuongdongstar",
  storageBucket: "fmsphuongdongstar.appspot.com",
  messagingSenderId: "917070518581",
  appId: "1:917070518581:web:7ddb7f6bb4aff3ca04147c",
  measurementId: "G-WKGXGKDL4J"
});
const messaging = firebase.messaging();
