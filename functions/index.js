const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const { signUp, signIn } = require("./handlers/users");
const {
  createAdvert,
  getAdvert,
  getAdvertDetails,
  getAdverts,
  getUserAdverts,
  deleteAdvert,
  updateAdvert,
} = require("./handlers/adverts");
const auth = require("./util/auth");

const app = express();
app.use(cors());

app.post("/sign-up", signUp);
app.post("/sign-in", signIn);

app.post("/adverts", auth, createAdvert);
app.get("/adverts", getAdverts);
app.get("/adverts/my-adverts", auth, getUserAdverts);
app.get("/adverts/:advertId/details", getAdvertDetails);
app.get("/adverts/:advertId", getAdvert);
app.put("/adverts/:advertId", auth, updateAdvert);
app.delete("/adverts/:advertId", auth, deleteAdvert);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

exports.api = functions.https.onRequest(app);
