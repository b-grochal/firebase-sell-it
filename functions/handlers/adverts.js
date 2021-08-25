const { firestore } = require("../util/base");
const { validateAdvertData } = require("../util/validators");

exports.createAdvert = (req, res) => {
  const newAdvertData = {
    name: req.body.name,
    description: req.body.description,
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
      description: newAdvertData.description,
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

exports.getAdverts = (req, res) => {
  firestore
    .collection("adverts")
    .get()
    .then((documents) => {
      let adverts = [];
      documents.forEach((document) => {
        adverts.push({
          advertId: document.id,
          name: document.data().name,
          description: document.data().description,
          price: document.data().price,
        });
      });
      console.log(adverts);
      return res.status(200).json(adverts);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

exports.getAdvert = (req, res) => {
  const advert = {};
  firestore
    .collection("adverts")
    .doc(req.params.advertId)
    .get()
    .then((advertDocument) => {
      advert.name = advertDocument.data().name;
      advert.description = advertDocument.data().description;
      advert.price = advertDocument.data().price;
      return firestore
        .collection("users")
        .doc(advertDocument.data().userId)
        .get();
    })
    .then((userDocument) => {
      advert.user = {
        firstName: userDocument.data().firstName,
        familyName: userDocument.data().familyName,
        phoneNumber: userDocument.data().phoneNumber,
        email: userDocument.data().email,
      };
      return res.status(200).json(advert);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

exports.updateAdvert = (req, res) => {
  const updatedAdvertData = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  const { errors, valid } = validateAdvertData(updatedAdvertData);

  if (!valid) {
    return res.status(400).json(errors);
  }

  firestore
    .collection("adverts")
    .doc(req.params.advertId)
    .update(updatedAdvertData)
    .then(() => {
      return res.status(200).json({ message: "Advert updated successfully." });
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
      return res.status(200).json({ message: "Advert deleted successfully." });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};
