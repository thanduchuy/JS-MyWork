import LoginUserAction from "./LoginUserAction.js";
var firebaseConfig = {
  apiKey: "AIzaSyCoUI46QHrmu50xeBHhznw8UG23Ji6Qpvw",
  authDomain: "timvieclam-9b36f.firebaseapp.com",
  databaseURL: "https://timvieclam-9b36f.firebaseio.com",
  projectId: "timvieclam-9b36f",
  storageBucket: "timvieclam-9b36f.appspot.com",
  messagingSenderId: "263868475317",
  appId: "1:263868475317:web:ac56342d37d1e6f9145bfc",
  measurementId: "G-E9YCYT1L12",
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
const LoginErrosEnum = Object.freeze({
  empty: 1,
  format: 2,
  notRole: 3,
  infoGetFail: 4,
  wrong: 5,
});
loadPage();
function loadPage() {
  document.getElementById("error").style.display =
    LoginUserAction.changeStateUI(false);
}
function loginUser() {
  let email = document.querySelector("#email").value;
  let pass = document.querySelector("#pass").value;
  if (!LoginUserAction.checkEmptyField(email, pass)) {
    document.getElementById("error").innerHTML = LoginUserAction.logErrorLogin(
      LoginErrosEnum["empty"]
    );
    document.getElementById("error").style.display =
      LoginUserAction.changeStateUI(true);
  } else {
    if (
      LoginUserAction.validateEmail(email) &&
      LoginUserAction.validatePassword(pass)
    ) {
      loginUserFireBase(email, pass);
    } else {
      document.getElementById("error").innerHTML =
        LoginUserAction.logErrorLogin(LoginErrosEnum["format"]);
      document.getElementById("error").style.display =
        LoginUserAction.changeStateUI(true);
    }
  }
}
document.querySelector("#btnSignIn").addEventListener("click", () => {
  loginUser();
});
function resetForm() {
  form.email.value = "";
  form.pass.value = "";
  document.getElementById("error").style.display =
    LoginUserAction.changeStateUI(false);
}

function loginUserFireBase(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      getDocFromCollection("Profile", user.user.uid).then((info) => {
        if (LoginUserAction.checkEmptyProfile(info)) {
          document.getElementById("error").innerHTML =
            LoginUserAction.logErrorLogin(LoginErrosEnum["infoGetFail"]);
          document.getElementById("error").style.display =
            LoginUserAction.changeStateUI(true);
        } else if (LoginUserAction.isAdmin(info)) {
          document.location.href = LoginUserAction.createHomeURLForRole(info);
        } else {
          if (LoginUserAction.isEmployer(info)) {
            logoutUser();
            resetForm();
            document.getElementById("error").innerHTML =
              LoginUserAction.logErrorLogin(LoginErrosEnum["notRole"]);
            document.getElementById("error").style.display =
              LoginUserAction.changeStateUI(true);
          } else {
            document.location.href = LoginUserAction.createHomeURLForRole(info);
          }
        }
      });
    })
    .catch((error) => {
      resetForm();
      document.getElementById("error").innerHTML =
        LoginUserAction.logErrorLogin(LoginErrosEnum["wrong"]);
      document.getElementById("error").style.display =
        LoginUserAction.changeStateUI(true);
    });
}
function logoutUser() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("sucess");
    })
    .catch(function (error) {
      console.log("fail");
    });
}
function getDocFromCollection(nameCollection, id) {
  return new Promise((resovle, reject) => {
    var ref = db.collection(nameCollection).doc(id);
    ref
      .get()
      .then(function (doc) {
        if (doc.exists) {
          resovle(doc.data());
        } else {
          reject("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  });
}
