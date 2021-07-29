const { admin, firestore, firebase } = require("../util/base");
const { validateSignUpData } = require("../util/validators");

exports.signUp = (req, res) => {
  const newUserData = {
    firstName: req.body.firstName,
    familyName: req.body.familyName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  const { errors, valid } = validateSignUpData(newUserData);

  if (!valid) {
    return res.status(400).json(errors);
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(newUserData.email, newUserData.password)
    .then((userCredential) => {
      return firestore.collection("users").doc(userCredential.user.uid).set({
        firtsName: newUserData.firstName,
        familyName: newUserData.familyName,
        phoneNumber: newUserData.phoneNumber,
        email: newUserData.email,
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
  // await firestore.collection("users").add({
  //   firstName: newUser.firstName,
  // });
};
