const admin = require("firebase-admin");
const firebase = require("firebase");

admin.initializeApp();
var firebaseConfig = {};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
auth.useEmulator("http://localhost:9099");

const firestore = admin.firestore();

module.exports = { admin, firestore, firebase };
