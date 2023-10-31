import admin from "firebase-admin";
import fs from 'fs';
const Credentials = JSON.parse(fs.readFileSync('./firebase-cred.json', 'utf-8'));

//Firebase connection
admin.initializeApp({
    credential: admin.credential.cert(Credentials), 
    // storageBucket: "farmart-assign.appspot.com",            // yet to create a bucket in firebase
    storageBucket: "gs://farmart-5bda9.appspot.com",            // yet to create a bucket in firebase

    apiKey: "AIzaSyAL7rinTVF-1aF7JdOsQ2jrNnHio5mJ4TA",
    authDomain: "farmart-5bda9.firebaseapp.com",
    projectId: "farmart-5bda9",
    storageBucket: "farmart-5bda9.appspot.com",
    messagingSenderId: "246067433123",
    appId: "1:246067433123:web:694c3df8f247479cd63916"

})


export default admin;

// ---------------------------------------


// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAL7rinTVF-1aF7JdOsQ2jrNnHio5mJ4TA",
//   authDomain: "farmart-5bda9.firebaseapp.com",
//   projectId: "farmart-5bda9",
//   storageBucket: "farmart-5bda9.appspot.com",
//   messagingSenderId: "246067433123",
//   appId: "1:246067433123:web:694c3df8f247479cd63916"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default app;
