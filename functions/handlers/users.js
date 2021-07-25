const { admin, firestore, firebase } = require("../util/base");

exports.signUp = (req, res) => {
  const newUser = {
    firstName: req.body.firstName,
    familyName: req.body.familyName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  firebase
    .auth()
    .createUserWithEmailAndPassword("robert@lewandowski.com", "P@ssw0rd")
    .then((userCredential) => {
      return res.status(200).json(userCredential);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
  // await firestore.collection("users").add({
  //   firstName: newUser.firstName,
  // });
};
