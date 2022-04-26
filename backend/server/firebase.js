// import firebase from 'firebase/app/dist/index.cjs.js';
// import 'firebase/firestore/dist/index.cjs.js';
const firebase=require('firebase')
// import { getAnalytics } from "firebase/analytics";
// var firebaseConfig = {
//     apiKey: "AIzaSyDnLu90BblFjXhvvsD3lmpIp0npvRQmPdM",
//     authDomain: "paytm-status-fff25.firebaseapp.com",
//     projectId: "paytm-status-fff25",
//     storageBucket: "paytm-status-fff25.appspot.com",
//     messagingSenderId: "1002188865126",
//     appId: "1:1002188865126:web:21d30c90cc4fda3fc137a7",
//     measurementId: "G-CSHK7D3DEE"
//   };
  const app = firebase.initializeApp({
    apiKey: "AIzaSyDtfd3Pc83HWaOE5xlY3YXkSqR0tbpXXoQ",
    authDomain: "circuitbenders-10fb2.firebaseapp.com",
    databaseURL: "https://circuitbenders-10fb2-default-rtdb.firebaseio.com",
    projectId: "circuitbenders-10fb2",
    storageBucket: "circuitbenders-10fb2.appspot.com",
    messagingSenderId: "525540964961",
    appId: "1:525540964961:web:e2bf217facb53810024820",
    measurementId: "G-Q74N8X2EZG"
  });
  // Initialize Firebase
  // const analytics = getAnalytics(app);
  const db=app.firestore()

  module.exports=db;