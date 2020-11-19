var firebaseConfig = {
    apiKey: "AIzaSyCoUI46QHrmu50xeBHhznw8UG23Ji6Qpvw",
    authDomain: "timvieclam-9b36f.firebaseapp.com",
    databaseURL: "https://timvieclam-9b36f.firebaseio.com",
    projectId: "timvieclam-9b36f",
    storageBucket: "timvieclam-9b36f.appspot.com",
    messagingSenderId: "263868475317",
    appId: "1:263868475317:web:ac56342d37d1e6f9145bfc",
    measurementId: "G-E9YCYT1L12"
  };
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  // FIREBASE AUTH
function getUserLogged() {
    var user = firebase.auth().currentUser;
    return user
}
function loginUser() {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    });
}
function registerUser(email,password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        console.log(user);
    })
    .catch((error) => {
        console.log(error);
    });
}
function addProfileUser(id,user) {
    db.collection("Profile").doc(id).set({
        name: user.name,
        phone: user.phone,
        email: user.email,
        birthday: "",
        gender: "",
        status: "",
        address: "",
        nation: "",
        city: "",
        district: "",
        role: "User"
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}   
