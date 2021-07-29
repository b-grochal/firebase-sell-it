const { firestore } = require("../util/base");
const { validateAdvertData } = require("../util/validators");

exports.createAdvert = (req, res) => {
  const newAdvertData = {
    name: req.body.name,
    descritpion: req.body.descritpion,
    price: req.body.price,
  };

  const { errors, valid } = validateAdvertData(newAdvertData);

  if (!valid) {
    return res.status(400).json(errors);
  }

  firestore
    .collection("adverts")
    .add({
      name: newAdvertData.name,
      descritpion: newAdvertData.descritpion,
      price: newAdvertData.price,
      userId: req.userId,
    })
    .then(() => {
      return res.status(200).json({ message: "Advert created successfully." });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

exports.getScreams = (req, res) => {
  firestore
    .collection("adverts")
    .get()
    .then((data) => {
      let adverts = [];
      data.forEach((document) => {
        adverts.push({
          advertId: document.id,
          name: document.data().name,
          descritpion: document.data().descritpion,
          price: document.data().price,
        });
      });
      return res.status(200).json(adverts);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

exports.deleteAdvert = (req, res) => {
  const advert = firestore.collection("adverts").doc(req.params.advertId);
  advert
    .delete()
    .then(() => {
      return res
        .status(200)
        .json({ message: "Sign up completed successfully." });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};
