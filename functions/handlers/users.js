const { admin, firestore } = require("../services/firebase");

exports.signUp = (req, res) => {
  return res.status(200).json("App is working");
};
