const { admin, firestore, firebase } = require("../util/base");
const {
  validateSignUpData,
  validateSignInData,
} = require("../util/validators");

exports.signUp = (req, res) => {
  const signUpData = {
    firstName: req.body.firstName,
    familyName: req.body.familyName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  const { errors, valid } = validateSignUpData(signUpData);

  if (!valid) {
    return res.status(400).json(errors);
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(signUpData.email, signUpData.password)
    .then((userCredential) => {
      return firestore.collection("users").doc(userCredential.user.uid).set({
        firtsName: signUpData.firstName,
        familyName: signUpData.familyName,
        phoneNumber: signUpData.phoneNumber,
        email: signUpData.email,
      });
    })
    .then(() => {
      return res
        .status(200)
        .json({ message: "Sign up completed successfully." });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

exports.signIn = (req, res) => {
  const signInData = {
    email: req.body.email,
    password: req.body.password,
  };

  const { errors, valid } = validateSignInData(signInData);

  if (!valid) {
    return res.status(400).json(errors);
  }

  firebase.auth
    .signInWithEmailAndPassword(signInData.email, signInData.password)
    .then((userCredential) => {
      return userCredential.user.getIdToken();
    })
    .then((token) => {
      return res.status(200).json({
        token: "token",
      });
    })
    .catch((error) => {
      return res.status(403).json(error);
    });
};
