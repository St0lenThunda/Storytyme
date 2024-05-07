
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//TODO: convert firebase config to import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1sNr9fujx0kBUayJXziod2IwioWBX8Sk",
  authDomain: "storytyme-6a76a.firebaseapp.com",
  projectId: "storytyme-6a76a",
  storageBucket: "storytyme-6a76a.appspot.com",
  messagingSenderId: "322146428026",
  appId: "1:322146428026:web:ede991b600e947397587c3"
};

// Initialize Firebase
initializeApp( firebaseConfig );
// Initialize Firebase
firebase.initializeApp( firebaseConfig );
document.addEventListener( 'DOMContentLoaded', function () {
  // FirebaseUI config.
  var uiConfig = {
    signInSuccessUrl: './intake.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      /*firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID*/
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    //tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    //privacyPolicyUrl: function () {
    //  window.location.assign( '<your-privacy-policy-url>' );
    //}
  };
  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI( firebase.auth() );
  // The start method will wait until the DOM is loaded.
  ui.start( '#firebaseui-auth-container', uiConfig );
} )