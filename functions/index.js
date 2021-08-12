const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const { signUp, signIn } = require("./handlers/users");

const app = express();
app.use(cors());

app.post("/sign-up", signUp);
app.post("/sign-in", signIn);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

exports.api = functions.https.onRequest(app);
