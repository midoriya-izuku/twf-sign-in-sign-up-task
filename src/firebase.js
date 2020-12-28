import firebase from 'firebase/app'
import 'firebase/auth'
  var firebaseConfig = {
    apiKey: "AIzaSyAyeY9w-8M8Zrm3-xtJQFBump83HKuPC2M",
    authDomain: "twf-sign-in-and-sign-up-task.firebaseapp.com",
    projectId: "twf-sign-in-and-sign-up-task",
    storageBucket: "twf-sign-in-and-sign-up-task.appspot.com",
    messagingSenderId: "1077146776528",
    appId: "1:1077146776528:web:c8decc0fae070cb31d3fd5",
    measurementId: "G-T5ZX3LL1VM"
  };
  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig)
  export const auth = app.auth()
  export default app
