var db = firebase.firestore();
getUserLogged().then((user) => {
  id = user.uid;
  getDocFromCollection("Profile", user.uid)
    .then((data) => {
      document.getElementById("nameUser").innerHTML = data.name;
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
});

function getUserLogged() {
  return new Promise((resove, reject) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        resove(user);
      } else {
        reject("NAN");
      }
    });
  });
}

function getDocFromCollection(nameCollection, id) {
  return new Promise((resolve, reject) => {
    var ref = db.collection(nameCollection).doc(id);
    ref
      .get()
      .then(function (doc) {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          reject("No such document!");
        }
      })
      .catch(function (error) {
        reject("Error getting document:");
      });
  });
}
