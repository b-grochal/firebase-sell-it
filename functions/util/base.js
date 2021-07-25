const admin = require("firebase-admin");
const firebase = require("firebase");
const config = require("./config");

admin.initializeApp();
// Initialize Firebase
firebase.initializeApp(config);

var auth = firebase.auth();
auth.useEmulator("http://localhost:9099");

const firestore = admin.firestore();

module.exports = { admin, firestore, firebase };
